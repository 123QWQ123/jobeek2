<script setup>
import { useAuthStore } from "../../store/auth";
import { useVacancyStore } from "../../store/vacancy";
import { useVacancyForm } from "~/composables/useVacancyForm";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Мои избранние резюме - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

watch(
  () => isEmployer.value,
  (new_value) => {
    if (!new_value) {
      navigateTo({ name: "my-vacancies-favorite" });
    }
  }
);
</script>
<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative">
      <MyResumesConnectedProviders />
      <MyFavoriteVacanciesList />
    </div>
  </main>
</template>

<style></style>
