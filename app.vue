<template>
  <div>
    <NuxtLoadingIndicator color="#fff" />
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

const { getConnectedEmployerProviders } = useVacancyStore();
const { getConnectedSeekerProviders } = useResumeStore();
const vacancyStore = useVacancyStore();

const authStore = useAuthStore();
const { isAuthed, user } = storeToRefs(authStore);
const route = useRoute();
let nameLayout = computed(() => {
  return isAuthed.value ? "auth" : "guest";
});

onMounted(async () => {
  if (isAuthed.value) {
    await getConnectedEmployerProviders();
    await getConnectedSeekerProviders();
  }

  if (route.query?.message) {
    useNuxtApp().$toast.info(route.query.message, {
      autoClose: 3000,
      onClose: () => {
        navigateTo({ path: route.path });
      },
    });
  }
});
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
