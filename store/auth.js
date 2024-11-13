import { navigateTo, useRuntimeConfig } from "nuxt/app";
// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";
import useApi from "~/hooks/useApi";
// import { useFcm } from "#imports";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null,
      employer: null,
      seeker: null,
      isAuthed: false,
      isEmployerMode: false,
      isSubscribed: false,
      premium_url: null,
      tokenAuth: null,
      tokenType: null,
      expiresAt: null,
      ttl: null,
    };
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "lax",
      maxAge: 72000000,
    }),
  },
  getters: {
    token(state) {
      return state.tokenAuth;
    },
    userId(state) {
      return state.user?.userId;
    },
    isEmployer(state) {
      return state.isEmployerMode;
    },
    isAuthenticated(state) {
      return state.isAuthed;
    },
  },
  actions: {
    toggleUserMode() {
      this.isEmployerMode = !this.isEmployerMode;
    },
    setUser(payload) {
      this.user = payload;
    },
    setSeeker(payload) {
      this.seeker = payload;
    },
    setToken(payload) {
      this.tokenAuth = payload;
    },
    setEmployer(payload) {
      this.employer = payload;
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

      if (
        response &&
        response.data &&
        response.data.data.hasOwnProperty("token")
      ) {
        this.tokenAuth = response.data?.data.token;
      }

      return response;
    },
    async sendRecoveryCode(payload) {
      const CONFIG = useRuntimeConfig();
      try {
        const response = await useApi("auth/forgot-password", {
          method: "post",
          payload,
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
    async recoverPasswordCode(payload) {
      try {
        const response = await useApi("auth/check-reset-password-code", {
          method: "post",
          payload,
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
    async resetPassword(payload) {
      try {
        const response = await useApi("auth/reset-password", {
          method: "post",
          payload,
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
      const response = await useApi(url, {
        method: "get",
      });
      if (response.status === "success") {
        this.setSeeker(response.data.data);
        this.user = { phone: this.seeker?.phone };
      }
      return this.seeker;
    },

    async refreshEmployer(url = "employer/profile") {
      const response = await useApi(url, {
        method: "get",
      });
      if (response && response.data && "data" in response.data) {
        this.setEmployer(response.data.data);
        this.user = { phone: this.employer?.phone };
      }
      return this.employer;
    },

    async tryLogin(token = "") {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + "seeker/profile";
      let url2 = CONFIG.public.apiBase + "employer/profile";

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
          this.isAuthed = true;
          const response2 = await axios.get(url2, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = { ...response2.data.data };
          this.employer = this.user;

          return true;
        } catch (error) {
          this.logout();
          return false;
        }
      }
      this.setUser(null);
      this.isAuthed = false;
      return false;
    },

    async signIn(payload) {
      try {
        const response = await useApi("auth/login", {
          method: "post",
          payload: payload,
        });
        if (response.data.status === "success") {
          this.tokenAuth = response.data.data.token;
          this.tokenType = response.data.data.token_type;
          this.expiresAt = response.data.data.expires_at;
          // this.persist.maxAge = res.data.ttl;
          this.user = response.data.data.user;
          this.seeker = response.data.data.user.seeker;
          this.employer = response.data.data.user.employer;
          this.isAuthed = true;
        }
        return response.data;
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
    async setFcmToken() {
      const token = await useFcm().getToken();
      const { data } = await useApi("fcm/setToken", {
        method: "post",
        payload: {
          fcm_token: token,
        },
      });
    },
    logout() {
      this.$reset();
      navigateTo("/");
    },
    async getLocation(payload = {}) {
      const response = await useApi("area/location", {
        method: "get",
        params: payload,
      });
    },
    async getPremium(payload = {}) {
      if (this.isSubscribed) {
        return this.isSubscribed;
      }
      const response = await useApi("premium", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        this.isSubscribed = response.data.data.premium;
      }

      return this.isSubscribed;
    },

    async getPremiumUrl() {
      if (this.premium_url) {
        return this.premium_url;
      }
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
      }

      return this.premium_url;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
