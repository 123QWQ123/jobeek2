import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "@/apis/api";

import "./styles/styles.scss";

window.api = new api();

createApp(App).use(store).use(router).mount("#app");
