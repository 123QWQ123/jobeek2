import { useRuntimeConfig } from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "~/store/auth";
import useApi from "~/hooks/useApi";

export const useProfileStore = defineStore("profile", {
  state: () => {
    return {
      user: null,
      seeker: null,
      employer: null,
      specializations: [],
      countries: [],
      regions: [],
      cities: [],
      professional_roles: [],
      hh_professional_roles: [],
      superjob_professional_roles: [],
      artifacts: [],
      my_resume_photo_artifact: [],
    };
  },
  getters: {
    countryOptions(state) {
      return state.countries.map((item) => {
        return { name: item.name, value: item.id };
      });
    },
    cityOptions: (state) => {
      return state.cities.map((item) => {
        return { name: item.name, value: item.id };
      });
    },
    professional_roles_with_parent: (state) => {
      return state.professional_roles
        .filter((item) => item.parent_id !== 0)
        .map((item) => ({
          name: item.name,
          value: item.id,
        }));
    },
    hh_professional_roles_with_parent: (state) => {
      return state.hh_professional_roles
        .filter((item) => item.parent_id !== 0)
        .map((item) => ({
          name: item.name,
          value: item.id,
        }));
    },
    superjob_professional_roles_with_parent: (state) => {
      return state.superjob_professional_roles
        .filter((item) => item.parent_id !== 0)
        .map((item) => ({
          name: item.name,
          value: item.id,
        }));
    },
    hh_professional_roles_with_parent_ids: (state) => {
      return state.hh_professional_roles
        .filter((item) => item.parent_id !== 0)
        .map((item) => item.id);
    },
    superjob_professional_roles_with_parent_ids: (state) => {
      return state.superjob_professional_roles
        .filter((item) => item.parent_id !== 0)
        .map((item) => item.id);
    },
  },
  actions: {
    async getCountries(payload = {}, is_new = false) {
      if (this.countries && !is_new) {
        return this.countries;
      }
      const response = await useApi("area/countries", {
        method: "get",
        payload,
      });
      if (response.status === "success") {
        if (response.data.data.hasOwnProperty("countries")) {
          this.countries = response.data.data.countries;
        } else {
          this.countries = response.data.data;
        }
      }
      return this.countries;
    },

    async searchPhone(payload = {}) {
      const { data } = await useApi("scam/getPhoneInfo", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.searched_phones = data.data;
        return data.data;
      }
      return data;
    },

    async getRegions(payload = {}) {
      const { data } = await useApi("area/regions", {
        method: "get",
        payload,
      });
      if ("data" in data) {
        this.regions = data.data.regions;
      }
      return data;
    },
    async getCities(payload = {}, is_new = false) {
      if (this.cities && !is_new) {
        return this.cities;
      }
      const response = await useApi("area/cities", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        if (response.data.data.hasOwnProperty("cities")) {
          this.cities = response.data.data.cities;
        } else {
          this.cities = response.data.data;
        }
      }
      return this.cities;
    },
    async searchAreas(payload = {}) {
      const response = await useApi("area", {
        method: "get",
        params: payload,
      });
      if (response.status === "failed") {
        return [];
      }
      return response.data.data ?? [];
    },
    async searchCities(payload = {}) {
      const response = await useApi("area/cities", {
        method: "get",
        params: payload,
      });
      if (response.status !== "success") {
        return [];
      }
      return response.data.data ?? [];
    },
    async searchProfessionalRoles(payload = {}) {
      if (this.professional_roles.length > 0) {
        if (payload.search) {
          return this.professional_roles.filter((item) =>
            item.name.toLowerCase().includes(payload.search),
          );
        }
        return this.professional_roles;
      }
      const response = await useApi("professional_roles", {
        method: "get",
        params: payload,
      });
      if (response.status === "failed") {
        return [];
      }

      this.professional_roles = response.data.data ?? [];
      return response.data.data ?? [];
    },
    async searchHHProfessionalRoles(payload = {}) {
      if (this.professional_roles.length > 0) {
        if (payload.search) {
          return this.professional_roles.filter((item) =>
            item.name.toLowerCase().includes(payload.search),
          );
        }
        return this.hh_professional_roles;
      }
      const response = await useApi("professional_roles", {
        method: "get",
        params: { providers: ["hh"] },
      });
      if (response.status === "failed") {
        return [];
      }
      this.hh_professional_roles = response.data.data ?? [];
      return response.data.data ?? [];
    },
    async searchSuperjobProfessionalRoles(payload = {}) {
      if (this.superjob_professional_roles.length > 0) {
        if (payload.search) {
          return this.superjob_professional_roles.filter((item) =>
            item.name.toLowerCase().includes(payload.search),
          );
        }
        return this.superjob_professional_roles;
      }
      const response = await useApi("professional_roles", {
        method: "get",
        params: { providers: ["superjob"] },
      });
      if (response.status === "failed") {
        return [];
      }
      this.superjob_professional_roles = response.data.data ?? [];
      return response.data.data ?? [];
    },
    async getCountryCities(payload = {}) {
      const response = await useApi("area/cities", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        return response.data.data;
      }
      return [];
    },
    async getUser(payload = "") {
      const { isEmployer } = useAuthStore();
      if (isEmployer) {
        return this.getEmployer("employer/profile");
      } else {
        return this.getSeeker("seeker/profile");
      }
    },
    async getSeeker(url = "") {
      const { setSeeker } = useAuthStore();

      if (this.seeker) {
        return this.seeker;
      }

      const response = await useApi(url, {
        method: "get",
      });
      if (response.status === "success") {
        const { data } = response;
        if (!data) return;
        this.seeker = { ...data.data };
        setSeeker(this.seeker);

        this.user = {
          phone: this.seeker?.phone ?? 7,
          email: this.employer?.email,
          email_to_verify: this.employer?.email_to_verify,
        };
      }
      return this.seeker;
    },
    async getEmployer(url = "") {
      const { setEmployer } = useAuthStore();

      if (this.employer) {
        return this.employer;
      }

      const response = await useApi(url, {
        method: "get",
      });
      if (response.status === "success") {
        this.employer = response.data.data;
        setEmployer(this.employer);

        this.user = {
          phone: this.employer?.phone ?? 7,
          email: this.employer?.email,
          email_to_verify: this.employer?.email_to_verify,
        };
      }

      return this.employer;
    },
    async updateSeeker(payload) {
      const response = await useApi("seeker/profile", {
        method: "post",
        content_type: "multipart/form-data",
        payload,
      });
      if (response.status === "success") {
        this.seeker = response.data.data;
        this.user = response.data?.data;
      }
      return this.seeker;
    },
    async updateEmployer(payload) {
      var object = {};
      payload.forEach(function (value, key) {
        object[key] = value;
      });
      const response = await useApi("employer/profile", {
        method: "post",
        content_type: "multipart/form-data",
        payload,
      });
      if (response.status === "success") {
        this.employer = response.data.data;
        this.user = response.data?.data;
      }
      return this.employer;
    },

    async sendMessage(payload) {
      return await useApi("support", {
        method: "post",
        payload,
      });
    },
    async confirmEmail(payload) {
      return await useApi("profile/email/confirmation", {
        method: "post",
        payload,
      });
    },
    async verifyEmailConfirmation(payload) {
      return await useApi("profile/email/verify", {
        method: "post",
        payload,
      });
    },

    async upload(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + "upload";

      try {
        const response = await axios.post(url, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if ("data" in response) {
          return {
            status: "success",
            path: response.data.path,
          };
        }
      } catch (error) {
        console.log(error);
        if ("response" in error && error.response.data?.errors) {
          return {
            status: "error",
            message: error.message,
            errors: error.response.data.errors,
          };
        }
        return {
          status: "error",
          message: error.message,
        };
      }
    },

    async getArtifacts(payload) {
      const response = await useApi("seeker/artifacts", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        this.artifacts = response.data.data;
      }
      return response.data;
    },

    async uploadArtifact(payload) {
      const response = await useApi("seeker/artifact", {
        method: "POST",
        content_type: "multipart/form-data",
        payload,
      });
      return response;
    },
    async getArtifact(id) {
      const response = await useApi("seeker/artifact/" + id, {
        method: "GET",
        params: {},
      });
      if (response.status === "success") {
        this.my_resume_photo_artifact = response.data.data;
      }
      return this.my_resume_photo_artifact;
    },
    async deleteArtifact(id) {
      const response = await useApi("seeker/artifact/" + id, {
        method: "DELETE",
        payload: {},
      });
      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
