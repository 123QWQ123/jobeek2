import axios from "axios";
import https from "node:https";
import { useAuthStore } from "~/store/auth";
import { useSetFormErrors } from "vee-validate";

const useApi = async (method, options = {}) => {
  const CONFIG = useRuntimeConfig();
  const { tokenAuth } = storeToRefs(useAuthStore());

  const url = `${CONFIG.public.base}api/${method}`;
  const isServer = process.server;

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
    transformResponse: [(data) => handleResponse(data)],
    ...(isServer
      ? { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
      : {}),
  };

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

const handleResponse = (data) => {
  const result = JSON.parse(data);
  if (result.message) {
    if (result.status !== "success") {
      useNuxtApp().$toast.error(result.message, { autoClose: 10000 });
      if (result.errors) {
        useSetFormErrors()(result.errors);
      }
    } else {
      useNuxtApp().$toast.info(result.message, { autoClose: 10000 });
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
