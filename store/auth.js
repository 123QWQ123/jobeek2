import { navigateTo, useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import axios from "axios";
import useApi from "~/hooks/useApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
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
  }),
  getters: {
    token: (state) => state.tokenAuth,
    userId: (state) => state.user?.userId,
    isEmployer: (state) => state.isEmployerMode,
    isAuthenticated: (state) => state.isAuthed,
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
      return await useApi("auth/register", {
        method: "post",
        payload,
      });
    },
    async confirmPhoneCode(payload) {
      const response = await useApi("auth/register/confirm", {
        method: "post",
        payload,
      });
      if (response?.data?.data?.token) {
        this.tokenAuth = response.data.data.token;
      }
      return response;
    },
    async sendRecoveryCode(payload) {
      try {
        const response = await useApi("auth/forgot-password", {
          method: "post",
          payload,
        });

        if (response.data) {
          return { status: "success", data: response.data.data };
        } else {
          return { status: "error", data: response.message };
        }
      } catch (error) {
        return this.handleError(error);
      }
    },
    async recoverPasswordCode(payload) {
      try {
        const response = await useApi("auth/check-reset-password-code", {
          method: "post",
          payload,
        });

        return { status: "success", data: response.data.data };
      } catch (error) {
        return this.handleError(error);
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
          message: response.data.message,
        };
      } catch (error) {
        return this.handleError(error);
      }
    },
    async refreshSeeker(url = "seeker/profile") {
      const response = await useApi(url, { method: "get" });
      if (response.status === "success") {
        this.setSeeker(response.data.data);
        this.user = { phone: this.seeker?.phone };
      }
      return this.seeker;
    },
    async refreshEmployer(url = "employer/profile") {
      const response = await useApi(url, { method: "get" });
      if (response?.data?.data) {
        this.setEmployer(response.data.data);
        this.user = { phone: this.employer?.phone };
      }
      return this.employer;
    },
    async tryLogin(token = "") {
      const CONFIG = useRuntimeConfig();
      const apiBase = CONFIG.public.apiBase;
      const seekerProfileUrl = `${apiBase}seeker/profile`;
      const employerProfileUrl = `${apiBase}employer/profile`;

      if (token) {
        try {
          const response = await axios.get(
            seekerProfileUrl,
            this.createAuthHeaders(token),
          );
          if (response.status !== 200 || response.data.status === "failed") {
            this.isAuthed = false;
            return false;
          }

          const employerResponse = await axios.get(
            employerProfileUrl,
            this.createAuthHeaders(token),
          );
          this.isAuthed = true;
          this.updateUserAndProfiles(
            response.data.data,
            employerResponse.data.data,
          );

          return true;
        } catch (error) {
          this.logout();
          return false;
        }
      }
      this.logout();
      return false;
    },
    async signIn(payload) {
      try {
        const response = await useApi("auth/login", {
          method: "post",
          payload,
        });

        if (response.data.status === "success") {
          const { token, token_type, expires_at, user } = response.data.data;
          this.updateAuthState(token, token_type, expires_at, user);
        }

        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },
    async setFcmToken() {
      const token = await useFcm().getToken();
      await useApi("fcm/setToken", {
        method: "post",
        payload: { fcm_token: token },
      });
    },
    logout() {
      this.$reset();
      navigateTo("/");
    },
    async getLocation(payload = {}) {
      return await useApi("area/location", { method: "get", params: payload });
    },
    async getPremium(payload = {}) {
      if (this.isSubscribed) return this.isSubscribed;

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
      if (this.premium_url) return this.premium_url;

      const { hostname } = useRequestURL();
      const response = await useApi("getSettings", {
        method: "get",
        params: { setting_key: "sub_url", host: hostname },
      });

      if (response.status === "success") {
        this.premium_url = response.data.data;
      }

      return this.premium_url;
    },
    createAuthHeaders(token) {
      return {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    },
    updateUserAndProfiles(seekerData, employerData) {
      this.user = { ...employerData };
      this.seeker = { ...seekerData };
      this.employer = { ...employerData };
    },
    updateAuthState(token, token_type, expires_at, user) {
      this.tokenAuth = token;
      this.tokenType = token_type;
      this.expiresAt = expires_at;
      this.user = user;
      this.seeker = user.seeker;
      this.employer = user.employer;
      this.isAuthed = true;
    },
    handleError(error) {
      if (error.response?.data) {
        return { status: "error", data: error.response.data };
      }
      return { status: "error", message: error.message };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
