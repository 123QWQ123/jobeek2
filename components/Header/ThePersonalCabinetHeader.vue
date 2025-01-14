<script setup>
import { useAuthStore } from "~~/store/auth";
import { search_exception_routes } from "~/config";

const auth = useAuthStore();
const { logout, isEmployer } = auth;

const route = useRoute();

const isCabinetNavbarShown = computed(() =>
  search_exception_routes.includes(route.name),
);

const onProfileClick = () => {
  navigateTo({ name: isEmployer ? "profile-employer" : "profile-seeker" });
};

const phone = computed(() => auth.user?.phone);
const isPremium = computed(() => auth.isSubscribed);
</script>

<template>
  <div class="lk-header">
    <div class="lk-header-main">
      <div class="header-wrapper">
        <Logo />
        <CabinetHeaderSearchForm v-if="!isCabinetNavbarShown" class="mr-2" />
        <div class="profile-action">
          <a
            class="btn button-xs sign-in-btn ms-4"
            @click="onProfileClick"
            role="link"
          >
            {{ phone }}
          </a>
          <button v-if="isPremium" class="profile-button" type="button">
            <PremiumIcon />
          </button>
          <button class="exit-button" type="button" @click="logout">
            <ExitIcon />
          </button>
        </div>
      </div>
    </div>
    <HeaderCabinetNavbar />
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
