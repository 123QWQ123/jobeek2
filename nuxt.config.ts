// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/assets/bootstrap5/app.scss'
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
