// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi";
import { useAuthStore } from "~/store/auth.js";
import { parse, stringify } from "zipson/lib";

export const useResumeStore = defineStore("resume", {
  state: () => {
    return {
      resumes: [],
      resume: null,
      my_resume: null,
      total: 0,
      my_total: 0,
      data: null,
      current_page: 1,
      my_resumes: [],
      my_favorite_resumes: [],
      specializations: [],
      industries: [],
      areas: [],
      countries: [],
      regions: [],
      cities: [],
      work_types: [],
      schedules: [],
      experiences: [],
      part_times: [],
      metros: [],
      can_create_resume: {},
      can_create_resume_count: 0,
      provider_auth_urls: {
        hh: null,
        superjob: null,
      },
      providers: {
        hh: false,
        superjob: false,
      },
    };
  },
  persist: false,
  getters: {
    top_10: (state) => {
      return state.resumes.slice(0, 10);
    },
    top_20: (state) => {
      return state.resumes.slice(0, 20);
    },
    top_30: (state) => {
      return state.resumes.slice(0, 30);
    },
    cities_formatted: (state) => {
      return state.cities.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
  },
  actions: {
    async getAreas(payload) {
      const { data } = await useApi("area", {
        method: "get",
        payload,
      });
      if (data) {
        this.areas = data;
      }
      return data;
    },

    async getConnectedSeekerProviders(payload) {
      const { isEmployer, isAuthenticated, seeker } =
        storeToRefs(useAuthStore());

      if (
        !isEmployer.value &&
        isAuthenticated.value &&
        seeker.value.is_completed
      ) {
        const response = await useApi("seeker/used_providers", {
          method: "get",
        });
        if (response.status === "success") {
          this.providers = response.data.data;
        }
      }

      return this.providers;
    },

    async importResumes() {
      const { data } = await useApi("seeker/resumes/import", {
        method: "get",
      });

      return data;
    },
    async syncResumes() {
      const { data } = await useApi("seeker/resumes/sync", { method: "get" });

      return data;
    },

    async disconnectProviders(payload) {
      return await useApi("seeker/disconnect_providers", {
        method: "DELETE",
        params: payload,
      });
    },

    async getSeekerProvidersAuthEndpoints(
      payload,
      redirect_to = "/profile/service-verify",
    ) {
      // if (this.provider_auth_urls.hh && this.provider_auth_urls.superjob) {
      //   return this.provider_auth_urls;
      // }
      const response = await useApi("services/auth/redirect-url", {
        method: "get",
        params: { ...payload, redirect_to, profile: "seeker" },
      });
      if (response.status === "success") {
        this.provider_auth_urls = response.data.data;
      }
      return this.provider_auth_urls;
    },
    async getResumes(params, add = false, reset = false) {
      if (reset) this.clearResumes(); // Сброс списка при необходимости

      const response = await useApi("resumes/search", {
        method: "get",
        params: params,
      });
      if (response.status === "success") {
        this.resumes = add
          ? [...this.resumes, ...response.data.items]
          : response.data.items;
        this.total = response.data.found;
      }
      return this.resumes;
    },
    async getMyNegotiations(payload) {
      const response = await useApi("seeker/negotiations", {
        method: "get",
        params: payload,
      });
      if (response.hasOwnProperty("data")) {
        this.my_negotiations = response.data.items;
      }
      return response;
    },
    async getUserResumes(payload) {
      const { isEmployer, isAuthenticated } = storeToRefs(useAuthStore());
      if (!isEmployer.value && isAuthenticated.value) {
        return useApi("seeker/resumes", {
          method: "get",
          params: payload,
        });
      }
      return this.resumes;
    },
    async getMyResumes(payload) {
      const response = await this.getUserResumes(payload);
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_resumes = response.data.data;
        this.my_total = response.data.found || 0;
        this.current_page = response.data.current_page;
      }
      return response;
    },
    async getMyResume(id) {
      const response = await useApi("seeker/resumes/" + id, {
        method: "GET",
      });
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_resume = response.data.data;
      }
      return this.my_resume;
    },

    async deleteResume(id) {
      const response = await useApi("seeker/resumes/" + id, {
        method: "delete",
        payload: {},
      });
      return response;
    },
    // async getMyDrafts(payload, add = false) {
    //   const {data} = await useApi('resumes/search', {
    //     method: 'get',
    //     payload
    //   });
    //   if (data && 'items' in data){
    //       this.my_drafts = data.items;
    //       this.my_current_page = data.current_page;
    //       this.my_total = data.total;
    //   }
    //   return data;
    // },
    async getAvailabilityCreate(payload = {}) {
      const response = await useApi("seeker/resumes/availability_create", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        this.can_create_resume = response.data.data.available;
        this.can_create_resume_count = response.data.data.free ?? 0;
      }
      return response;
    },

    async createResume(payload, cb = null) {
      const response = await useApi("seeker/resumes/create", {
        method: "post",
        payload,
        cb,
      });
      return response;
    },
    async submitResume(payload) {
      const response = await useApi("seeker/negotiations", {
        method: "post",
        payload,
      });
      return response;
    },
    async modifyNotifications(payload) {
      const response = await useApi("seeker/resumes/notifications", {
        method: "PUT",
        payload,
      });
      return response;
    },
    async updateResume(id, payload) {
      const response = await useApi("seeker/resumes/" + id, {
        method: "PUT",
        payload,
      });
      if ("data" in response && response.data.status === "success") {
        this.my_resume = response.data.data;
      }
      return response;
    },
    async publishResume(id, payload, content_type = "application/json") {
      const response = await useApi("seeker/resumes/publish/" + id, {
        method: "PUT",
        content_type,
        payload,
      });
      // if ('data' in response && response.data.status === 'success'){
      //   this.resume = response.data;
      // }
      return response;
    },
    async getResume(id, payload) {
      const response = await useApi("seeker/resumes/" + id, {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        this.resume = data.data;
        return this.resume;
      }
      return response;
    },
    async getSingleResume(id, payload) {
      const response = await useApi("employer/resumes/" + id, {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        this.resume = response.data.data;
        return this.resume;
      }
      return response.data.data;
    },
    clearResumes() {
      this.resumes = [];
      this.total = 0;
    },
    async getMyFavoriteResumes(payload) {
      const response = await useApi("employer/resumes/favorites", {
        method: "get",
        params: payload,
      });
      if (response.status === "success" && response.data.data.length > 0) {
        this.my_favorite_resumes = response.data.data;
        if (payload.page) {
          this.current_page = payload.page;
        }
      }
      return this.my_favorite_resumes;
    },
    async getRegions(payload = {}) {
      const { data } = await useApi("area/regions", {
        method: "get",
        payload,
      });
      if (data) {
        this.regions = data.data.regions;
      }
      return data;
    },
    async getCities(payload = {}) {
      const { data } = await useApi("area/cities", {
        method: "get",
        params: payload,
      });

      if (data && "data" in data && Object.keys(payload).length !== 0) {
        return data.data ?? [];
      }

      if (data && "data" in data) {
        this.cities = data.data ?? [];
      }
      return this.cities;
    },
    async getSpecializations(payload) {
      const { data } = await useApi("specializations", {
        method: "get",
        payload,
      });
      if (data) {
        this.specializations = data.data;
      }
      return data;
    },
    async getWorkTypes(payload) {
      const { data } = await useApi("dictionaries?group=work_type", {
        method: "get",
        payload,
      });
      if (data) {
        this.work_types = data.data.work_type;
      }
      return data;
    },
    async getSchedules(payload = {}) {
      const { data } = await useApi("dictionaries?group=schedule", {
        method: "get",
        payload,
      });
      if (data) {
        this.schedules = data.data.schedule;
      }
      return data;
    },
    async getExperiences(payload = {}) {
      const { data } = await useApi("dictionaries?group=experience", {
        method: "get",
        payload,
      });
      if (data) {
        this.experiences = data.data.experience;
      }
      return data;
    },
    async getPartTimes(payload = {}) {
      const { data } = await useApi("dictionaries?group=part_time", {
        method: "get",
        payload,
      });
      if (data) {
        this.part_times = data.data.part_time;
      }
      return data;
    },
    async getIndustries(payload) {
      // if (this.industries.length > 0 && payload.force !== true) {
      //   return this.industries;
      // }
      const { data } = await useApi("industries", {
        method: "get",
        payload,
      });
      if (data) {
        this.industries = data.data;
      }
      return data.data;
    },
    async getMetros(payload) {
      const { data } = await useApi("metro", {
        method: "get",
        payload,
      });
      if (data) {
        this.metros = data.data;
      }
      return data.data;
    },

    async addToFavorite(payload) {
      const response = await useApi("employer/resumes/favorites", {
        method: "post",
        payload,
      });
      if (response.status === "success") {
        this.resumes = this.resumes.map((resume) => {
          if (String(resume.id) === payload.id) {
            resume.is_favorite = true;
          }
          return resume;
        });
      }
      return response;
    },

    async getPhoneInfo(payload) {
      const response = await useApi("seeker/phone/info", {
        method: "get",
        params: payload,
      });
      return response;
    },

    async getPhoneConfirmationCode(payload) {
      const response = await useApi("seeker/phone/send_code_to_verify", {
        method: "post",
        payload,
      });
      return response;
    },

    async confirmPhoneConfirmationCode(payload) {
      const response = await useApi("seeker/phone/confirm", {
        method: "post",
        payload,
      });
      return response;
    },

    async removeFromFavorite(payload) {
      const response = await useApi(
        "employer/resumes/favorites/" + payload.id,
        {
          method: "delete",
          params: payload,
        },
      );
      if (response.status === "success") {
        this.resumes = this.resumes.map((resume) => {
          if (resume.id === id) {
            resume.is_favorite = false;
          }
          return resume;
        });
      }
      return response;
    },
  },
  share: {
    // An array of fields that the plugin will ignore.
    omit: [],
    // Override global config for this store.
    enable: false,
    initialize: false,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useResumeStore, import.meta.hot));
}
