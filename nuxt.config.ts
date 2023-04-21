// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: process.env.BACKEND_HOST_API || "https://api.jobeek.online/api/",
      base: process.env.BACKEND_HOST || "https://api.jobeek.online/",
    }
  },
  ssr: false,
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    '~/assets/styles/nice-select.css',
    '~/assets/styles/main.css',
    '~/assets/styles/app.scss',
  ],
  components: [
    '~/components',
    '~/components/UI'
  ],
  modules: [
      '@pinia/nuxt',
  ],
  app: {
    pageTransition: { name: 'layout', mode: 'out-in' }
  },
  // imports: {
  //   dirs: ['stores'],
  // },
})
