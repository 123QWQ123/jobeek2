import Swal from "sweetalert2";


export const useApiFetch = (request, opts?, ) => {
    const config = useRuntimeConfig();
    let res;
    const call = {
        onRequest({ request, options }) {
            // console.log('onRequest', options)
        },
        onRequestError({ request, options, error }) {
            // console.log('onRequestError', options)
        },
        onResponse({ request, response, options }) {
            if (response._data?.message && process.client) {
                // console.log('onResponseError', response)

                Swal.fire({
                    text: response._data.message ?? "Неизвестная ошибка!",
                    icon: "info",
                    confirmButtonText: "ОК",
                });
            }
            return response._data
        },
        onResponseError({ request, response, options }) {
            // console.log('onResponseError', response)
            // console.log('onResponseError -> data', process.client)
            if (process.client && response._data.data?.message) {
                Swal.fire({
                    title: "Ошибка!",
                    text: response._data.data?.message ?? "Неизвестная ошибка!",
                    icon: "error",
                    confirmButtonText: "ОК",
                });
            }
            return response._data
        },
    }
    if (process.server) {
        res = $fetch(request, {
            baseURL: config.public.apiBase,
            ...call,
            ...opts
        })
    } else {
        res = useFetch(request, {
            ...call,
            ...opts
        })
    }

    return res;
}