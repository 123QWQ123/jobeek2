<script setup>
import { useAuthStore } from "~/store/auth";
import { useResumeStore } from "~/store/resume.js";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Мои резюме - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

watch(
  () => isEmployer.value,
  (new_value) => {
    console.log(new_value);
    if (new_value === true) {
      navigateTo({ name: "my-vacancies" });
    }
  },
);

const resumeStore = useResumeStore();
const isCompleted = computed(() => {
  if (
    resumeStore.providers.hh === true &&
    resumeStore.providers.superjob === true
  ) {
    return true;
  }
  return false;
});
</script>
<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative pt-4">
      <div class="wrapper wrapper-1290 pb-5">
        <div class="w-box w-box--main bg-white" v-if="!isCompleted">
          <p class="text-danger p-3">
            Перед созданием резюме требуется подключить сервисы поставщиков
            (HeadHunter, Superjob).
          </p>
        </div>
        <MyResumesConnectedProviders />
        <MyResumesList></MyResumesList>
      </div>
    </div>
  </main>
</template>

<style></style>
