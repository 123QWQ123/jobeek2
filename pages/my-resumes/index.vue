<script setup>
import { useAuthStore } from "~/store/auth";
import { useResumeStore } from "~/store/resume";
import { useAsyncData, navigateTo } from "#app";

const authStore = useAuthStore();
const resumeStore = useResumeStore();

const isEmployer = computed(() => authStore.isEmployer);
const isSubscribed = computed(() => authStore.isSubscribed);

useAsyncData("myResumesData", () =>
  Promise.all([
    resumeStore.getMyResumes(),
    resumeStore.getAvailabilityCreate(),
  ]),
);

watch(isEmployer, (value) => {
  if (value) {
    navigateTo({ name: "my-vacancies" });
  }
});

const isCompleted = computed(() => {
  const { hh, superjob } = resumeStore.providers;
  return !!hh && !!superjob;
});
</script>

<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative pt-4">
      <div class="wrapper wrapper-1290">
        <div class="content mb-4">
          <MyResumesConnectedProviders />
          <MyResumesList />
        </div>
      </div>
    </div>
  </main>
</template>
