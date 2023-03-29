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
      total: 0,
      current_page: 0,
      my_vacancies: [],
      specializations: [],
      industries: [],
      areas: [],
      countries: [],
      regions: [],
      cities: [],
      work_types: [],
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
      console.log(payload);
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
    async clearVacancies() {
      this.vacancies = [];
    },
    async getMyVacancies(payload) {
      const {data} = await useApi('vacancies/search', {
        method: 'get',
        payload
      });
      if ('data' in data){
        this.my_vacancies = data.data;
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

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVacancyStore, import.meta.hot));
}