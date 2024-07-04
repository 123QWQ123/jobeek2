import { localize, setLocale } from "@vee-validate/i18n";
import { configure, defineRule } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
// import * as i18n from "@vee-validate/i18n";
import moment from "moment";

// function generateI18nMessage({ rule, label, name }) {
//   const fieldName = label || i18n.global.t(`fieldLabels.${name}`);
//
//   if (!Array.isArray(rule.params)) {
//     return i18n.global.t(`validationMessages.${rule.name}`, [fieldName]);
//   }
//
//   return i18n.global.t(`validationMessages.${rule.name}`, [
//     fieldName,
//     ...rule.params,
//   ]);
// }

const messages = localize({
  en: {
    messages: {
      required: "This field is required",
    },
  },
  ru: {
    messages: {
      required: "Обязательно для заполнения",
      numeric: "Разрешены только цифры",
    },
  },
});
export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
  });
  defineRule("date", (value, [limit]) => {
    if (moment(value, "YYYY-MM-DD", true).isValid()) {
      return true;
    }
    return "Неправильный формат даты";
  });
  defineRule("custom_email", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }

    // Check if email
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
      return "This field must be a valid email";
    }

    return true;
  });
  defineRule("boolean", (value) => {
    if (value === true || value === false) {
      return true;
    }
    return "Неправильный значение";
  });
  configure({
    // generateMessage: localize({
    //   ru,
    //   en,
    // }),
    generateMessage: messages,
  });

  // setLocale({
  //   // use constant translation keys for messages without values
  //   mixed: {
  //     default: "field_invalid",
  //   },
  //   // use functions to generate an error object that includes the value from the schema
  //   number: {
  //     min: ({ min }) => ({ key: "field_too_short", values: { min } }),
  //     max: ({ max }) => ({ key: "field_too_big", values: { max } }),
  //   },
  // });

  setLocale("ru");
});
