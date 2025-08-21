// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi.js";

export const useUIStore = defineStore("ui", {
  state: () => {
    return {
      footer: null,
      isSidebarOpen: true,
      isMobileMode: false,
      footer_settings: {},
    };
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
  actions: {
    async toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async turnOnMobileMode() {
      if (this.isSidebarOpen) {
        this.isSidebarOpen = false;
      }
      this.isMobileMode = true;
    },
    async turnOffMobileMode() {
      this.isMobileMode = false;

      if (!this.isSidebarOpen) {
        this.isSidebarOpen = true;
      }
    },
    async getFooterSettings() {
      if (this.footer) {
        return this.footer;
      }

      const url = useRequestURL();
      const hostname = url.hostname;
      const response = await useApi("getSettings", {
        method: "get",
        params: {
          setting_key: "footer",
          host: hostname,
        },
      });

      if (response.status === "success") {
        this.footer = response.data.data;
      }

      return this.footer;
    },
  },
  share: {
    // An array of fields that the plugin will ignore.
    omit: ["footer", "footer_settings"],
    // Override global config for this store.
    enable: true,
    initialize: true,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
