<script setup>
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Поиск резюме - Jobeek",
});
definePageMeta({
  layout: "cabinet",
});
const authStore = useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);
watch(
  () => authStore.isEmployer,
  (new_value) => {
    if (!new_value) {
      navigateTo({ name: "search-vacancies" });
    }
  },
);
onMounted(() => {
  console.log("only client");
  console.log(isEmployer.value);
  if (!authStore.isEmployer) {
    navigateTo({ name: "search-vacancies" });
  }
});
</script>
<template>
  <div>
    <SearchResumeForm with_wrapper="true" />
    <ResumesResults></ResumesResults>
  </div>
</template>
