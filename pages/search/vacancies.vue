<script setup>
import { useAuthStore } from "~/store/auth";
import { navigateTo } from "nuxt/app";

useHead({
  title: "Поиск вакансий - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);

const route = useRoute();

watch(
  () => authStore.isEmployer,
  (new_value) => {
    if (new_value) {
      navigateTo({ name: "search-resumes" });
    }
  },
);
if (isEmployer.value) {
  navigateTo({ name: "search-resumes" });
}
</script>
<template>
  <div class="main cabinet profile-page bg-wrapper">
    <SearchVacancyForm :withWrapper="true" />

    <VacanciesResults></VacanciesResults>
  </div>
</template>
