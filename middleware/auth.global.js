import {useAuthStore} from "~/store/auth";

const protected_routes = [
    '/profile',
];
const public_routes = [
    '/sign-up',
    '/sign-up/confirm',
    '/sign-in',
];
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if (protected_routes.includes(to.path)) {
        const user = computed(() => authStore.user);
        if (user.value) {
            return;
        }else{
            return navigateTo("/sign-in");
        }
    }
},)