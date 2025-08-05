// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { readFileSync } from "fs";
import { resolve } from "path";

// Convert to ESM syntax
const devtoolsEnabled = Boolean(process.env.DEVTOOLS_ENABLED);
const devtoolsTimelineEnabled = Boolean(process.env.DEVTOOLS_TIMELINE_ENABLED);
const isDevelopment = process.env.NODE_ENV === "development";

export default defineNuxtConfig({
  server: isDevelopment
    ? {
        https: {
          key: readFileSync(resolve("server.pem")),
          cert: readFileSync(resolve("server.pem")),
        },
      }
    : {},
  devtools: {
    enabled: devtoolsEnabled,
    vscode: {},
    timeline: { enabled: devtoolsTimelineEnabled },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      base: process.env.NUXT_PUBLIC_BASE,
      sentry: {
        dsn: "https://cd6d558f98e968695f6d8fa0a88c115f@o4506751504482304.ingest.sentry.io/4506757163057152",
        environment: "development",
      },
    },
  },
  ssr: true,
  pages: true,
  sourcemap: true,
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/styles/nice-select.css",
    "~/assets/styles/hamburger.min.css",
    "~/assets/styles/main.css",
    "~/assets/styles/app.scss",
    "~/assets/styles/styles-new.css",
    "~/assets/styles/lk-vacancy.css",
    "~/assets/styles/resume.css",
    "~/assets/styles/resume-new.css",
    "~/assets/styles/custom.css",
  ],
  components: ["~/components", "~/components/UI"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [
        {
          // rel: 'stylesheet', href: 'https://sem-dev.co.ua/jobeek.css'
        },
      ],
      script: [
        // {
        //   src: "https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js",
        // },
        // {
        //   src: "https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js",
        // },
      ],
    },
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
        storesDirs: ["./stores/**"],
      },
    ],
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt/devtools",
    "@bg-dev/nuxt-fcm",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "nuxt-tiptap-editor",
  ],
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  routeRules: {
    // "/": { prerender: true },
    // Static page generated on-demand, revalidates in background
    "/api/**": { cors: true },
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
  router: {
    middleware: ["auth"],
  },
  vite: {
    optimizeDeps: {
      exclude: ["firebase/analytics"],
    },
  },
  experimental: {
    componentIslands: true,
    payloadExtraction: true,
  },
  // i18n: {
  //   lazy: true,
  //   langDir: "locales",
  //   strategy: "no_prefix",
  //   locales: [
  //     {
  //       code: "en",
  //       iso: "en",
  //       name: "English",
  //       file: "en.json",
  //     },
  //     {
  //       code: "nl-Nl",
  //       iso: "nl-NL",
  //       name: "Dutch",
  //       file: "nl-NL.json",
  //     },
  //   ],
  // },
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
  // nitro: {
  //   prerender: {
  //     routes: ["/search/vacancies", "/"],
  //   },
  // },
});
