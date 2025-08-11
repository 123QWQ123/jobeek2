<script setup>
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Jobeek - Мои избранные вакансии",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

watch(isEmployer, (new_value) => {
  if (new_value === true) {
    navigateTo({ name: "favorite-resumes" });
  }
});
</script>
<template>
  <main class="main cabinet my-favorite-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />

    <div class="bg-wrapper position-relative pt-4">
      <div class="wrapper wrapper-1290">
        <div class="content mb-4">
          <MyFavoriteVacanciesList />
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
