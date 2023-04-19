import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";
import useApi from "~/hooks/useApi";

export const useVacancyStore = defineStore('vacancy', {
  state: () => {
    return {
      list: [],
      vacancies: [],
      vacancy: null,
      total: 0,
      my_total: 0,
      data: null,
      current_page: 1,
      my_vacancies: [],
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
    }
  },
  getters: {
    top_10_vacancies: (state) => {
      return state.vacancies.slice(0, 10);
    },
    top_20_vacancies: (state) => {
      return state.vacancies.slice(0, 20);
    },
    top_30_vacancies: (state) => {
      return state.vacancies.slice(0, 30);
    }
  },
  actions: {
    async getAreas(payload) {
      const {data} = useApi('area', {
        method: 'get',
        payload
      });
      if (data){
        this.areas = data;
      }
      return data;
    },
    async getVacancies(payload, add = false) {
      const {data} = await useApi('vacancies/search', {
        method: 'get',
        payload
      });
      if (data && 'items' in data){
        if (add){
          this.vacancies = this.vacancies.concat(data.items);
          this.current_page++;
        }else{
          this.vacancies = data.items;
          this.current_page = 1;
        }
        this.total = data.found;
      }
      return data;
    },
    async getVacancy(id, payload) {
      const {data} = await useApi('vacancy/' + id, {
        method: 'get',
        payload
      });
      console.log(data);
      if (data){
        this.vacancy = data;
      }
      return data;
    },
    async clearVacancies() {
      this.vacancies = [];
    },
    async getMyVacancies(payload) {
      const response = await useApi('employer/vacancies', {
        method: 'get',
        payload
      });
      console.log(response);
      if (response && 'data' in response && 'items' in response.data){
        this.my_vacancies = response.data.items;
        this.my_total = response.data.found;
        this.current_page = response.data.current_page;
      }
      return response;
    },
    async getProvidersAuthUrl(payload) {
      const {data} = await useApi('services/hh/auth/redirect-url', {
        method: 'get',
        payload
      });
      if ('data' in data){
        return data.data;
      }
      return data;
    },
    async getConnectedProviders(payload) {
      const {data} = await useApi('employer/used_providers', {
        method: 'get',
        payload
      });
      console.log(data);
      if ('data' in data){
        return data.data;
      }
      return data;
    },
    async getMyFavoriteVacancies(payload) {
      const {data} = await useApi('vacancies/search', {
        method: 'get',
        payload
      });
      if ('items' in data){
        this.my_favorite_vacancies = data.items;
        if (payload.page) {
          this.current_page = payload.page;
        }
      }
      return data;
    },
    async getRegions(payload = {}) {
      const {data} = await useApi('area/regions', {
        method: 'get',
        payload
      });
      if (data){
        this.regions = data.data.regions;
      }
      return data;
    },
    async getCities(payload = {}) {
      console.log(payload)
      const {data} = await useApi('area/cities', {
        method: 'get',
        payload
      });
      if (data){
        console.log(data)
        this.cities = data.data.cities;
      }
      return data;
    },
    async getSpecializations(payload) {
      const {data} = await useApi('specializations', {
        method: 'get',
        payload
      });
      if (data){
        this.specializations = data.data;
      }
      return data;
    },
    async getWorkTypes(payload) {
      const {data} = await useApi('dictionaries?group=work_type', {
        method: 'get',
        payload
      });
      if (data){
        this.work_types = data.data.work_type;
      }
      return data;
    },
    async getSchedules(payload = {}) {
      const {data} = await useApi('dictionaries?group=schedule', {
        method: 'get',
        payload
      });
      if (data){
        this.schedules = data.data.schedule;
      }
      return data;
    },
    async getExperiences(payload = {}) {
      const {data} = await useApi('dictionaries?group=experience', {
        method: 'get',
        payload
      });
      if (data){
        this.experiences = data.data.experience;
      }
      return data;
    },
    async getPartTimes(payload = {}) {
      const {data} = await useApi('dictionaries?group=part_time', {
        method: 'get',
        payload
      });
      if (data){
        this.part_times = data.data.part_time;
      }
      return data;
    },
    async getIndustries(payload) {
      const {data} = await useApi('industries', {
        method: 'get',
        payload
      });
      if (data){
        this.industries = data.data;
      }
      return data.data;
    },
    async getMetros(payload) {
      const {data} = await useApi('metro', {
        method: 'get',
        payload
      });
      if (data){
        this.metros = data.data;
      }
      return data.data;
    },

    async addToFavorite(payload) {
      const response = await useApi('vacancy/favorite', {
        method: 'post',
        payload
      });
      return response;
    },

    async removeFromFavorite(payload) {
      const response = await useApi('vacancy/favorite', {
        method: 'delete',
        payload
      });
      return response;
    },

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVacancyStore, import.meta.hot));
}