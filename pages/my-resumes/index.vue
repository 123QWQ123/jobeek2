<script setup>
import { useAuthStore } from "~/store/auth";
import { useResumeStore } from "~/store/resume.js";

definePageMeta({
  layout: "cabinet",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);

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
      <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
        <div class="content mb-4">
          <MyResumesConnectedProviders />
          <MyResumesList></MyResumesList>
        </div>
        <aside class="sidebar">
          <div class="premium-col sticky-item">
            <div class="title" v-if="isEmployer">Премиум</div>
            <div class="title" v-else>Подключите Премиум подписку</div>
            <div class="term" v-if="isEmployer">
              <span>Действует до</span><strong>24 августа 2024</strong>
            </div>
            <a class="btn button-xs" href="#" v-if="isEmployer">Отключить </a>
            <!--            <a class="btn button-xs" href="#" v-else>Подключить</a>-->
            <a class="notification-button button-accent" href="#"
              >Подключить
            </a>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<style></style>
