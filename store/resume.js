// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi";

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
      providers: {
        hh: null,
        superjob: null,
      },
    };
  },
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
  },
  actions: {
    async getAreas(payload) {
      console.log(payload);
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
      const response = await useApi("seeker/used_providers", {
        method: "get",
      });

      if (response.data && "data" in response.data) {
        this.providers = response.data.data;
        return this.providers;
      }
      return data;
    },

    async importResumes() {
      const { data } = await useApi("seeker/resumes/import", {
        method: "get",
      });

      return data;
    },
    async syncResumes() {
      const { data } = await useApi("seeker/resumes/sync", {
        method: "get",
        params: {
          providers: ["hh", "superjob"],
        },
      });

      return data;
    },

    async disconnectProviders(payload) {
      const { data } = await useApi("seeker/disconnect_providers", {
        method: "DELETE",
        params: payload,
      });

      return data;
    },

    async getSeekerProvidersAuthEndpoints(
      payload,
      redirect_to = "/profile/service-verify",
    ) {
      const { data } = await useApi(
        "services/auth/redirect-url?profile=seeker&redirect_to=" + redirect_to,
        {
          method: "get",
          payload,
        },
      );
      if ("data" in data) {
        return data.data;
      }
      return data;
    },
    async getResumes(payload, add = false) {
      const { data } = await useApi("resumes/search", {
        method: "get",
        params: payload,
      });
      if (data && "items" in data) {
        if (add) {
          this.resumes = this.resumes.concat(data.items);
          this.current_page++;
        } else {
          this.resumes = data.items;
          this.current_page = 1;
        }
        this.total = data.found;
      }
      return data;
    },
    async getMyNegotiations(payload) {
      const response = await useApi("seeker/negotiations", {
        method: "get",
        params: payload,
      });
      if (response.hasOwnProperty("data")) {
        console.log(response.data);
        this.my_negotiations = response.data.items;
      }
      return response;
    },
    async getUserResumes(payload) {
      return useApi("seeker/resumes", {
        method: "get",
        payload,
      });
    },
    async getMyResumes(payload) {
      const response = await this.getUserResumes(payload);
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_resumes = response.data.data;
        this.my_total = response.data.found;
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
      return response;
    },

    async deleteResume(id) {
      console.log(id);
      const response = await useApi("seeker/resumes/" + id, {
        method: "delete",
        payload: {},
      });
      console.log(response);
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
    async createResume(payload) {
      console.log(payload);
      const response = await useApi("seeker/resumes/create", {
        method: "post",
        payload,
      });
      console.log(response);
      // if ('data' in response){
      //   this.resume = response.data;
      // }
      return response;
    },
    async submitResume(payload) {
      console.log(payload);
      const response = await useApi("seeker/negotiations", {
        method: "post",
        payload,
      });
      console.log(response);
      // if ('data' in response){
      //   this.resume = response.data;
      // }
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
      // if ('data' in response && response.data.status === 'success'){
      //   this.resume = response.data;
      // }
      return response;
    },
    async publishResume(id, payload, content_type = "application/json") {
      console.log(payload);
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
      const { data } = await useApi("seeker/resumes/" + id, {
        method: "get",
        payload,
      });
      if (data) {
        this.resume = data.data;
      }
      return data;
    },
    async clearResumes() {
      this.resumes = [];
    },
    async getMyFavoriteResumes(payload) {
      const { data } = await useApi("favorite/vacancies", {
        method: "get",
        payload,
      });
      console.log(data);
      if ("items" in data) {
        this.my_favorite_resumes = data.items;
        if (payload.page) {
          this.current_page = payload.page;
        }
      }
      return data;
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
      console.log(payload);
      const { data } = await useApi("area/cities", {
        method: "get",
        payload,
      });
      if (data) {
        console.log(data);
        this.cities = data.data.cities;
      }
      return data;
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
      const response = await useApi("resume/favorite", {
        method: "post",
        payload,
      });
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
      const response = await useApi("resume/favorite", {
        method: "delete",
        payload,
      });
      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useResumeStore, import.meta.hot));
}
