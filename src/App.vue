<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <template v-if="isLoggedIn">
      <router-link to="/user">User</router-link> |
      <a @click.prevent="logout()">Logout</a>
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link>
    </template>
  </div>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
