<template>
  <router-view />
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
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
