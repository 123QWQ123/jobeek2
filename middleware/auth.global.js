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
        let seeker = computed(() => authStore.seeker);
        let isAuthed = computed(() => authStore.isAuthenticated);

        const isEmployer = !!localStorage.getItem('isEmployer');
        const {tryLogin, logout} = authStore;
        if (authStore.isAuthed === null){
            await tryLogin();
        }

        if (isAuthed.value === true){
            if (isEmployer){
                await getEmployer('employer/profile');
                if (employer_routes.includes(to.name) && employer.value && employer.value.is_completed == false) {
                    return navigateTo({
                        path: '/profile',
                        query: {
                            message: {
                                text: "you have to completed your employer profile!",
                                code: "405", type: 'error'
                            },
                        }
                    })
                }
                return;
            }else{

                await getSeeker('seeker/profile');
                if (seeker_routes.includes(to.name) && seeker.value && seeker.value.is_completed === false) {
                    return navigateTo({
                        path: '/profile',
                        query: {
                            message_text: "you have to completed your seeker profile!",
                            message_code: "405",
                            message_type: 'error'
                        }
                    })
                }
                return;
            }

        }else{
            if (protected_routes.includes(to.name)) {
                return navigateTo({
                    path: '/sign-in',
                    query: {
                        message_text: "Please, Sign in to have access!",
                        message_code: "403",
                        message_type: 'error'
                    }
                })
            }
            return;
        }
    }
},)