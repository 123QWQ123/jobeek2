<template>
  <my-header></my-header>
  <router-view></router-view>
  <my-footer></my-footer>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import header from "../src/views/parts/Header";
import footer from "../src/views/parts/Footer";

export default {
  name: "App",
  components: {
    myHeader: header,
    myFooter: footer,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      isLoggedIn: computed(() => store.getters.isAuthenticated),

      logout: () => {
        store.dispatch("logout");
        router.push("/login");
      },
    };
  },
};
</script>
