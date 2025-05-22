// no need to import defineStore and acceptHMRUpdate
import useApi from "~/hooks/useApi";
import { useAuthStore } from "~/store/auth.js";
import { defineStore } from "pinia";
import { ref } from "vue";
import { parse, stringify } from "zipson/lib";

export const useVacancyStore = defineStore("vacancy", {
  state: () => ({
    vacancies: [],
    vacancies_in_my_city: [],
    vacancies_in_moscow: [],
    vacancies_in_top_companies: [],
    vacancy: null,
    my_vacancy: null,
    total: 0,
    my_total: 0,
    my_draft_total: 0,
    data: null,
    current_page: 1,
    my_draft_current_page: 1,
    my_draft_last_page: 0,
    my_vacancies: [],
    my_drafts: [],
    my_archived_vacancies: [],
    my_archived_vacancies_current_page: 1,
    my_archived_vacancies_last_page: 0,
    my_archived_vacancies_total: 0,
    my_favorite_vacancies: [],
    specializations: [],
    professional_roles: [],
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
    can_create_vacancy: null,
    can_create_vacancy_count: 0,
    provider_auth_urls: {
      hh: null,
      superjob: null,
    },
    providers: {
      hh: false,
      superjob: false,
    },
    employerMessage: "",
  }),
  persist: false,
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
    industries_formatted_for_filter: (state) => {
      let new_items = JSON.parse(JSON.stringify(state.industries));
      new_items = new_items.map((item) => {
        item.parent_id = null;
        item.checked = false;
        item.items = item.industries.map((sub_item) => {
          sub_item.parent_id = item.id;
          sub_item.checked = false;
          return sub_item;
        });
        delete item.industries;
        return item;
      });
      let items = [];
      new_items.map((item) => {
        items.push(item);
        items.concat(item.items);
      });
      return items;
    },
    professional_roles_formatted_for_filter: (state) => {
      let new_items = JSON.parse(JSON.stringify(state.professional_roles));
      const parent_items = new_items.filter((item) => item.parent_id === 0);
      for (let key in parent_items) {
        parent_items[key].professional_roles = new_items.filter(
          (item) => item.parent_id === item.id,
        );
      }
      new_items = parent_items.map((item) => {
        item.parent_id = null;
        item.items = item.professional_roles.map((sub_item) => {
          sub_item.parent_id = item.id;
          return sub_item;
        });
        delete item.professional_roles;
        return item;
      });
      let items = [];
      new_items.map((item) => {
        items.push(item);
        items.concat(item.items);
      });
      return items.map((item) => {
        item.title = item.name;
        return item;
      });
    },
    my_city_vacancies: (state) => {
      return state.vacancies_in_my_city.slice(0, 3);
    },
    regions_formatted: (state) => {
      return state.regions.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    cities_formatted: (state) => {
      return state.cities.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    metros_formatted: (state) => {
      return state.metros.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
  },
  actions: {
    async getConnectedEmployerProviders() {
      const { isEmployer, isAuthenticated, employer } =
        storeToRefs(useAuthStore());
      if (
        isEmployer.value &&
        isAuthenticated.value &&
        employer.value.is_completed
      ) {
        const response = await useApi("employer/used_providers", {
          method: "get",
          params: {},
        });

        if ("data" in response) {
          this.providers = response.data.data;
        }
      }
      return this.providers;
    },
    async synVacancies() {
      const { data } = await useApi("employer/vacancies/sync", {
        method: "POST",
        payload: {
          providers: ["hh", "superjob"],
        },
      });

      return data;
    },

    async disconnectProviders(payload) {
      return await useApi("employer/disconnect_providers", {
        method: "DELETE",
        params: payload,
      });
    },
    async getEmployerProvidersAuthEndpoints(
      payload,
      redirect_to = "/profile/service-verify",
    ) {
      if (this.provider_auth_urls.hh && this.provider_auth_urls.superjob) {
        return this.provider_auth_urls;
      }
      const response = await useApi("services/auth/redirect-url", {
        method: "get",
        params: { ...payload, redirect_to, profile: "employer" },
      });
      if (response.status === "success") {
        this.provider_auth_urls = response.data.data;
      }

      return this.provider_auth_urls;
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
      const response = await useApi("vacancies/search", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        if (add) {
          this.vacancies = this.vacancies.concat(response.data.items);
          this.current_page = response.data.current_page;
        } else {
          this.vacancies = response.data.items;
          this.current_page = 1;
        }
        this.total = response.data.found;
        return this.vacancies;
      }
      return this.vacancies;
    },
    async getVacanciesInMoscow(payload, is_new = false) {
      if (this.vacancies_in_moscow.length > 0) {
        return this.vacancies_in_moscow;
      }
      const response = await useApi("vacancies/search", {
        method: "get",
        params: {
          countries: [1],
          region_ids: [22],
        },
      });
      if (response.status === "success") {
        this.vacancies_in_moscow = response.data.items;
      }
      return this.vacancies_in_moscow;
    },
    async getVacanciesInTopCompanies() {
      if (this.vacancies_in_top_companies.length > 0) {
        return this.vacancies_in_top_companies;
      }
      const response = await useApi("getTopCompanies", { method: "get" });
      if (response.status === "success") {
        this.vacancies_in_top_companies = response.data;
      }
      return this.vacancies_in_top_companies;
    },
    async getCurrencyCityVacancies(payload) {
      if (this.vacancies_in_my_city.length > 0) {
        return this.vacancies_in_my_city;
      }
      const response = await useApi("vacancies/search", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        this.vacancies_in_my_city = response.data.items;
      }
      return this.vacancies_in_my_city;
    },
    async getVacancy(id, payload) {
      const response = await useApi("vacancy/" + id, {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        if (response.hasOwnProperty("data")) {
          this.vacancy = response.data;
        }
        return response.data;
      } else {
        useNuxtApp().$toast.info(response.message, { autoClose: 3000 });
      }
    },
    async clearVacancies() {
      this.vacancies = [];
    },

    async getCreateAvailability(payload = {}) {
      const response = await useApi("employer/vacancy/availability_create", {
        method: "get",
        params: payload,
      });
      if (response.status === "success") {
        this.can_create_vacancy = response.data.data.available;
        this.can_create_vacancy_count = response.data.data.free ?? 0;
        return;
      }
      return response;
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
        params: payload,
      });
    },
    async getMyVacancies(payload) {
      const response = await this.getUserVacancies({
        status: "active",
        ...payload,
      });
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_vacancies = response.data.data;
        this.my_total = response.data.meta.total;
        this.my_current_page = response.data.meta.current_page;
        this.my_last_page = response.data.meta.last_page;
      }
      return response;
    },
    async getArchivedVacancies(payload = {}) {
      const response = await this.getUserVacancies({
        status: "archived",
        ...payload,
      });
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_archived_vacancies = response.data.data;
        this.my_archived_vacancies_total = response.data.meta.total;
        this.my_archived_vacancies_current_page =
          response.data.meta.current_page;
        this.my_archived_vacancies_last_page = response.data.meta.last_page;
      }
      return response;
    },
    async getMyDrafts(payload = {}) {
      const response = await useApi("employer/vacancy/drafts", {
        method: "get",
        params: {
          status: "draft",
          ...payload,
        },
      });
      if (response.hasOwnProperty("data") && "data" in response.data) {
        this.my_drafts = response.data.data;
        this.my_draft_total = response.data.meta.total;
        this.my_draft_current_page = response.data.meta.current_page;
        this.my_draft_last_page = response.data.meta.last_page;
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
      const { data } = await useApi("seeker/vacancies/favorites", {
        method: "get",
        params: payload,
      });

      if (data.data.length > 0) {
        this.my_favorite_vacancies = data.data;
        if (payload.page) {
          this.current_page = data.meta.current_page;
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
        this.regions = data.data ?? [];
      }
      return data;
    },
    async getCities(payload = {}) {
      const { data } = await useApi("area/cities", {
        method: "get",
      });
      if (data && "data" in data) {
        this.cities = data.data ?? [];
      }
      return this.cities;
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
        params: payload,
      });
      if (response && "data" in response) {
        this.industries.push(...response.data.data);
        return this.industries;
      }
      return this.industries;
    },
    async getProfessionalRoles(payload = {}) {
      if (this.professional_roles.length > 0) {
        return this.professional_roles;
      }
      const response = await useApi("professional_roles", {
        method: "get",
        params: payload,
      });
      if (response && "data" in response) {
        this.professional_roles = response.data.data ?? [];
        return this.professional_roles;
      }
      return response;
    },
    async getMetros(payload = URLSearchParams) {
      const { data } = await useApi("metro", {
        method: "get",
        params: payload,
      });
      if (data && "data" in data) {
        this.metros = data.data ?? [];
        return this.metros;
      }
      return data;
    },

    async addToFavorite(payload = URLSearchParams) {
      return await useApi("seeker/vacancies/favorites", {
        method: "post",
        payload,
      });
    },

    async removeFromFavorite(id, payload) {
      return await useApi("seeker/vacancies/favorites/" + id, {
        method: "delete",
        data: JSON.stringify(payload),
      });
    },

    async deleteVacancy(id, payload = URLSearchParams) {
      const response = await useApi(
        "employer/vacancy/" + id + "?" + payload.toString(),
        {
          method: "delete",
        },
      );
      return response;
    },
    async deleteDraft(id) {
      return await useApi("employer/vacancy/draft/" + id, {
        method: "delete",
      });
    },

    async archiveActiveVacancy(id, payload = URLSearchParams) {
      return await useApi("employer/vacancy/archiving/" + id, {
        method: "PUT",
        content_type: "application/json",
        payload,
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVacancyStore, import.meta.hot));
}
