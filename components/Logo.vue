<script setup>
import { useAuthStore } from "~/store/auth.js";

const auth = useAuthStore();
</script>

<template>
  <NuxtLink to="/">
    <img
      v-if="auth.isAuthenticated"
      src="~/assets/img/jobeek-dark.svg"
      alt="#"
    />
    <img v-else src="~/assets/img/jobeek-white.svg" alt="#" />
  </NuxtLink>
</template>

<style scoped></style>
