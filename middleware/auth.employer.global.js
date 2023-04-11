import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes} from "~/config";
import {useProfileStore} from "~/store/profile";

export default defineNuxtRouteMiddleware(async(to, from) => {

    const authStore = useAuthStore();
    const {tryLogin} = authStore;
    if (authStore.isAuthed === null){
        await tryLogin();
    }
    const isAuthed = computed(() => authStore.isAuthenticated);

    const profileStore = useProfileStore();
    const {getEmployer} = profileStore;
    await getEmployer();
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

},)