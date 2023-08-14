import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";
import useApi from "~/hooks/useApi";
import vueNumberFormat from "~/plugins/vueNumberFormat";

export const useRoute = defineStore('route', {
  state: () => {
    return {
      page: "index",
      params: {},
    }
  },
  actions: {

    numberFormat (value) {
      return vueNumberFormat(value,  {});
    },

    async getPageQuery() {
      return this.params;
    },
    async getPage() {
      return this.page;
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoute, import.meta.hot));
}