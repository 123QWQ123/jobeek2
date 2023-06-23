export function useSetFormData(state, data, type = 'json') {
    if (state.hasOwnProperty('value')){
        state = state.value;
    }
    if (type === 'json'){
        try {
            const keys = Object.keys(state).filter(item => state[item] instanceof Object);
            const newData = {};
            keys.map((item) => (state[item].val = newData[item]));
            return newData;
        } catch (e) {
            return {};
        }

    }

    if (type === 'form_data'){
        const formData = new FormData();
        try {
            const keys = Object.keys(state).filter(item => state[item] instanceof Object);
            keys.map(item => (state[item].val = formData[item]));
            return formData;
        } catch (e) {
            return {};
        }
    }
}