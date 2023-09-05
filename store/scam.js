// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import useApi from "~/hooks/useApi";

export const useScamStore = defineStore('scam', {
  state: () => {
    return {
      frequency_options: [],
      rate_options: [],
    }
  },
  actions: {

    async searchPhone(payload = {}) {
      console.log(payload);
      const {data} = await useApi('scam/getPhoneInfo', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.searched_phones = data.data;
        return data.data;
      }
      return data;
    },

    async getScamOptions(payload = {}) {
      const {data} = await useApi('scam/getOptions', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.frequency_options = data.data.frequency;
        this.rate_options = data.data.rate;
        return data.data;
      }
      return data;
    },


  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScamStore, import.meta.hot));
}