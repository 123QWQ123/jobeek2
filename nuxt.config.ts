// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import fs from 'fs';
const config = {
  server: {},
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
        // Keys within public, will be also exposed to the client-side
      public: {
        apiBase: "https://api.jobeek.online/api/",
        base: "https://api.jobeek.online/",
      }
  },

  ssr: true,
  pages: true,
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    '~/assets/styles/nice-select.css',
    '~/assets/styles/hamburger.min.css',
    '~/assets/styles/main.css',
    '~/assets/styles/app.scss',
  ],
  components: [
    '~/components',
    '~/components/UI'
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/devtools',
  ],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  devtools: {
    // Enable devtools (default: true)
    enabled: true,
    // VS Code Server options
    vscode: {},
    // ...other options
  },
  app: {
    // pageTransition: { name: 'layout', mode: 'out-in' }
  },
  routeRules: {
    // Static page generated on-demand, revalidates in background
    // Render these routes with SPA
    '/**': { swr: 5  }, // 👈🏻 TTL in seconds
    '/sign-in': { ssr: false },
    '/sign-up': { ssr: false },
    // '/profile': { ssr: true },
    // '/my-resumes': { ssr: false },
    // '/my-vacancies': { ssr: false },
    '/create-vacancy': { ssr: false },
    '/create-resume': { ssr: false },
    // Add cors headers
    '/api/**': { cors: true },
    // Add redirect headers
    // '/old-page': { redirect: '/new-page' },
    // '/old-page2': { redirect: { to: '/new-page', statusCode: 302 } }
  }
}


console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  config.server = {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'key.pem'))
    }
  }
}
export default defineNuxtConfig(config);
