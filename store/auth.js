import { navigateTo, useRuntimeConfig } from "nuxt/app";
// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";
import useApi from "~/hooks/useApi";
import { useFcm } from "#imports";

let timer;

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null,
      employer: null,
      seeker: null,
      isAuthed: null,
      isEmployerMode: false,
      isSubscribed: false,
      geo: null,
      premium_url: null,
    };
  },
  getters: {
    token(state) {
      return state.user?.token;
    },
    userId(state) {
      return state.user?.userId;
    },
    isEmployer(state) {
      return state.isEmployerMode;
    },
    isAuthenticated(state) {
      let authed = false;
      if (state.isAuthed === true) {
        authed = true;
      }
      return authed;
    },
  },
  actions: {
    toggleUserMode() {
      this.isEmployerMode = !this.isEmployerMode;
    },
    setUser(payload) {
      this.isAuthed = true;
      this.user = payload;
    },
    setSeeker(payload) {
      this.seeker = payload;
      this.isAuthed = true;
    },
    setEmployer(payload) {
      this.employer = payload;
      this.isAuthed = true;
    },
    async signUp(payload) {
      const response = await useApi("auth/register", {
        method: "post",
        payload,
      });

      return response;
    },
    async confirmPhoneCode(payload) {
      const response = await useApi("auth/register/confirm", {
        method: "post",
        payload,
      });
      console.log(response);
      if (
        response &&
        response.data &&
        response.data.data.hasOwnProperty("token")
      ) {
        localStorage.setItem("token", response.data?.data.token);
      }

      return response;
    },
    async sendRecoveryCode(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + "auth/forgot-password";
      try {
        const response = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if ("data" in response) {
          return {
            status: "success",
            data: response.data.data,
          };
        } else {
          return {
            status: "error",
            data: response.message,
          };
        }
      } catch (error) {
        // console.log(error);
        if ("data" in error.response) {
          return {
            status: "error",
            data: error.response.data,
          };
        }
        return {
          status: "error",
          message: error.message,
        };
      }
      // const resData = await response;
      // const expiresIn = resData.expiresIn * 1000;
      // const expirationDate = new Date().getTime() + expiresIn;
      //
      // localStorage.setItem('token', resData.idToken);
      // localStorage.setItem('userId', resData.localId);
      // localStorage.setItem('tokenExpirationDate', expirationDate);
      //
      // timer = setTimeout(() => {
      //   this.autoLogout();
      // }, expiresIn);

      // if (response.ok) {
      //   this.setUser({
      //     token: resData.idToken,
      //     userId: resData.localId,
      //   });
      //   this.isAuthed = true;
      // }
    },
    async recoverPasswordCode(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + "auth/check-reset-password-code";
      try {
        const response = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return {
          status: "success",
          data: response.data.data,
        };
      } catch (error) {
        console.log(error);
        if ("data" in error.response) {
          return {
            status: "error",
            data: error.response.data,
          };
        }
        return {
          status: "error",
          message: error.message,
        };
      }
    },
    async resetPassword(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + "auth/reset-password";
      try {
        const response = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return {
          status: "success",
          data: response.data.data,
        };
      } catch (error) {
        if ("data" in error.response) {
          return {
            status: "error",
            data: error.response.data,
          };
        }
        return {
          status: "error",
          message: error.message,
        };
      }
    },

    async refreshSeeker(url = "seeker/profile") {
      const { data } = await useApi(url, {
        method: "get",
      });
      if (data && "data" in data) {
        this.seeker = data.data;
        this.user = { phone: this.seeker?.phone };
        localStorage.setItem("seeker", JSON.stringify(this.seeker));
      }
      return data;
    },

    async refreshEmployer(url = "employer/profile") {
      const response = await useApi(url, {
        method: "get",
      });
      if (response && response.data && "data" in response.data) {
        this.employer = response.data.data;
        this.user = { phone: this.employer?.phone };
        localStorage.setItem("employer", JSON.stringify(this.employer));
      }
      return response;
    },

    async tryLogin(token = "") {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + "seeker/profile";
      let url2 = CONFIG.public.apiBase + "employer/profile";
      if (!token) token = localStorage.getItem("token");
      // const userId = localStorage.getItem('userId');
      // const tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
      // const expiresIn = tokenExpirationDate - new Date().getTime();

      if (token) {
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              proxyHeaders: false,
              credentials: false,
            },
          });
          if (response.status !== 200 || response.data.status === "failed") {
            this.isAuthed = false;
            return false;
          }

          this.user = response.data.data;
          this.seeker = { ...response.data.data };
          localStorage.setItem("seeker", JSON.stringify(this.seeker));
          this.isAuthed = true;
          const response2 = await axios.get(url2, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = { ...response2.data.data };
          this.employer = this.user;

          localStorage.setItem("employer", JSON.stringify(this.employer));

          return true;
        } catch (error) {
          // console.log(error);
          console.log("UnAuthorized");
          this.logout();
          return false;
        }
      }
      this.setUser(null);
      this.isAuthed = false;
      return false;
      // TODO
      // if (expiresIn < 0) {
      //   this.autoLogout();
      //   return;
      // }
      //
      // timer = setTimeout(function () {
      //   this.autoLogout();
      // }, expiresIn);
    },

    clearAuth() {
      localStorage.removeItem("token");
    },

    async signIn(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + "auth/login";
      try {
        const response = await axios.post(url, payload);
        const resData = response.data.data;
        if (response.status === 200) {
          localStorage.setItem("token", resData.token);
          this.user = resData.user;
          localStorage.setItem("user", JSON.stringify(this.user));

          this.isAuthed = true;

          setTimeout(async () => {
            const token = await useFcm().getToken();
            const { data } = await useApi("fcm/setToken", {
              method: "post",
              payload: {
                fcm_token: token,
              },
            });
          });

          return {
            status: "success",
            data: this.user,
          };
        }
        // TODO
        // const expiresIn = resData.expiresIn * 1000;
        // const expirationDate = new Date().getTime() + expiresIn;
        //

        // localStorage.setItem('tokenExpirationDate', expirationDate);

        // timer = setTimeout(() => {
        //   this.autoLogout();
        // }, expiresIn);
      } catch (error) {
        if (error.response && "data" in error.response) {
          if ("errors" in error.response.data) {
            return {
              status: "error",
              message: error.response.data.message,
              errors: error.response.data.errors,
            };
          } else {
            return {
              status: "error",
              message: error.response.message,
            };
          }
        }
        return {
          status: "error",
          message: error.message,
        };
      }
    },
    autoLogout() {
      this.logout();
    },

    logout() {
      this.clearAuth();
      this.setUser(null);
      this.isAuthed = false;
      navigateTo("/");
    },
    async getLocation(payload = {}) {
      const response = await useApi("area/location", {
        method: "get",
        params: payload,
      });
    },
    async getPremium(payload = {}) {
      const response = await useApi("premium", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        this.isSubscribed = response.data.data.premium;
        return this.isSubscribed;
      }
      return response;
    },

    async getPremiumUrl() {
      const url = useRequestURL();
      const hostname = url.hostname;
      const response = await useApi("getSettings", {
        method: "get",
        params: {
          setting_key: "sub_url",
          host: hostname,
        },
      });
      if (response.status === "success") {
        this.premium_url = response.data.data;
        return this.premium_url;
      }
      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
