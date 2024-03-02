// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";
import fs from "fs";

const config = {
  server: {},
  devtools: { enabled: false, vscode: {} },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: "https://api.jobeek.online/api/",
      base: "https://api.jobeek.online",
      sentry: {
        dsn: "https://cd6d558f98e968695f6d8fa0a88c115f@o4506751504482304.ingest.sentry.io/4506757163057152",
        environment: "development",
      },

      backend: {
        host: "https://jobeek.me",
      },
    },
  },
  ssr: true,
  pages: true,
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/styles/nice-select.css",
    "~/assets/styles/hamburger.min.css",
    "~/assets/styles/main.css",
    "~/assets/styles/app.scss",
    "~/assets/styles/main.css",
    "~/assets/styles/styles-new.css",
  ],
  components: ["~/components", "~/components/UI"],

  app: {
    // pageTransition: { name: 'layout', mode: 'out-in' }
    head: {
      link: [
        {
          // rel: 'stylesheet', href: 'https://sem-dev.co.ua/jobeek.css'
        },
      ],
      script: [
        {
          src: "https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js",
        },
        {
          src: "https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js",
        },
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/devtools",
    "nuxt-swiper",
    "@bg-dev/nuxt-fcm",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
  ],

  routeRules: {
    // Static page generated on-demand, revalidates in background
    // Render these routes with SPA
    "/**": { swr: 5 }, // 👈🏻 TTL in seconds
    "/sign-in": { ssr: false },
    "/sign-up": { ssr: false },
    // '/profile': { ssr: true },
    // '/my-resumes': { ssr: false },
    // '/my-vacancies': { ssr: false },
    "/create-vacancy": { ssr: false },
    "/create-resume": { ssr: false },
    "/my-resume/*": { ssr: false },
    // Add cors headers
    "/api/**": { cors: true },
    // Add redirect headers
    // '/old-page': { redirect: '/new-page' },
    // '/old-page2': { redirect: { to: '/new-page', statusCode: 302 } }
  },
  fcm: {
    firebaseConfig: {
      apiKey: "AIzaSyDaqZCxvD1wNu8bKxFB1fjUeaZo4k2Gyyg",
      authDomain: "espays.firebaseapp.com",
      databaseURL: "https://espays.firebaseio.com",
      projectId: "espays",
      storageBucket: "espays.appspot.com",
      messagingSenderId: "889800109407",
      appId: "1:889800109407:web:e6a37cf3f262f5ae4d1aea",
      measurementId: "G-ZS2ZHFHJ56",
    },
    vapidKey:
      "BNhzs3ta5UD12WZIz6pP4ONTohrOsoMP3lyomaLsw2fRjsg4u0OzGKoOAFW7i0DK4GscckYJ5v0D99YJlFNhv3I",
  },
};
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  config.server = {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "server.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "server.pem")),
    },
  };
}
export default defineNuxtConfig(config);
