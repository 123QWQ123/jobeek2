<script setup>
import { useAuthStore } from "../../store/auth";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../../store/profile";
import { navigateTo } from "nuxt/app";
import { useResumeStore } from "~/store/resume";
import { useVacancyStore } from "~/store/vacancy";

definePageMeta({
  layout: "cabinet",
});

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
const { refreshSeeker } = useAuthStore();

const timeout = ref();
onMounted(async () => {
  // Swal.fire({
  //   title: 'Успешно!',
  //   text: "Вы успешно подключили",
  //   icon: 'success',
  //   confirmButtonText: 'ОК'
  // });

  // await getUser();
  //
  // await refreshSeeker();

  await getConnectedEmployerProviders();
  await getConnectedSeekerProviders();

  timeout.value = setTimeout(() => {
    navigateTo({
      name: "profile",
      query: {
        message: "У вас подключенные сервисы!",
      },
    });
  }, 5000);
});

onUnmounted(() => {
  clearTimeout(timeout.value);
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
