import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";

export const useVacancyStore = defineStore('vacancy', {
  state: () => {
    return {
      list: [],
      specializations: [],
      regions: [],
    }
  },
  actions: {
    async getRegions(payload) {
      const CONFIG = useRuntimeConfig();
      console.log(CONFIG.public.apiBase);
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
        console.log(response)
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
      console.log(CONFIG.public.apiBase);
      let url = CONFIG.public.apiBase + 'vacancies/specialization_in_city';

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

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVacancyStore, import.meta.hot));
}