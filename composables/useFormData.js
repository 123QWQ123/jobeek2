export function useFormData(state, type = 'json') {
    if (state.hasOwnProperty('value')){
        state = state.value;
    }
    if (type === 'json'){
        try {
            const keys = Object.keys(state).filter(item => state[item] instanceof Object);
            const newData = {};
            keys.map((item) => {
                // if (item === 'covid_vaccination_requirement_id'){
                //     console.log(item);
                //     console.log(state[item]);
                // }
                if (state[item]){
                    let value = state[item].val;
                    if (state[item].is_hidden && state[item].is_hidden === true){
                        return;
                    }
                    if (typeof value === 'boolean'){
                        newData[item] = Number(value);
                    }
                    else{
                        newData[item] = value;
                    }
                }
            });
            return newData;
        } catch (e) {
            return {};
        }

    }

    if (type === 'form_data'){
        const formData = new FormData();
        try {
            const keys = Object.keys(state).filter(item => state[item] instanceof Object);
            keys.map(item => {
                let value = state[item].val;
                if (state[item]){
                    if (state[item].is_hidden && state[item].is_hidden === true){
                        return;
                    }
                    if (typeof value === 'boolean'){
                        formData.append(item, Number(value))
                    }
                    else{
                        formData.append(item, value)
                    }
                }
            });
            return formData;
        } catch (e) {
            return {};
        }
    }
}