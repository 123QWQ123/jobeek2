import {useAuthStore} from "~/store/auth";

const public_routes = [
    '/sign-up',
    '/sign-up/confirm',
    '/sign-in',
];
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if (public_routes.includes(to.path)) {
        const user = computed(() => authStore.user);
        console.log(user);
        if (user.value) {
            return navigateTo('/profile');
        }
        return;
    }
    return;
},)