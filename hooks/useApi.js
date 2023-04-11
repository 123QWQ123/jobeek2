import { useRuntimeConfig } from "nuxt/app";
import axios from "axios";

const useApi = async (method, options = {}) => {
    // console.log(options);
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const CONFIG = useRuntimeConfig();
    let url = CONFIG.public.apiBase + method;
    try {
        let response;
        if (options.method.toUpperCase() === 'GET') {
            response = await axios.get(
                url,
                {
                    params: options.payload,
                    headers: headers
                },
            );
        }
        if (options.method.toUpperCase() === 'POST') {
            if (!options.payload) throw new Error("No payload provided");
            response = await axios.post(
                url,
                options.payload,
                {
                    headers: headers
                },
            );
        }
        if (options.method.toUpperCase() === 'PUT') {
            if (!options.payload) throw new Error("No payload provided");
            response = await axios.post(
                url,
                options.payload,
                {
                    headers: headers
                },
            );
        }
        if (options.method.toUpperCase() === 'DELETE') {
            if (!options.payload) throw new Error("No payload provided");
            response = await axios.post(
                url,
                options.payload,
                {
                    headers: headers
                },
            );
        }
        if ('data' in response) {
            return {
                status: 'success',
                data: response.data
            };
        } else {
            return {
                status: 'success',
                data: response
            };
        }
    } catch (error) {
        if (error.response && 'data' in error.response && 'errors' in error.response.data) {
            return {
                status: 'error',
                data: error.response.data,
                message: error.response.data.message,
                errors: error.response.data.errors
            };
        }
        if (error.response && 'data' in error.response && 'message' in error.response.data) {
            return {
                status: 'error',
                data: error.response.data,
                message: error.response.data.message,
            };
        }
        return {
            status: 'error',
            message: error.message,
        };
    }
};
export default useApi;