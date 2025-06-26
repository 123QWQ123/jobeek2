<script setup>
import { useAuthStore } from "~/store/auth";
import { useResumeStore } from "~/store/resume";
import { useAsyncData, navigateTo } from "#app";

const authStore = useAuthStore();
const resumeStore = useResumeStore();

const isEmployer = computed(() => authStore.isEmployer);
const isSubscribed = computed(() => authStore.isSubscribed);

watch(isEmployer, (value) => {
  if (value) {
    navigateTo({ name: "my-vacancies" });
  }
});

useAsyncData("myResumesData", () =>
  Promise.all([
    resumeStore.getMyResumes(),
    resumeStore.getAvailabilityCreate(),
  ]),
);
</script>

<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative pt-4">
      <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
        <div class="content mb-4">
          <MyResumesConnectedProviders />
          <MyResumesList />
        </div>
        <aside class="sidebar">
          <MyVacanciesPremium />
        </aside>
      </div>
    </div>
  </main>
</template>
