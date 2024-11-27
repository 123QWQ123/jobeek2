// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
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
      const { data } = await useApi("area/regions", {
        method: "get",
        payload,
      });
      if (data) {
        this.regions = data.data.regions;
      }
      return data;
    },
    async getLocation() {
      const { data } = await useApi("area/location", { method: "get" });
      if (data) {
        this.location = data;
      }
      return this.location;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAreaStore, import.meta.hot));
}
