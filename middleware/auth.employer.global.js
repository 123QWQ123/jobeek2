import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes} from "~/config";
import {useProfileStore} from "~/store/profile";

export default defineNuxtRouteMiddleware(async(to, from) => {

    const authStore = useAuthStore();
    const {tryLogin} = authStore;
    console.log(authStore.isAuthed);
    if (authStore.isAuthed === null){
        const data = await tryLogin();
        console.log(data);
    }

    if (authStore.isAuthed === true){
        const isAuthed = computed(() => authStore.isAuthenticated);

        const profileStore = useProfileStore();
        const {getEmployer} = profileStore;
        const resData = await getEmployer('employer/profile');
        console.log(resData);
        const employer = computed(() => authStore.employer);

        if (protected_routes.includes(to.path) && employer_routes.includes(to.path) && isAuthed.value && employer.value && employer.value?.is_completed === false) {
            return navigateTo({
                path: '/profile',
                query: {
                    message_text: "Not allowed!",
                    message_code: "405",
                    message_type: 'error'
                }
            })
        }
    }

    return;
},)