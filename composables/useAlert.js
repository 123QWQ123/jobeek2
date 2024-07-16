import { ref } from 'vue';
import {toast} from "vue3-toastify";
import {useCheckJSON} from "~/composables/useCheckJSON";
import {useAuthStore} from "~/store/auth";
import {useRouter} from "nuxt/app";

export default function useAlert(my_message = null) {
    const message = computed(() => {
        if (useCheckJSON(route.query.message)){
            return JSON.parse(route.query.message);
        }
        return route.query.message;
    });
    const authStore = useAuthStore();
    const route = useRoute();

    const errorMessage = computed(() => {
        if (useCheckJSON(route.query.message)){
            return JSON.parse(route.query.message).text;
        }
        return route.query.message
    });
    const isAuthed = computed(() => authStore.isAuthed);
    const redirect = computed(() => {
        return message.value?.redirect;
    });
    const alertType = computed(() => {
        if (useCheckJSON(route.query.message)){
            const alert = JSON.parse(route.query.message);
            return alert.type;
        }
        return 'success'
    });

    const router = useRouter();

    const handleAlert = () => {
        if (errorMessage.value){
            if (alertType.value === 'success'){
                toast.success(errorMessage, {autoClose: 3000});
            }
            if (alertType.value === 'error'){
                toast.error(errorMessage, {autoClose: 3000});
            }
            if (alertType.value === 'warning'){
                toast.warning(errorMessage, {autoClose: 3000});
            }

            if (!redirect.value){
                if (isAuthed.value){
                    setTimeout(() => {
                        navigateTo({
                            name:'profile'
                        });
                    }, 3000)
                }else{
                    setTimeout(() => {
                        navigateTo({
                            name:'sign-in'
                        });
                    }, 3000)
                }
            }else{
                setTimeout(() => {
                    const queryParams = { ...route.query };

                    delete queryParams.message;
                    router.push({query: queryParams});
                }, 3000)
            }
        }
    }

    return { message, handleAlert };
}
