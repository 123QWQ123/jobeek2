import {useAuthStore} from "~/store/auth";
import {protected_routes, public_routes} from "~/config";

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();
    if (!protected_routes.includes(to.path)) {
        if (public_routes.includes(to.path)) {
            const user = computed(() => authStore.user);
            if (user.value) {
                return navigateTo('/profile');
            }
            return;
        }
    }else{
        if (protected_routes.includes(to.path)){
            const isAuthed = computed(() => authStore.isAuthed);
            if (isAuthed.value === false) {
                return navigateTo("/sign-in");
            }
        }
    }
},)