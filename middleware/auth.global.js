import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes, public_routes, seeker_routes} from "~/config";
import {useProfileStore} from "~/store/profile";

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log(process.server);
    if (!process.server) {
        console.log("middleware from client side");
        const authStore = useAuthStore();
        const profileStore = useProfileStore();
        const {getEmployer, getSeeker} = profileStore;
        let employer = computed(() => authStore.employer);
        let seeker = computed(() => authStore.seeker);
        let isAuthed = computed(() => authStore.isAuthenticated);

        const isEmployer = localStorage.getItem('isEmployer') !== 'true' ? false : true ;
        const {tryLogin, logout} = authStore;
        if (authStore.isAuthed === null){
            const isAuthed = await tryLogin();
        }

        if (public_routes.includes(to.name)){
            return true;
        }


        if (isAuthed.value !== true){
            return navigateTo({
                path: '/sign-in',
                query: {
                    message_text: "Please, Sign in to have access!!!",
                    message_code: "403",
                    message_type: 'error'
                }
            });
        }

        if (isEmployer){
            // await getEmployer('employer/profile');
            if (employer_routes.includes(to.name) && employer.value && employer.value.is_completed == false) {
                return navigateTo({
                    path: '/profile',
                    query: {
                        message: JSON.stringify({
                            text: "Вы должны заполнить профиль работадателя!",
                            code: "405", type: 'error'
                        })
                    }
                })
            }
            return;
        }else{

            // await getSeeker('seeker/profile');
            if (seeker_routes.includes(to.name) && seeker.value && seeker.value.is_completed === false) {
                return navigateTo({
                    path: '/profile',
                    query: {
                        message: JSON.stringify({
                            text: "Вы должны заполнить профиль соискателя!",
                            code: "405", type: 'error'
                        })
                    }
                })
            }
            return;
        }

    }
},)