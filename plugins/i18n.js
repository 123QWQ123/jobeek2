import { createI18n } from "vue-i18n";
import en from "../locales/en.js";
import ru from "../locales/ru.js";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "ru",
    messages: {
      en,
      ru,
    },
  });

  vueApp.use(i18n);
});
