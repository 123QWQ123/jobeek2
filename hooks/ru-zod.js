import i18next from "i18next";
import { z as zod } from "zod";
import { zodI18nMap } from "zod-i18n-map";
// Import your language translation files
import translation from "zod-i18n-map/locales/ru/zod.json";

// lng and resources key depend on your locale.
i18next.init({
  lng: "ru",
  resources: {
    ru: { zod: translation },
  },
});
zod.setErrorMap(zodI18nMap);

// export configured zod instance
export { zod };
