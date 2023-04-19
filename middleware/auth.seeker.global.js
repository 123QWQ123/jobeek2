import {useAuthStore} from "~/store/auth";
import {protected_routes, seeker_routes} from "~/config";
import {useProfileStore} from "~/store/profile";

export default defineNuxtRouteMiddleware(async(to, from) => {

    const authStore = useAuthStore();
    const {tryLogin} = authStore;
    if (authStore.isAuthed === null){
        await tryLogin();
    }
    const profileStore = useProfileStore();
    const {getEmployer} = profileStore;
    await getEmployer('seeker/profile');
    const isAuthed = computed(() => authStore.isAuthenticated);
    const seeker = computed(() => authStore.seeker);

    if (protected_routes.includes(to.path) && seeker_routes.includes(to.path) && isAuthed.value && seeker.value && seeker.value?.is_completed === false) {
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