import {useAuthStore} from "~/store/auth.js";

export default function (url, options = {}) {
  let {tokenAuth} = storeToRefs(useAuthStore())

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenAuth.value}`
    };

    const requestOptions = {
        headers,
        ...options
    };

    return fetch(url, requestOptions).then(response => response.json());
}