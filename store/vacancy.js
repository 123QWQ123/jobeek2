// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi";

export const useVacancyStore = defineStore("vacancy", {
  state: () => {
    return {
      vacancies: [],
      vacancies_in_my_city: [],
      vacancy: null,
      my_vacancy: null,
      total: 0,
      my_total: 0,
      my_draft_total: 0,
      data: null,
      current_page: 1,
      my_draft_current_page: 1,
      my_vacancies: [],
      my_drafts: [],
      my_archived_vacancies: [],
      my_favorite_vacancies: [],
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
      driver_licenses: [],
      genders: [],
      place_of_works: [],
      foreign_languages: [],
      language_levels: [],
      marital_statuses: [],
      childrens: [],
      vacancy_billing_types: [],
      vacancy_types: [],

      providers: {
        hh: null,
        superjob: null,
      },
      employerMessage: "",
    };
  },
  getters: {
    top_10: (state) => {
      return state.vacancies.slice(0, 10);
    },
    top_20: (state) => {
      return state.vacancies.slice(0, 20);
    },
    top_30: (state) => {
      return state.vacancies.slice(0, 30);
    },
    top_20_industries: (state) => {
      return state.industries.slice(0, 20);
    },
    my_city_vacancies: (state) => {
      return state.vacancies_in_my_city.slice(0, 3);
    },
  },
  actions: {
    async getConnectedEmployerProviders() {
      const response = await useApi("employer/used_providers", {
        method: "get",
        params: {},
      });
      if ("data" in response) {
        this.providers = response.data.data;
        return this.providers;
      }
      return response.data;
    },
    async importVacancies() {
      const payload = [];
      // providers[]=superjob&providers[]=hh
      if (this.providers.hh) {
        payload.push("hh");
      }
      if (this.providers.superjob) {
        payload.push("superjob");
      }

      const { data } = await useApi("employer/vacancies/import", {
        method: "post",
        payload: { providers: payload },
      });

      // console.log(data.message);
      //
      // if (data.hasOwnProperty('message')){
      //   this.employerMessage = data.message;
      // }
      return data;
    },

    async getEmployerProvidersAuthEndpoints(
      payload,
      redirect_to = "/profile/service-verify",
    ) {
      const response = await useApi("services/auth/redirect-url", {
        method: "get",
        params: { ...payload, redirect_to, profile: "employer" },
      });
      console.log(response);
      if ("data" in response) {
        return response.data;
      }
      return response;
    },

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
    async getVacancies(payload, add = false) {
      const { data } = await useApi("vacancies/search", {
        method: "get",
        params: payload,
      });
      if (data && "items" in data) {
        if (add) {
          this.vacancies = this.vacancies.concat(data.items);
          this.current_page++;
        } else {
          this.vacancies = data.items;
          this.current_page = 1;
        }
        this.total = data.found;
        return this.vacancies;
      }
      return data;
    },
    async getCurrencyCityVacancies(payload) {
      const { data } = await useApi("vacancies/search", {
        method: "get",
        params: payload,
      });
      if (data && "items" in data) {
        this.vacancies_in_my_city = data.items;
        return this.vacancies_in_my_city;
      }
      return data;
    },
    async getVacancy(id, payload) {
      const response = await useApi("vacancy/" + id, {
        method: "get",
        params: payload,
      });
      if (response.hasOwnProperty("data")) {
        this.vacancy = response.data;
      }
      return response.data;
    },
    async clearVacancies() {
      this.vacancies = [];
    },

    async createDraft(payload, content_type = "application/json") {
      const response = await useApi("employer/vacancy/draft/create", {
        method: "post",
        content_type,
        payload,
      });
      // if ('data' in response){
      //   this.resume = response.data;
      // }
      return response;
    },

    async updateDraft(id, payload, content_type = "application/json") {
      const response = await useApi("employer/vacancy/draft/" + id, {
        method: "PUT",
        content_type,
        payload,
      });
      if ("data" in response && response.data.hasOwnProperty("data")) {
        this.my_vacancy = response.data.data;
      }
      return response;
    },
    async createDraftFromActiveVacancy(id, content_type = "application/json") {
      const response = await useApi("employer/vacancy/create/draft/" + id, {
        method: "POST",
        content_type,
        payload: {},
      });
      // if ('data' in response && response.data.hasOwnProperty('data')){
      //   this.my_vacancy = response.data.data;
      // }
      return response;
    },

    async updateVacancy(id, payload, content_type = "application/json") {
      const response = await useApi("employer/vacancy/" + id, {
        method: "PUT",
        content_type,
        payload,
      });
      if ("data" in response && response.data.hasOwnProperty("data")) {
        return await this.getMyVacancy(id);
      }
      return response;
    },

    async publishDraft(id, payload = {}, content_type = "application/json") {
      const response = await useApi("employer/vacancy/publish/" + id, {
        method: "POST",
        content_type,
        payload,
      });

      // if ('data' in response && response.data.status === 'success'){
      //   this.resume = response.data;
      // }
      return response;
    },

    async getUserVacancies(payload) {
      return useApi("employer/vacancies", {
        method: "get",
        payload,
      });
    },
    async getMyVacancies(payload) {
      const response = await this.getUserVacancies(payload);
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_vacancies = response.data.data;
        this.my_total = response.data.found;
        this.current_page = response.data.current_page;
      }
      return response;
    },
    async getArchivedVacancies(payload = { status: "archived" }) {
      const response = await this.getUserVacancies(payload);
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_archived_vacancies = response.data.data;
        this.my_total = response.data.found;
        this.current_page = response.data.current_page;
      }
      return response;
    },
    async getMyDrafts(payload = {}) {
      const response = await useApi("employer/vacancy/drafts", {
        method: "get",
        params: payload,
      });
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_drafts = response.data.data;
        this.my_draft_total = response.data.found;
        this.my_draft_current_page = response.data.current_page;
        return this.my_drafts;
      }
      return response;
    },
    async getMyDraft(payload) {
      const response = await useApi("employer/vacancy/draft/" + payload, {
        method: "get",
      });
      if (
        response &&
        "data" in response &&
        response.data &&
        "data" in response.data
      ) {
        this.my_vacancy = response.data.data;
      }
      return response;
    },
    async getMyVacancy(id) {
      const response = await useApi("employer/vacancy/" + id, {
        method: "get",
      });
      if (
        response &&
        "data" in response &&
        response.data &&
        "data" in response.data
      ) {
        this.my_vacancy = response.data.data;
      }
      return response;
    },
    async getMyFavoriteVacancies(payload) {
      const { data } = await useApi("favorite/vacancies", {
        method: "get",
        params: payload,
      });
      if (data && "items" in data) {
        this.my_favorite_vacancies = data.items;
        if (payload.page) {
          this.current_page = payload.page;
        }
      }
      return data;
    },
    async getRegions(payload = {}) {
      const { data } = await useApi("area/regions", {
        method: "get",
        params: payload,
      });
      if (data && "data" in data) {
        this.regions = data.data?.regions ?? [];
      }
      return data;
    },
    async getCities(payload = {}) {
      const { data } = await useApi("area/cities", {
        method: "get",
        params: payload,
      });
      if (data && "data" in data) {
        this.cities = data.data?.cities ?? [];
      }
      return data;
    },
    async getSpecializations(payload = URLSearchParams) {
      if (this.specializations.length > 0) {
        return this.specializations;
      }
      const { data } = await useApi("specializations", {
        method: "get",
        params: payload,
      });
      if (data && "data" in data) {
        this.specializations = data.data ?? [];
      }
      return data;
    },
    async getIndustries(payload = {}) {
      if (this.industries.length > 0) {
        return this.industries;
      }
      const response = await useApi("industries", {
        method: "get",
        payload,
      });
      if (response && "data" in response) {
        let industries = response.data.data ?? [];
        let new_items = [];
        industries.map(
          (item) => (new_items = new_items.concat(item.industries)),
        );
        this.industries = new_items;
        return this.industries;
      }
      return response;
    },
    async getMetros(payload = URLSearchParams) {
      const { data } = await useApi("metro", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.metros = data.data ?? [];
        return this.metros;
      }
      return data;
    },

    async addToFavorite(payload = URLSearchParams) {
      const response = await useApi("seeker/favorite", {
        method: "post",
        payload,
      });
      return response;
    },

    async removeFromFavorite(payload = URLSearchParams) {
      const response = await useApi("vacancy/favorite", {
        method: "delete",
        payload,
      });
      return response;
    },

    async deleteVacancy(id, payload = URLSearchParams) {
      const response = await useApi(
        "employer/vacancy/" + id + "?" + payload.toString(),
        {
          method: "delete",
        },
      );
      console.log(response);
      return response;
    },
    async deleteDraft(id) {
      const response = await useApi("employer/vacancy/draft/" + id, {
        method: "delete",
      });
      return response;
    },

    async archiveActiveVacancy(id, payload = URLSearchParams) {
      const response = await useApi("employer/vacancy/archiving/" + id, {
        method: "PUT",
        content_type: "application/json",
        payload,
      });
      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVacancyStore, import.meta.hot));
}
