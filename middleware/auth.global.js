import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes, public_routes, seeker_routes} from "~/config";
import {useProfileStore} from "~/store/profile";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!process.server) {
        console.log("middleware from client side");

        const authStore = useAuthStore();
        const profileStore = useProfileStore();
        const {getEmployer, getSeeker} = profileStore;

        const {tryLogin, logout} = authStore;
        let isAuthed = false;
        if (authStore.isAuthed === null){
            await tryLogin();
            isAuthed = authStore.isAuthenticated;
        }
        if (isAuthed === true){

            isAuthed = false;
            const resData = await getEmployer('employer/profile');
            console.log(resData);
            if (resData.status !== 'failed'){
                const employer = computed(() => {
                    console.log(authStore.employer);
                    return authStore.employer;
                });
                isAuthed = authStore.isAuthenticated;
            }else{
                const employer = null;
                isAuthed = false;
            }

            if (protected_routes.includes(to.path) && employer_routes.includes(to.path) && isAuthed && employer.value && employer.value?.is_completed === false) {
                return navigateTo({
                    path: '/profile',
                    query: {
                        message_text: "Not allowed!",
                        message_code: "405",
                        message_type: 'error'
                    }
                })
            }


            const seekerProfile = await getSeeker('seeker/profile');
            console.log(seekerProfile);
            if (seekerProfile.status !== 'failed'){
                const seeker = computed(() => authStore.seeker);
                isAuthed = authStore.isAuthenticated;
            }else{
                const seeker = null;
                isAuthed = false;
            }
            if (protected_routes.includes(to.path) && seeker_routes.includes(to.path) && isAuthed && seeker.value && seeker.value?.is_completed === false) {
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
            return;
        }
    }
},)