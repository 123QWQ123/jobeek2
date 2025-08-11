<script setup>
import { useAuthStore } from "~/store/auth.js";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/store/profile.js";
import { useResumeStore } from "~/store/resume";
import { useVacancyStore } from "~/store/vacancy";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const { isEmployer } = storeToRefs(authStore);

const route = useRoute();
const isSuccess = ref("-");
const { code, email } = route.query;
const vacancyStore = useVacancyStore();
const resumeStore = useResumeStore();
const { getConnectedEmployerProviders } = vacancyStore;
const { getConnectedSeekerProviders } = resumeStore;
const { refreshSeeker, refreshEmployer } = useAuthStore();

onMounted(async () => {
  await refreshSeeker();
  await refreshEmployer();

  await getConnectedEmployerProviders();
  await getConnectedSeekerProviders();
});
</script>

<template>
  <main class="main cabinet profile-page bg-wrapper" role="main">
    <div class="wrapper">
      <div class="w-box" v-if="isSuccess">
        <div class="w-box-head">
          <h1 class="title">Вы успешно подключили!</h1>
        </div>
        <div class="w-box-body">
          <p>Через 5 секунд редиректится!</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
