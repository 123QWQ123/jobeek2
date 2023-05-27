import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes, public_routes, seeker_routes} from "~/config";
import {useProfileStore} from "~/store/profile";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!process.server) {
        console.log("middleware from client side");

        const authStore = useAuthStore();
        const profileStore = useProfileStore();
        const {getEmployer, getSeeker} = profileStore;
        let employer = computed(() => authStore.employer);
        const isEmployer = !!localStorage.getItem('isEmployer');
        const {tryLogin, logout} = authStore;
        let isAuthed = false;
        if (authStore.isAuthed === null){
            await tryLogin();
            isAuthed = authStore.isAuthenticated;
        }
        if (isAuthed === true){

            console.log(isEmployer);
            if (isEmployer){
                await getEmployer('employer/profile');
                if (protected_routes.includes(to.path) && employer_routes.includes(to.path) && employer.value && employer.value.is_completed === false) {
                    return navigateTo({
                        path: '/profile',
                        query: {
                            message_text: "Not allowed!",
                            message_code: "405",
                            message_type: 'error'
                        }
                    })
                }
                return;
            }else{

                let seeker = authStore.seeker;
                const seekerProfile = await getSeeker('seeker/profile');

                await getEmployer('employer/profile');
                if (protected_routes.includes(to.path) && seeker_routes.includes(to.path) && seeker.value && seeker.value.is_completed === false) {
                    return navigateTo({
                        path: '/profile',
                        query: {
                            message_text: "Not allowed!",
                            message_code: "405",
                            message_type: 'error'
                        }
                    })
                }
                return;
            }

        }else{
            return;
        }
    }
},)