// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: process.env.BACKEND_HOST_API || "http://jobeek.api/api/",
      base: process.env.BACKEND_HOST || "http://jobeek.api/",
    }
  },
  ssr: false,
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    '~/assets/styles/nice-select.css',
    '~/assets/styles/app.scss',
  ],

  modules: [
    'nuxt3-vuex',
    [
      '@pinia/nuxt',
      {
        disableVuex: true
      },
    ],
    // [
    //   '@nuxtjs/firebase',
    //   {
    //     config: {
    //       apiKey: '<apiKey>',
    //       authDomain: '<authDomain>',
    //       projectId: '<projectId>',
    //       storageBucket: '<storageBucket>',
    //       messagingSenderId: '<messagingSenderId>',
    //       appId: '<appId>',
    //       measurementId: '<measurementId>'
    //     },
    //     services: {
    //       auth: true // Just as example. Can be any other service.
    //     }
    //   }
    // ]
  ],
  app: {
    pageTransition: { name: 'layout', mode: 'out-in' }
  },

  // imports: {
  //   dirs: ['stores'],
  // },
})
