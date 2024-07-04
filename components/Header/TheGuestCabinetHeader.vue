<script setup>
import { search_exception_routes } from "~/config";

const route = useRoute();
const isCabinetNavbarShown = computed(() => {
  return search_exception_routes.includes(route.name);
});

</script>
<template>
  <div class="lk-header">
    <div class="lk-header-main">
      <div class="header-wrapper">
        <Logo />
        <CabinetHeaderSearchForm v-if="!isCabinetNavbarShown" class="mr-2" />
        <div class="header-actions ms-auto">
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
    </div>
    <HeaderCabinetNavbar></HeaderCabinetNavbar>
  </div>
</template>

<style scoped>
.nav-link {
  color: #fff !important;
}

.router-link-exact-active {
  color: #6c757d !important;
}

.search-form--widget .search-row {
  grid-template-columns: 34.17% 22.56% 1fr 20%;
}
</style>
