<script setup>
import { useAuthStore } from "~/store/auth";
import { useResumeStore } from "~/store/resume";

const authStore = useAuthStore();
const resumeStore = useResumeStore();

const isEmployer = computed(() => authStore.isEmployer);
const { getMyResumes, getAvailabilityCreate } = resumeStore;

useAsyncData("getMyResumes", async () => await getMyResumes());
useAsyncData(
  "getAvailabilityCreate",
  async () => await getAvailabilityCreate(),
);

watch(isEmployer, (new_value) => {
  if (new_value) {
    navigateTo({ name: "my-vacancies" });
  }
});

const isCompleted = computed(() => {
  const { hh, superjob } = resumeStore.providers;
  return !!(hh && superjob); // Приведение к булевому значению.
});
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
          <div class="premium-col sticky-item">
            <div class="title">
              {{ isEmployer ? "Премиум" : "Подключите Премиум подписку" }}
            </div>
            <div class="term" v-if="isEmployer">
              <span>Действует до</span><strong>24 августа 2024</strong>
            </div>
            <a class="btn button-xs" href="#" v-if="isEmployer">Отключить </a>
            <!--            <a class="btn button-xs" href="#" v-else>Подключить</a>-->
            <a class="notification-button button-accent" href="#">Подключить</a>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>
