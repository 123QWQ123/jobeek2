export default function (url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const requestOptions = {
        headers,
        ...options
    };

    return fetch(url, requestOptions).then(response => response.json());
}