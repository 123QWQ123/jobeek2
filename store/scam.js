import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";
import useApi from "~/hooks/useApi";

export const useScamStore = defineStore('scam', {
  state: () => {
    return {
      frequency_options: [],
      rate_options: [],
      categories: [],
      history_items: [],
      subscribed_items: [],
    }
  },
  actions: {

    async searchPhone(payload = {}) {
      const {data} = await useApi('scam/getPhoneInfo', {
        method: 'get',
        payload
      });
      console.log(data);
      // if (data && 'data' in data){
      //   this.searched_phones = data.data;
      //   return this.searched_phones;
      // }
      return data;
    },

    async getHistory(payload = {}) {
      const {data} = await useApi('scam/getHistory', {
        method: 'get',
        payload
      });
      if (data && data.hasOwnProperty('data')){
        this.history_items = data.data;
        return this.history_items;
      }
      return data;
    },

    async getSubscribedPhones(payload = {}) {
      const {data} = await useApi('scam/getFavorite', {
        method: 'get',
        payload
      });
      if (data && data.hasOwnProperty('data')){
        this.subscribed_items = data.data;
        return this.subscribed_items;
      }
      return data;
    },

    async addFavorite(payload = {}) {
      const response = await useApi('scam/addFavorite', {
        method: 'post',
        payload
      });
      this.getHistory();
      this.getSubscribedPhones();
      return response;
    },

    async saveComment(payload = {}) {
      const response = await useApi('scam/saveComment', {
        method: 'post',
        payload
      });
      return response;
    },

    async removeFavorite(payload = {}) {
      const response = await useApi('scam/addFavorite', {
        method: 'delete',
        payload
      });
      this.getHistory();
      this.getSubscribedPhones();
      return response;
    },

    async getScamOptions(payload = {}) {
      const {data} = await useApi('scam/getOptions', {
        method: 'get',
        payload
      });
      console.log(data);

      if (data){
        this.frequency_options = data.frequency;
        this.rate_options = data.rate;
        this.categories = data.categories;
        return data.data;
      }
      return data;
    },


  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScamStore, import.meta.hot));
}