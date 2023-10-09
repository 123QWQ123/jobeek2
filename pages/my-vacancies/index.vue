<script setup>
import { useAuthStore } from "../../store/auth";
import { useVacancyStore } from "../../store/vacancy";
import {useVacancyForm} from "~/composables/useVacancyForm";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Мои вакансии - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

watch(isEmployer, (new_value) => {
  if (!new_value) {
    navigateTo({ name: 'my-resumes' });
  }
});

</script>
<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative">

      <MyVacanciesConnectedProviders/>
      <MyVacanciesList ></MyVacanciesList >
    </div>

  </main>
</template>



<style></style>