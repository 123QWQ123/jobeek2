<script setup>
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Поиск резюме - Jobeek",
});

const authStore = useAuthStore();
watch(
  () => authStore.isEmployer,
  (new_value) => {
    if (!new_value) {
      navigateTo({ name: "search-vacancies" });
    }
  },
);
onMounted(() => {
  if (!authStore.isEmployer) {
    navigateTo({ name: "search-vacancies" });
  }
});
</script>
<template>
  <div class="main cabinet profile-page bg-wrapper margin-top-none">
    <SearchResumeForm :withWrapper="false" />
    <ResumesResults />
  </div>
</template>
