// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";

export const useUIStore = defineStore('ui', {
  state: () => {
    return {
      isSidebarOpen: true,
      isMobileMode: false,
    }
  },
  actions: {
    async toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async turnOnMobileMode() {
      console.log(1);
      if (this.isSidebarOpen){
        this.isSidebarOpen = false;
      }
      this.isMobileMode = true;
    },
    async turnOffMobileMode() {
      this.isMobileMode = false;

      if (!this.isSidebarOpen){
        this.isSidebarOpen = true;
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}