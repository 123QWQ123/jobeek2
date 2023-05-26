import {useFetch, useRuntimeConfig} from "nuxt/app";
import axios from "axios";

const useApi = async (method, options = {}) => {
    // console.log(options);
    const CONFIG = useRuntimeConfig();
    let url = CONFIG.public.apiBase + method;

    // const { data, pending, error, refresh } = await useFetch(url, {
    //     onRequest({ request, options }) {
    //         // Set the request headers
    //         options.headers = options.headers || {};
    //
    //         if (!process.server) {
    //             const token = localStorage.getItem('token');
    //             if (token){
    //                 options.headers.authorization = `Bearer ${token}`;
    //             }
    //         }
    //     },
    //     onRequestError({ request, options, error }) {
    //         // Handle the request errors
    //     },
    //     onResponse({ request, response, options }) {
    //         // Process the response data
    //         localStorage.setItem('token', response._data.token)
    //     },
    //     onResponseError({ request, response, options }) {
    //         // Handle the response errors
    //     }
    // });
    //
    // console.log(data);
    // return data;

    if (!process.server) {
        // console.log(process.server);
        const token = localStorage.getItem('token');

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        if (options.content_type){
            headers['Content-Type'] = options.content_type;
        }

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
            // console.log(response)
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
    }else{
        // const httpsAgent = new https.Agent({
        //     ca: fs.readFileSync('./certs/cert.pem'),
        //     cert: fs.readFileSync('./certs/cert.pem'),
        // })
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (options.content_type){
            headers['Content-Type'] = options.content_type;
        }

        const CONFIG = useRuntimeConfig();
        let url = CONFIG.public.apiBase + method;
        try {
            let response;
            if (options.method.toUpperCase() === 'GET') {
                response = await axios.get(
                    url,
                    {
                        params: options.payload,
                        headers: headers,
                    },
                );
            }
            if (options.method.toUpperCase() === 'POST') {
                if (!options.payload) throw new Error("No payload provided");
                response = await axios.post(
                    url,
                    options.payload,
                    {
                        headers: headers,
                    },
                );
            }
            if (options.method.toUpperCase() === 'PUT') {
                if (!options.payload) throw new Error("No payload provided");
                response = await axios.post(
                    url,
                    options.payload,
                    {
                        headers: headers,
                    },
                );
            }
            if (options.method.toUpperCase() === 'DELETE') {
                if (!options.payload) throw new Error("No payload provided");
                response = await useFetch(
                    url,
                    options.payload,
                    {
                        headers: headers,
                    },
                );
            }
            // console.log(response)
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
            console.log(error);
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
    }
};
export default useApi;