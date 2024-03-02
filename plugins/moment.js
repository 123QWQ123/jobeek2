import moment from "moment";
import "moment/dist/locale/ru";

export default defineNuxtPlugin(() => {
  moment.locale("ru");
  return {
    provide: {
      moment,
    },
  };
});
