<script setup>
import { useAuthStore } from "~/store/auth";
import { useVacancyStore } from "~/store/vacancy.js";

useHead({
  title: "Jobeek - Ваши вакансии",
});
const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);

watch(isEmployer, (new_value) => {
  if (new_value === false) {
    navigateTo({ name: "my-resumes" });
  }
});
</script>
<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative pt-4 pb-4">
      <div class="wrapper wrapper-1290">
        <div class="content mb-4">
          <MyVacanciesConnectedProviders />

          <MyVacanciesList />
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
