// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi";

export const useScamStore = defineStore("scam", {
  state: () => {
    return {
      frequency_options: [],
      rate_options: [],
      categories: [],
      history_items: [],
      subscribed_items: [],
    };
  },
  actions: {
    async searchPhone(payload = {}) {
      const response = await useApi("scam/getPhoneInfo", {
        method: "get",
        params: payload,
      });
      return response;
    },

    async getHistory(payload = {}) {
      const { data } = await useApi("scam/getHistory", {
        method: "get",
        params: payload,
      });
      if (data && data.hasOwnProperty("data")) {
        this.history_items = data.data;
        return this.history_items;
      }
      return data;
    },

    async getSubscribedPhones(payload = {}) {
      const { data } = await useApi("scam/getFavorite", {
        method: "get",
        params: payload,
      });
      if (data && data.hasOwnProperty("data")) {
        this.subscribed_items = data.data;
        return this.subscribed_items;
      }
      return data;
    },

    async addFavorite(payload = {}) {
      const response = await useApi("scam/addFavorite", {
        method: "post",
        payload,
      });
      this.getHistory();
      this.getSubscribedPhones();
      return response;
    },

    async saveComment(payload = {}) {
      const response = await useApi("scam/saveComment", {
        method: "post",
        payload,
      });
      return response;
    },

    async removeFavorite(payload = {}) {
      const response = await useApi("scam/addFavorite", {
        method: "delete",
        params: payload,
      });
      this.getHistory();
      this.getSubscribedPhones();
      return response;
    },

    async getScamOptions(payload = {}) {
      const { data } = await useApi("scam/getOptions", {
        method: "get",
        params: payload,
      });
      if (data) {
        this.frequency_options = data.frequency;
        this.rate_options = data.rate;
        this.categories = data.categories;
        return data.data;
      }
      return data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScamStore, import.meta.hot));
}
