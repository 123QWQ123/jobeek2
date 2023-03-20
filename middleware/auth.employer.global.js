import {useAuthStore} from "~/store/auth";
import {employer_routes, protected_routes} from "~/config";

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();
    const employer = computed(() => authStore.employer);

    if (protected_routes.includes(to.path) && employer_routes.includes(to.path) && employer.value && employer.value?.is_completed === false) {
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