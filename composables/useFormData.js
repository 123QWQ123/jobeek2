export function useFormData(state, type = 'json') {
    if (type === 'json'){
        try {
            const keys = Object.keys(state).filter(item => state[item] instanceof Object);
            return keys.map((item) => ({[item]: state[item].val}));
        } catch (e) {
            return [];
        }

    }

    if (type === 'form_data'){
        const formData = new FormData();
        try {
            const keys = Object.keys(state).filter(item => state[item] instanceof Object);
            keys.map(item => formData.append(item, state[item].val));
            return formData;
        } catch (e) {
            return [];
        }
    }
}