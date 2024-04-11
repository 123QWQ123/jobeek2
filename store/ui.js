// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi.js";

export const useUIStore = defineStore("ui", {
  state: () => {
    return {
      isSidebarOpen: true,
      isMobileMode: false,
      footer_settings: {},
    };
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
      const response = await useApi("getSettings", {
        method: "get",
        params: {
          setting_key: "footer",
        },
      });
      if (response.status === "success") {
        this.footer_settings = response.data.data;
        return this.footer_settings;
      }
      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
