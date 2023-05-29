// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import path from 'path';
import fs from 'fs';
const config = {
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
        // Keys within public, will be also exposed to the client-side
        public: {
      apiBase: process.env.BACKEND_HOST_API || "https://api.jobeek.online/api/",
          base: process.env.BACKEND_HOST || "https://api.jobeek.online/",
    }
  },
  ssr: true,
  pages: true,
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
      '@nuxt/devtools',
  ],
  devtools: {
    // Enable devtools (default: true)
    enabled: true,
    // VS Code Server options
    vscode: {},
    // ...other options
  },
  app: {
    pageTransition: { name: 'layout', mode: 'out-in' }
  },
  routeRules: {
    // Static page generated on-demand, revalidates in background
    // Render these routes with SPA
    '/sign-in': { ssr: false },
    '/sign-up': { ssr: false },
    '/profile': { ssr: false },
    '/my-resumes': { ssr: false },
    '/my-vacancies': { ssr: false },
    '/create-vacancy': { ssr: false },
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
