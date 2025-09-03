import axios from "axios";
import { useAuthStore } from "~/store/auth";
import { navigateTo } from "#app";

const useApi = async (method, options = {}, nuxtInstance = null) => {
  const { public: publicRuntimeConfig } = nuxtInstance
    ? nuxtInstance.$config
    : useRuntimeConfig(); // Безопасное использование `useRuntimeConfig`
  const { tokenAuth } = storeToRefs(useAuthStore());

  const url = `${publicRuntimeConfig.base}api/${method}`;

  options.headers = {
    "Content-Type":
      options.content_type === "multipart/form-data"
        ? "multipart/form-data"
        : "application/json",
    ...options.headers,
  };

  if (tokenAuth.value) {
    options.headers.Authorization = `Bearer ${tokenAuth.value}`;
  }

  if (["PUT", "GET", "POST"].includes(options.method.toUpperCase())) {
    options.data =
      options.content_type === "multipart/form-data"
        ? options.payload
        : JSON.stringify(options.payload);
  }

  const axiosConfig = {
    url,
    ...options,
    responseType: "json",
    transformRequest: [(data) => data],
    transformResponse: [(data) => handleResponse(data, options.cb)],
  };

  // Check if we are on the server side
  if (typeof process !== "undefined" && process.server) {
    // This block will only execute in the server environment
    const https = await import("node:https");
    axiosConfig.httpsAgent = new https.Agent({ rejectUnauthorized: false });
  }

  try {
    const { data, statusText, status } = await axios.request(axiosConfig);
    return {
      data: data ?? {},
      message: statusText,
      status: status >= 200 && status < 300 ? "success" : "error",
    };
  } catch (error) {
    return handleError(error);
  }
};

const handleResponse = (data, cb) => {
  const result = JSON.parse(data);

  if (result.code === 401) {
    useAuthStore().$reset();
    return navigateTo("/sign-in");
  }

  if (result.message) {
    if (result.status !== "success") {
      if (cb) {
        cb(result);
      } else {
        useNuxtApp().$toast.error(result.message, { autoClose: 5000 });
      }
    } else {
      if (cb) {
        cb(result);
      } else {
        useNuxtApp().$toast.info(result.message, { autoClose: 5000 });
      }
    }
  }
  return result;
};

const handleError = (res) => {
  if (res.response && res.response.data) {
    return {
      errors: res.response.data.errors,
      message: res.response.data.message,
      status: "error",
    };
  }
  return {
    message: res.message || res,
    status: "error",
  };
};

export default useApi;
