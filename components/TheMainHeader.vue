<template>
  <header class="main-header">
    <div class="header-wrapper header-wrapper--fxstart">
      <div class="logo"> <img src="~/assets/img/jobeek-dark.svg" alt="#"></div>
      <div class="theme-checker-box checker-box">
        <span class="v v1 active" title="Соискатель">Соискатель</span>
        <div class="theme-checker">
          <input type="checkbox" id="employer">
          <div class="theme-checker-ui">
            <div class="circle"> </div>
          </div>
        </div>
        <span class="v v2" title="Работодатель">Работодатель</span>
      </div>
      <div class="header-actions"> <a class="btn button-xs sign-in-btn" href="/sign-in.html"
                                      role="link">Войти</a><a class="btn button-xl sign-up-btn" href="/sign-up.html"
                                                              role="link">Зарегистрироваться </a></div>
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