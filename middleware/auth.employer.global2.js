import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes} from "~/config";
import {useProfileStore} from "~/store/profile";

export default defineNuxtRouteMiddleware(async(to, from) => {

    const authStore = useAuthStore();
    const isAuthed = computed(() => authStore.isAuthenticated);
    const {tryLogin} = authStore;
    console.log(authStore.isAuthed);
    console.log(isAuthed.value)
    if (authStore.isAuthed === null){
        await tryLogin();
        console.log(isAuthed.value)
    }
    //
    if (authStore.isAuthed === true){
        const isAuthed = computed(() => authStore.isAuthenticated);

        const profileStore = useProfileStore();
        const {getEmployer} = profileStore;
        const resData = await getEmployer('employer/profile');
        console.log(resData);
        if (resData.status !== 'failed'){
            const employer = computed(() => {
                console.log(authStore.employer);
                return authStore.employer;
            });
            const isAuthed = computed(() => authStore.isAuthenticated);
        }else{
            const employer = null;
            const isAuthed = false;
        }

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
    }else{
        return navigateTo("/sign-in");
    }

    return;
},)