import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://127.0.0.1:8000";

class api {
  constructor() {
    let api = axios.create();
    api.defaults.withCredentials = true;
    api.defaults.headers.Accept = "application/json";
    api.defaults.baseURL = BASE_URL;

    const setCSRFToken = () => {
      return api.get("/sanctum/csrf-cookie");
    };

    const onRequest = (config) => {
      if (
        (config.method === "post" ||
          config.method === "put" ||
          config.method === "delete") &&
        !Cookies.get("XSRF-TOKEN")
      ) {
        return setCSRFToken().then(() => config);
      }
      return config;
    };

    api.interceptors.request.use(onRequest, null);

    this.api = api;
  }
  call(requestType, url, data = null) {
    return new Promise((resolve, reject) => {
      this.api[requestType](url, data)
        .then((response) => {
          resolve(response);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
}

export default api;
