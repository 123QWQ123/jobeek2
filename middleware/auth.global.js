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
    console.log(to.path);
    if (protected_routes.includes(to.path)) {
        const isAuthed = computed(() => authStore.isAuthed);
        if (isAuthed.value) {
            return;
        }else{
            return navigateTo("/sign-in");
        }
    }
},)