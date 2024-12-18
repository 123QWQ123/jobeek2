import IMask from "imask";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      format_number: function (value) {
        return new Intl.NumberFormat("ru-RU").format(parseInt(value));
      },
      format_years: (years) => {
        if (years === 1) {
          return years + " год";
        } else if (years >= 2 && years <= 4) {
          return years + " года";
        } else {
          return years + " лет";
        }
      },
      format_months: (months) => {
        if (months === 1) {
          return months + " месяц";
        } else if (months >= 2 && months <= 4) {
          return months + " месяца";
        } else {
          return months + " месяцев";
        }
      },
      convert_month_to_text: (month_number) => {
        var months = [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ];

        const monthIndex = parseInt(month_number, 10) - 1;
        return months[monthIndex];
      },
      format_phone: function (value = null) {
        const phone_mask = new IMask.createMask({
          mask: "+7 (000) 000-00-00",
        });
        if (value) {
          phone_mask.resolve(value.toString());
          return phone_mask.value;
        } else {
          return phone_mask.resolve("77777777777".toString());
        }
      },
    },
  };
});
