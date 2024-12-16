<template>
  <div>
    <NuxtLayout :name="nameLayout">
      <NuxtPage />
    </NuxtLayout>
    <client-only>
      <Hv />
    </client-only>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { useVacancyStore } from "~/store/vacancy";
import { useResumeStore } from "~/store/resume";
import useAlert from "~/composables/useAlert.js";

const { getConnectedEmployerProviders } = useVacancyStore();
const { getConnectedSeekerProviders } = useResumeStore();
const vacancyStore = useVacancyStore();
const { handleAlert } = useAlert();

const authStore = useAuthStore();
const { isAuthed, user } = storeToRefs(authStore);
const route = useRoute();
let nameLayout = computed(() => {
  return isAuthed.value ? "auth" : "guest";
});

if (isAuthed.value) {
  useAsyncData("getConnectedEmployerProviders", async () => {
    return await getConnectedEmployerProviders();
  });
  useAsyncData("getConnectedSeekerProviders", async () => {
    return await getConnectedSeekerProviders();
  });
}
onMounted(async () => {
  if (route.query.message) {
    handleAlert();
  }
});

watch(
  () => route.query.message,
  () => {
    if (route.query.message) {
      handleAlert();
    }
  },
);
</script>

<style>
.modal {
  display: flex;
  background: rgba(0, 0, 0, 0.15);
}

.layout-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.layout-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.layout-enter-active {
  transition: all 0.3s ease-out;
}

.layout-leave-active {
  transition: all 0.3s ease-in;
}

.layout-enter-to,
.layout-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* global.css */
:root {
  --vh: 9.32px;
}
</style>
