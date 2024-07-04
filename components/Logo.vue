<script setup>
import { useAuthStore } from "~/store/auth.js";

const auth = useAuthStore();
</script>

<template>
  <NuxtLink to="/">
    <img
      v-if="auth.isAuthed"
      src="~/assets/img/jobeek-white.svg"
      alt="Jobeek"
    />
    <img v-else src="~/assets/img/jobeek-white.svg" alt="Jobeek" />
  </NuxtLink>
</template>

<style scoped></style>
