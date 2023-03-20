import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";

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
    }
  },
  actions: {
    async getAreas(payload) {
      console.log(payload);
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'area';

      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.get(
            url,
            {params: payload},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response){
          console.log(response.data);
          this.areas = response.data;
          return {
            status: 'success',
            data: response.data
          };
        }else{
          return {
            status: 'success',
            data: response.data
          };
        }
      }catch (error){
        console.log(error);
        if ('data' in error.response){
          return {
            status: 'error',
            data: error.response.data
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },
    async getVacancies(payload, add = false) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'vacancies/search';

      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.get(
            url,
            {params: payload},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response && 'items' in response.data){
          if (add){
            this.vacancies = this.vacancies.concat(this.vacancies);
          }else{
            this.vacancies = response.data.items;
          }
          this.total = response.data.total;
          this.current_page = response.data.current_page;
          return {
            status: 'success',
            data: response.data
          };
        }else{
          return {
            status: 'success',
            data: response.data
          };
        }
      }catch (error){
        console.log(error);
        if ('data' in error.response){
          return {
            status: 'error',
            data: error.response.data
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },
    async clearVacancies() {
      this.vacancies = [];
    },
    async getMyVacancies(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'employer/vacancies';

      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.get(
            url,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response){
          console.log(response.data);
          this.my_vacancies = response.data.data;
          return {
            status: 'success',
            data: response.data
          };
        }else{
          return {
            status: 'success',
            data: response.data
          };
        }
      }catch (error){
        console.log(error);
        if ('data' in error.response){
          return {
            status: 'error',
            data: error.response.data
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },
    async getRegions(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'area/regions';

      let token;
      if (typeof window !== 'undefined') {
        // Perform localStorage action
        token = localStorage.getItem('token')
      }
      try {

        const response = await axios.get(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response.data){
          this.regions = response.data.data.regions;
          return {
            status: 'success',
            data: response.data.data
          };
        }else{
          return {
            status: 'success',
            data: response.data
          };
        }
      }catch (error){
        console.log(error);
        if ('data' in error.response){
          return {
            status: 'error',
            data: error.response.data
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },
    async getSpecializations(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'specializations';

      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.get(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response.data){
          this.specializations = response.data.data;
          return {
            status: 'success',
            data: response.data.data
          };
        }else{
          return {
            status: 'success',
            data: response.data
          };
        }
      }catch (error){
        console.log(error);
        if ('data' in error.response){
          return {
            status: 'error',
            data: error.response.data
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },
    async getIndustries(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'industries';

      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.get(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response.data){
          this.industries = response.data.data;
          return {
            status: 'success',
            data: response.data.data
          };
        }else{
          return {
            status: 'success',
            data: response.data
          };
        }
      }catch (error){
        console.log(error);
        if ('data' in error.response){
          return {
            status: 'error',
            data: error.response.data
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVacancyStore, import.meta.hot));
}