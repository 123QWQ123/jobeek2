// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi";
import { parse, stringify } from "zipson/lib";

export const useAreaStore = defineStore("area", {
  state: () => {
    return {
      countries: [],
      regions: [],
      cities: [],
      location: {},
    };
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    serializer: {
      deserialize: (serializer) => parse(decodeURIComponent(serializer)),
      serialize: (state) => encodeURIComponent(stringify(state)),
    },
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
  share: {
    // An array of fields that the plugin will ignore.
    omit: [],
    // Override global config for this store.
    enable: false,
    initialize: false,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAreaStore, import.meta.hot));
}
