export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            format_number: function (value) {
                return new Intl.NumberFormat().format(value)
            }
        }
    }
})