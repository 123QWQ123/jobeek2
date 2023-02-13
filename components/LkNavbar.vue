<template>
  <div class="lk-header-nav">
    <div class="header-wrapper">
      <button class="hamburger" type="button">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
      </button>
      <nav class="main-navigation">
        <button class="close-menu-button">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.38919 0.000268166L0 1.36792L21.5661 22.5996L22.9553 21.232L1.38919 0.000268166Z" fill="#2C373E"/>
            <path d="M23.0005 1.76829L21.6113 0.400635L0.0452116 21.6323L1.4344 23L23.0005 1.76829Z" fill="#2C373E"/>
          </svg>
        </button>
        <ul>
          <li>
            <NuxtLink to="/"> <span>Главная</span></NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'your-responses'}"><span>Отклики<div class="count">12</div></span></NuxtLink>
          </li>
          <li v-if="!isEmployer">
            <NuxtLink :to="{name: 'your-resumes'}"> <span>Резюме</span></NuxtLink>
          </li>
          <li v-if="isEmployer">
            <NuxtLink :to="{name: 'your-vacancies'}"> <span>Вакансии</span></NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'your-favorites'}"> <span>Избранные</span></NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'your-subscriptions'}"> <span>Подписки</span></NuxtLink>
          </li>
          <li v-if="false">
            <NuxtLink :to="{name: 'your-messages'}"> <span>Сообщения</span></NuxtLink>
          </li>
          <li >
            <NuxtLink :to="{name: 'advice'}"> <span>Советы</span></NuxtLink>
          </li>
          <li v-if="!isEmployer">
            <NuxtLink :to="{name: 'courses'}"> <span>Курсы</span></NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="theme-checker-box checker-box" @click="toggleUserMode">
        <span class="v v1 " :class="{'active' : !isEmployer}" title="Соискатель">Соискатель</span>
        <div class="theme-checker" >
          <input type="checkbox" id="employer" :checked="isEmployer" >
          <div class="theme-checker-ui">
            <div class="circle"> </div>
          </div>
        </div>
        <span class="v v2" :class="{'active' : isEmployer}" title="Работодатель">Работодатель</span>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { logout, toggleUserMode } = auth;

const isAuthed = computed(() => auth.isAuthed);
const isEmployer = computed(() => auth.isEmployer);
const user = computed(() => auth.user);

</script>

<script>
export default {
  name: "LkNavbar.vue"
}

</script>

<style scoped>
.router-link-exact-active:after {
  background: #5375FD;
}
</style>