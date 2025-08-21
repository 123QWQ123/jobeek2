// no need to import defineStore and acceptHMRUpdate

import { parse, stringify } from "zipson/lib";

export const useRoute = defineStore("route", {
  state: () => {
    return {
      page: "index",
      params: {},
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
    numberFormat(value) {
      const { $formatNumber } = useNuxtApp();
      return $formatNumber(value, {});
    },

    async getPageQuery() {
      return this.params;
    },
    async getPage() {
      return this.page;
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
  import.meta.hot.accept(acceptHMRUpdate(useRoute, import.meta.hot));
}
