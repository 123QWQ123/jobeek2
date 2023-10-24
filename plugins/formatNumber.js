import IMask from "imask";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            format_number: function (value) {
                return new Intl.NumberFormat().format(value)
            },
            format_phone: function (value = null) {
                const phone_mask = new IMask.createMask({
                    mask: '+7 (000) 000-00-00'
                });
                if (value){
                    return phone_mask.resolve(value.toString())
                }else{
                    return phone_mask.resolve("77777777777".toString())
                }
            },
        }
    }
})