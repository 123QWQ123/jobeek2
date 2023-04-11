import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes, public_routes, seeker_routes} from "~/config";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const authStore = useAuthStore();
    const {tryLogin} = authStore;
    if (authStore.isAuthed === null){
        await tryLogin();
    }
    const isAuthed = computed(() => authStore.isAuthenticated);

    if (protected_routes.includes(to.path)) {
        if (isAuthed.value === false) {
            return navigateTo("/sign-in");
        }
        return;
    }
},)