<template>
  <header class="main-header">
    <div class="header-wrapper">
      <NuxtLink to="/" class="logo"> <img src="~/assets/img/jobeek-dark.svg" alt="#"></NuxtLink>
      <div class="header-actions">
        <NuxtLink class="btn button-xs sign-in-btn" :to="{name: 'sign-in'}" role="link">Войти</NuxtLink>
        <NuxtLink class="btn button-xl sign-up-btn" :to="{name: 'sign-up'}" role="link">Зарегистрироваться </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { tryLogin, logout } = auth;

onBeforeMount(() => {
  tryLogin();
});

const isAuthed = computed(() => auth.isAuthed);
</script>

<style scoped>
.nav-link {
  color: #fff !important;
}
.router-link-exact-active {
  color: #6c757d !important;
}
</style>