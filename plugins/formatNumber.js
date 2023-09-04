import IMask from "imask";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            format_number: function (value) {
                return new Intl.NumberFormat().format(value)
            },
            format_phone: function (value) {
                const phone_mask = new IMask.createMask({
                    mask: '+7 (000) 000-00-00'
                });
                return phone_mask.resolve(value.toString())
            },
        }
    }
})