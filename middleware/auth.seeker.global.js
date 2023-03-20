import {useAuthStore} from "~/store/auth";
import {protected_routes, seeker_routes} from "~/config";

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();
    const seeker = computed(() => authStore.seeker);


    if (protected_routes.includes(to.path) && seeker_routes.includes(to.path) && seeker.value && seeker.value?.is_completed === false) {
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