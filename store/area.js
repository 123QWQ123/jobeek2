// no need to import defineStore and acceptHMRUpdate
import {acceptHMRUpdate, defineStore} from "pinia";
import useApi from "~/hooks/useApi";

export const useAreaStore = defineStore("area", {
  state: () => {
    return {
      countries: [],
      regions: [],
      cities: [],
      location: {},
    };
  },
  actions: {
    async getRegions(payload) {
      if (this.regions) {
        return this.regions
      }

      const { data } = await useApi("area/regions", {
        method: "get",
        payload,
      });
      if (data) {
        this.regions = data.data.regions;
      }
      return data;
    },
    async getLocation(payload) {
      if (this.location) {
        return this.location
      }

      const { data } = await useApi("area/location", {
        method: "get",
        params: payload,
      });
      if (data) {
        this.location = data.data;
      }
      return data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAreaStore, import.meta.hot));
}
