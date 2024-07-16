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
onMounted(async () => {
  if (isEmployer.value) {
    navigateTo({ name: "search-resumes" });
  }
});
</script>
<template>
  <div>
    <SearchVacancyForm with_wrapper="true" />

    <VacanciesResults></VacanciesResults>
  </div>
</template>
