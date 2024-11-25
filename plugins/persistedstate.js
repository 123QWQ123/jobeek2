import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import { defineNuxtPlugin } from "#app";
import Cookies from "js-cookie";
import cookie from "cookie";

export default defineNuxtPlugin(({ $pinia, ssrContext }) => {
  $pinia.use(
    createPersistedStatePlugin({
      // plugin options goes here
      storage: {
        getItem: (key) => {
          // See https://nuxtjs.org/guide/plugins/#using-process-flags
          if (process.server) {
            const event = useRequestEvent();
            const parsedCookies = cookie.parse(event.node.req.headers.cookie);

            return parsedCookies[key];
          } else {
            return Cookies.get(key);
          }
        },
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) => {
          Cookies.set(key, value, { expires: 365, secure: false });
        },
        removeItem: (key) => Cookies.remove(key),
      },
      overwrite: true,
    }),
  );
});
