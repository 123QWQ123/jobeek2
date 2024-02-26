<script setup>
import { useAuthStore } from "../../store/auth";
import { useVacancyStore } from "~/store/vacancy.js";

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
  if (new_value === false) {
    navigateTo({ name: "my-resumes" });
  }
});
const vacancyStore = useVacancyStore();
const isCompleted = computed(() => {
  if (
    vacancyStore.providers.hh === true &&
    vacancyStore.providers.superjob === true
  ) {
    return true;
  }
  return false;
});
</script>
<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative">
      <div class="wrapper wrapper-1290 pb-5">
        <div class="w-box w-box--main bg-white" v-if="!isCompleted">
          <p class="text-danger p-3">
            Перед созданием вакансий требуется подключить сервисы поставщиков
            (HeadHunter, Superjob).
          </p>
        </div>
        <MyVacanciesConnectedProviders />
        <MyVacanciesList></MyVacanciesList>
      </div>
    </div>
  </main>
</template>

<style></style>
