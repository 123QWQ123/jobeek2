import axios from "axios";
import https from "node:https";
import {useAuthStore} from "~/store/auth";

const useApi = async (method, options = {}) => {
  const CONFIG = useRuntimeConfig();
  const {tokenAuth} = storeToRefs(useAuthStore())
  // TO DO prefix
  // const host = null;
  // if (options.hasOwnProperty('host')){
  //     host = CONFIG.public.api +
  // }
  //

  options.headers = {
    "Content-Type": "application/json",
  };
  let url = CONFIG.public.base + "api/" + method;
  if (
    options.method.toUpperCase() === "PUT" ||
    options.method.toUpperCase() === "GET" ||
    options.method.toUpperCase() === "POST"
  ) {
    if (options.content_type === "multipart/form-data") {
      options.headers["Content-Type"] = "multipart/form-data";
      options.data = options.payload;
    } else {
      options.data = JSON.stringify(options.payload);
    }
  }
  if (!process.server) {
    try {
      // if (!options.payload) throw new Error("No payload provided");
      // const body = options.payload;
      // if (options.content_type === "application/json") {
      //   body._method = "PUT";
      // } else {
      //   body.append("_method", "PUT");
      // }
      // response = await axios.post(url, body, {
      //   headers: headers,
      // });
      const {
        data,
        errors,
        statusText,
        status: statusCode,
      } = await axios.request({
        url,
        ...options,
        responseType: "json",
        transformRequest: [
          function (data, headers) {
            // Do whatever you want to transform the data
            const token = tokenAuth.value;
            if (token) {
              headers.Authorization = `Bearer ${token}`;
            }

            return data;
          },
        ],
      });

      let status = "error";
      if (statusCode >= 200 && statusCode < 300) {
        status = "success";
      }
      return {
        data: data ?? {},
        message: statusText,
        status,
      };
    } catch (res) {
      if (res instanceof Object) {
        if (res.hasOwnProperty("response")) {
          const { data } = res.response;
          if (data) {
            const { errors, message } = data;
            if (errors) {
              return {
                errors,
                message: message,
                status: "error",
              };
            }
            if (message) {
              return {
                message: message,
                status: "error",
              };
            }
          }
        }

        return {
          message: res.message,
          status: "error",
        };
      }

      return {
        message: res,
        status: "error",
      };
    }
  } else {
    try {
      const {
        data,
        statusText,
        status: statusCode,
      } = await axios.request({
        url,
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
        transformRequest: [
          function (data, headers) {
            // Do whatever you want to transform the data
            return data;
          },
        ],
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });

      let status = "error";
      if (statusCode >= 200 && statusCode < 300) {
        status = "success";
      }
      return {
        data: data ?? {},
        message: statusText,
        status,
      };
    } catch (res) {
      if (res instanceof Object) {
        if (res.hasOwnProperty("response")) {
          const { data } = res.response;
          if (data) {
            const { errors, message } = data;
            if (errors) {
              return {
                errors,
                message: message,
                status: "error",
              };
            }
            if (message) {
              return {
                message: message,
                status: "error",
              };
            }
          }
        }

        return {
          message: res.message,
          status: "error",
        };
      }

      return {
        message: res,
        status: "error",
      };
    }
  }
};
export default useApi;
