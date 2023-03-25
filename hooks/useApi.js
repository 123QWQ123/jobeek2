import useFetch from 'swrv';
import {useRuntimeConfig} from "nuxt/app";

const useApi = (method, options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const CONFIG = useRuntimeConfig();
    let url = CONFIG.public.apiBase + method;

    return useFetch(url, {
        headers,
        ...options
    });
};
export default useApi;