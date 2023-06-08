export function useFormData(state) {
    try {
        const keys = Object.keys(state).filter(item => state[item] instanceof Object);
        return keys.map((item) => ({[item]: state[item].val}));
    } catch (e) {
        return [];
    }
}