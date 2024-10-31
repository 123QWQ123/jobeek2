<script setup>
import { useAuthStore } from "~/store/auth.js";

const auth = useAuthStore();
</script>

<template>
  <NuxtLink to="/">
    <img
      v-if="auth.isAuthed"
      src="~/assets/img/jobeek-white.svg" 
      class="header-logo"
      alt="Jobeek"
    />
    <img v-else src="~/assets/img/jobeek-white.svg" class="header-logo" alt="Jobeek" />
  </NuxtLink>
</template>

<style scoped>
.header-logo {
  min-width: 115px;
}	
@media (max-width: 1024px) {
  .header-logo {
    min-width: auto;
  }	
}
</style>
