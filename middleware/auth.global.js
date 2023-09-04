import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes, public_routes, seeker_routes} from "~/config";
import {useProfileStore} from "~/store/profile";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!process.server) {
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
                    message: JSON.stringify({
                        text: "Пожалуйста, зайдите в профиль",
                        code: "403", type: 'error'
                    })
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