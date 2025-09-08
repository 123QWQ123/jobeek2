<template>
  <div class="lk-header-nav">
    <div class="header-wrapper">
      <button
        class="hamburger"
        @click.prevent="isMobileNavigationActive = !isMobileNavigationActive"
        type="button"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>

      <nav
        class="main-navigation"
        :class="{ active: isMobileNavigationActive }"
      >
        <button
          class="close-menu-button"
          @click="isMobileNavigationActive = false"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.38919 0.000268166L0 1.36792L21.5661 22.5996L22.9553 21.232L1.38919 0.000268166Z"
              fill="#2C373E"
            />
            <path
              d="M23.0005 1.76829L21.6113 0.400635L0.0452116 21.6323L1.4344 23L23.0005 1.76829Z"
              fill="#2C373E"
            />
          </svg>
        </button>
        <ul @click="isMobileNavigationActive = false">
          <li>
            <NuxtLink v-if="!isAuthed" to="/"><span>Главная</span></NuxtLink>
          </li>
          <!--          <li v-if="isEmployer">-->
          <!--            <NuxtLink :to="{ name: 'your-responses' }"-->
          <!--              ><span>Отклики<span class="count">12</span></span></NuxtLink-->
          <!--            >-->
          <!--          </li>-->
          <!--          <li v-else>-->
          <!--            <NuxtLink :to="{ name: 'profile-negotiations' }">-->
          <!--              <span>Отклики и приглашения<span class="count">12</span></span>-->
          <!--            </NuxtLink>-->
          <!--          </li>-->
          <li v-if="!isEmployer">
            <NuxtLink :to="{ name: 'my-resumes' }">
              <span>Мои резюме</span></NuxtLink
            >
          </li>
          <li v-if="isEmployer">
            <NuxtLink :to="{ name: 'my-vacancies' }">
              <span>Мои вакансии</span>
            </NuxtLink>
          </li>
          <li v-if="!isEmployer">
            <NuxtLink
              :to="{ name: 'favorite-vacancies' }"
              :class="{
                'router-link-active': $route.path.startsWith('/vacancies'),
              }"
            >
              <span>Избранные</span>
            </NuxtLink>
          </li>
          <li v-else>
            <NuxtLink
              :to="{ name: 'favorite-resumes' }"
              :class="{
                'router-link-active': $route.path.startsWith('/resumes'),
              }"
            >
              <span>Избранные</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'subscriptions' }"
              :class="{
                'router-link-active': $route.path.startsWith('/subscriptions'),
              }"
            >
              <span>Подписки</span></NuxtLink
            >
          </li>
          <li>
            <NuxtLink :to="{ name: 'services-search-phone' }">
              <span>Кто звонит?</span></NuxtLink
            >
          </li>
          <li v-if="false">
            <NuxtLink :to="{ name: 'your-messages' }">
              <span>Сообщения</span></NuxtLink
            >
          </li>
          <!--          <li >-->
          <!--            <NuxtLink :to="{name: 'advice'}"> <span>Советы</span></NuxtLink>-->
          <!--          </li>-->
          <!--          <li v-if="!isEmployer">-->
          <!--            <NuxtLink :to="{name: 'courses'}"> <span>Курсы</span></NuxtLink>-->
          <!--          </li>-->
        </ul>
      </nav>

      <ModeSwitcher></ModeSwitcher>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

const auth = useAuthStore();
const { isAuthed, isEmployer, user } = storeToRefs(auth);

const isMobileNavigationActive = ref(false);

const toggleMobileNavigation = () => {
  isMobileNavigationActive.value = !isMobileNavigationActive.value;
};
</script>

<style scoped>
.router-link-active:after {
  background: #5375fd;
}
</style>
