import { ref } from 'vue';

export default function useFormValidation(state = null) {
    const errors = ref({});
    state = state ?? ref({});

    const clearInputError = (inputName) => {
        if(state.value){
            state.value[inputName] = null;
            return;
        }
        state[inputName] = null;
    }
    const handleErrorResponse = (response) => {
        // console.log(response);
        if (response && response.status === 'failed') {
            if (response.message){
                errors.value.message = response.message;
            }
            if (response.errors){
                const newErrors = {};
                Object.keys(response.errors).map(item => {
                    if ((/\.(\d+)\./g).test(item)){
                        const itemMatches = [...item.matchAll(/([a-z\n_]+)\.(\d+)\.([a-z\n_]+)/g)][0];
                        if (itemMatches.length === 4){
                            if (!newErrors[itemMatches[1]]){
                                newErrors[itemMatches[1]] = [];
                            }
                            if (!newErrors[itemMatches[1]][itemMatches[2]]){
                                newErrors[itemMatches[1]][itemMatches[2]] = {};
                            }
                            newErrors[itemMatches[1]][itemMatches[2]][itemMatches[3]] = response.errors[item][0];
                        }
                    }else{
                        newErrors[item] = response.errors[item][0];
                    }
                    if (state.value && item in state.value){
                        state.value[item].isValid = false;
                    }
                    if (item in state){
                        state[item].isValid = false;
                    }
                });
                errors.value = {...newErrors, message: response.message};
            }
        } else {
            console.log(response);
        }
    };

    return { errors, handleErrorResponse, clearInputError };
}
