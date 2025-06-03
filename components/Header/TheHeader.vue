<template>
  <header class="main-header">
    <div class="header-wrapper">
      <NuxtLink to="/" class="logo">
        <img src="~/assets/img/jobeek-white.svg" alt="#"
      /></NuxtLink>
      <div class="header-actions" v-if="!isAuthed">
        <NuxtLink
          class="btn button-xs sign-in-btn"
          :to="{ name: 'sign-in' }"
          role="link"
          >Войти
        </NuxtLink>
        <NuxtLink
          class="btn button-xl sign-up-btn"
          :to="{ name: 'sign-up' }"
          role="link"
          >Регистрация
        </NuxtLink>
      </div>
      <div class="header-actions" v-else>
        <a
          class="btn button-xs sign-in-btn"
          role="link"
          @click="onProfileClick"
        >
          {{ phone }}
        </a>
        <button class="exit-button" type="button" @click="logout">
          <img src="~/assets/img/logout.svg" alt="#"/>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { tryLogin, logout } = auth;

onMounted(() => {
  tryLogin();
});

const isAuthed = computed(() => auth.isAuthed);
const phone = computed(() => auth.user?.phone);
const onProfileClick = () => {
  if (!auth.isEmployer) {
    navigateTo({ name: "profile-seeker" });
  } else {
    navigateTo({ name: "profile-employer" });
  }
};
</script>

<style scoped>
.nav-link {
  color: #fff !important;
}

.router-link-exact-active {
  color: #6c757d !important;
}
</style>
