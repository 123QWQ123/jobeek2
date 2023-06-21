import { ref } from 'vue';

export default function useFormValidation(state = null) {
    const errors = ref({});
    state = state ?? ref({});

    const handleErrorResponse = (response) => {
        if (response && response.status === 'failed') {
            // errors.value = error.data.errors;
            if (response.errors){
                Object.keys(response.errors).map(item => {
                    errors.value[item] = response.errors[item][0];
                    if (state.value && item in state.value){
                        state.value[item].isValid = false;
                    }
                    if (item in state){
                        state[item].isValid = false;
                    }
                });
            }
        } else {
            console.log(response);
        }
    };

    return { errors, handleErrorResponse };
}
