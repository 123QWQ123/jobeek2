import useApi from "~/hooks/useApi.js";

export const useCashBoxStore = defineStore("cashbox", {
  state: () => {
    return {
      receipts: [],
    };
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
  actions: {
    async getReceipts(phone, host = null) {
      if (this.receipts.length > 0) {
        return this.receipts;
      }

      if (!host) {
        const { hostname } = useRequestURL();
        host = hostname;
      }
      console.log("useApi params: ", {
        phone: phone.replace(/[^0-9]/g, ""),
        host: host,
      });
      const response = await useApi("cashbox/getReceipts", {
        method: "get",
        params: {
          phone: phone.replace(/[^0-9]/g, ""),
          host: host,
        },
      });

      if (response.status === "success") {
        this.receipts = response.data.data;
      }

      return this.receipts;
    },
    async setEmail(phone, email, host = null) {
      if (!host) {
        const { hostname } = useRequestURL();
        host = hostname;
      }

      const response = await useApi("cashbox/addEmail", {
        method: "get",
        params: {
          phone: phone,
          email: email,
          host: hostname,
        },
      });

      if (response.status === "success") {
        this.receipts = response.data.data;
      }

      return this.receipts;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCashBoxStore, import.meta.hot));
}
