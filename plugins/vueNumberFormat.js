import VueNumberFormat from "vue-number-format";

export default defineNuxtPlugin((nuxtApp) => {
  const formatNumber = (number, options = {}) => {
    const mergedOptions = {
      prefix: "",
      decimal: "",
      thousand: " ",
      precision: 0,
      ...options,
    };

    if (typeof Intl !== "undefined" && Intl.NumberFormat) {
      return new Intl.NumberFormat("ru-RU", mergedOptions).format(number);
    } else if (process.client) {
      return VueNumberFormat(number.toString(), mergedOptions);
    } else {
      return number.toLocaleString("ru-RU", mergedOptions);
    }
  };

  nuxtApp.provide("formatNumber", formatNumber);

  if (process.client) {
    nuxtApp.vueApp.use(VueNumberFormat);
  }
});
