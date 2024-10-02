// no need to import defineStore and acceptHMRUpdate
import vueNumberFormat from "~/plugins/vueNumberFormat.js";

export const useRoute = defineStore("route", {
  state: () => {
    return {
      page: "index",
      params: {},
    };
  },
  actions: {
    numberFormat(value) {
      return vueNumberFormat(value, {});
    },

    async getPageQuery() {
      return this.params;
    },
    async getPage() {
      return this.page;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoute, import.meta.hot));
}
