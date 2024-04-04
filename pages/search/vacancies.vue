<script setup>
import { useAuthStore } from "~/store/auth";
import { navigateTo } from "nuxt/app";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Поиск вакансий - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);

const route = useRoute();
onMounted(async () => {
  console.log("only client - vacancies");
  if (isEmployer.value) {
    navigateTo({ name: "search-resumes" });
  }

  watch(
    () => isEmployer.value,
    (new_value) => {
      if (new_value) {
        navigateTo({ name: "search-resumes" });
      }
    },
  );
});
</script>
<template>
  <div>
    <SearchForm2>
      <div class="wrapper">
        <slot></slot>
      </div>
    </SearchForm2>

    <VacanciesResults></VacanciesResults>
  </div>
</template>
