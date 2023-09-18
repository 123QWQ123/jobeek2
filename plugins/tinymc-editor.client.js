import Editor from '@tinymce/tinymce-vue'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('TinyMC-Editor', Editor);
});