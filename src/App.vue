<template>
  <!-- <the-header></the-header> -->
  <router-view />
</template>

<script>
// import TheHeader from "./components/layout/TheHeader.vue";
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: {
    // TheHeader
  },
  setup () {
    const router = useRouter();
    const store = useStore();

    return {
      isLoggedIn: computed(() => store.getters.isAuthenticated),

      logout: () => {
        store.dispatch('logout');
        router.push('/login');
      },
    }
  }
}
</script>
