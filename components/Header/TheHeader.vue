<template>
  <header class="main-header">
    <div class="header-wrapper">
      <NuxtLink to="/" class="logo"> <img src="~/assets/img/jobeek-dark.svg" alt="#"></NuxtLink>
      <div class="header-actions" v-if="!isAuthed">
        <NuxtLink class="btn button-xs sign-in-btn" :to="{name: 'sign-in'}" role="link">Войти</NuxtLink>
        <NuxtLink class="btn button-xl sign-up-btn" :to="{name: 'sign-up'}" role="link">Зарегистрироваться </NuxtLink>
      </div>
      <div class="header-actions" v-else>
        <NuxtLink class="btn button-xs sign-in-btn" :to="{name: 'profile'}" role="link">{{ phone }}</NuxtLink>
        <button class="exit-button" type="button" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { tryLogin, logout, } = auth;

onBeforeMount(() => {
  tryLogin();
});

const isAuthed = computed(() => auth.isAuthed);
const phone = computed(() => auth.user.phone);
</script>

<style scoped>
.nav-link {
  color: #fff !important;
}
.router-link-exact-active {
  color: #6c757d !important;
}
</style>