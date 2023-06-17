import { ref } from 'vue';

export default function useFormValidation(state = {}) {
    const errors = ref({});

    const handleErrorResponse = (respone) => {
        console.log(respone);
        if (respone.status === 'failed') {
            // errors.value = error.data.errors;
            if (respone.errors){
                Object.keys(respone.errors).map(item => {
                    console.log(item);
                    errors.value[item] = respone.errors[item][0];
                    if (item in state.value){
                        state.value[item].isValid = false;
                    }
                });
            }
        } else {
            console.log(respone);
        }
    };

    return { errors, handleErrorResponse };
}
