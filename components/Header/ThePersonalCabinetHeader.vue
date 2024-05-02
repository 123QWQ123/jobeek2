<script setup>
import { useAuthStore } from "~~/store/auth";
import TheMainHeader from "~/components/Header/TheMainHeader.vue";
import { search_exception_routes } from "~/config";

const auth = useAuthStore();
const { logout, toggleUserMode } = auth;

const route = useRoute();

const isAuthed = computed(() => auth.isAuthed);
const isEmployer = computed(() => auth.isEmployer);
const user = computed(() => auth.user);

const searchOptions = [
  { value: "vacancies", name: "Вакансии" },
  { value: "resumes", name: "Резюме" },
];

const selectedType = computed(() =>
  auth.isEmployer ? "resumes" : "vacancies",
);

const form = ref({
  type: selectedType,
  keyword: "",
  city: "",
  country: "",
  salary: "0",
});

watch(selectedType, (new_value) => {
  form.value = { ...form.value, type: new_value };
});

const isCabinetNavbarShown = computed(() => {
  return search_exception_routes.includes(route.name);
});

function onChange(selectedOption) {
  console.log(selectedOption);
}

const onProfileClick = () => {
  if (!auth.isEmployer) {
    navigateTo({ name: "profile-seeker" });
  } else {
    navigateTo({ name: "profile-employer" });
  }
};

const isPremium = computed(() => auth.isSubscribed);
</script>
<template>
  <div class="lk-header" v-if="isAuthed">
    <div class="lk-header-main">
      <div class="header-wrapper">
        <Logo />
        <CabinetHeaderSearchForm v-if="!isCabinetNavbarShown" />
        <div class="profile-action">
          <a
            class="btn button-xs sign-in-btn ms-4"
            @click="onProfileClick"
            role="link"
          >
            {{ user?.phone }}
          </a>
          <button class="profile-button" type="button" v-if="isPremium">
            <PremiumIcon />
          </button>
          <button class="exit-button" type="button" @click="logout">
            <ExitIcon />
          </button>
        </div>
      </div>
    </div>
    <HeaderLkNavbar v-if="isAuthed"></HeaderLkNavbar>
  </div>
  <TheMainHeader v-else></TheMainHeader>
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
