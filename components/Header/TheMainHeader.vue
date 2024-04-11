<template>
  <header class="main-header">
    <div class="header-wrapper header-wrapper--fxstart">
      <div class="logo">
        <NuxtLink to="/">
          <img src="~/assets/img/jobeek-dark.svg" alt="#" />
        </NuxtLink>
      </div>
      <ModeSwitcher class="me-3 ms-auto"></ModeSwitcher>
      <div class="header-actions">
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
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { logout } = auth;

const isAuthed = computed(() => auth.isAuthed);
const isEmployer = computed(() => auth.isEmployer);
const user = computed(() => auth.user);
</script>

<style scoped>
.nav-link {
  color: #fff !important;
}

.router-link-exact-active {
  color: #6c757d !important;
}

.header-wrapper--fxstart .header-actions {
  margin-left: unset;
}

@media (max-width: 1025px) {
  .header-wrapper--fxstart .header-actions {
    margin-left: auto;
  }

  .header-wrapper--fxstart .header-actions .btn {
    margin-right: 0.5rem;
  }
}
</style>
