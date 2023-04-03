import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";
import useApi from "~/hooks/useApi";

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
      const {data} = await useApi('area/regions', {
        method: 'get',
        payload
      });
      if (data) {
        this.regions = data.data.regions;
      }
      return data;
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAreaStore, import.meta.hot));
}