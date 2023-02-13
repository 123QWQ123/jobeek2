import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";

export const useAreaStore = defineStore('area', {
  state: () => {
    return {
      countries: [],
      regions: [],
      cities: [],
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
        }
      }catch (error){
        this.regions = []
        return {
          status: 'error',
          message: error.message,
        };
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAreaStore, import.meta.hot));
}