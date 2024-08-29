import VueTelInput from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";

const VueTelInputOptions = {
  defaultCountry: "RU",
  autoDefaultCountry: false,
  autoFormat: true,
  mode: "international",
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTelInput, VueTelInputOptions);
});
