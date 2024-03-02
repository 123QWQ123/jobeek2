import VueNumberFormat from "vue-number-format";

export default defineNuxtPlugin((nuxtApp) => {
  if (!process.server) {
    nuxtApp.vueApp.use(VueNumberFormat, {
      prefix: "",
      decimal: "",
      thousand: " ",
      precision: 0,
    });
  }
});
