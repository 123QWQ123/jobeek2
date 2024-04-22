<template>
  <div>
    <NuxtLayout></NuxtLayout>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { useVacancyStore } from "~/store/vacancy";
import { useResumeStore } from "~/store/resume";

useHead({
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
    },
  ],
});
const { getConnectedEmployerProviders } = useVacancyStore();
const { getConnectedSeekerProviders } = useResumeStore();
const vacancyStore = useVacancyStore();

const authStore = useAuthStore();

const route = useRoute();

watch(
  () => route.query.message,
  () => {
    // if (route.query.message) {
    //   console.log(321);
    //   toast.info(route.query.message, { autoClose: 3000 });
    // }
  },
);

onMounted(async () => {
  await getConnectedEmployerProviders();
  await getConnectedSeekerProviders();
  if (route.query.message) {
    useNuxtApp().$toast.info(route.query.message, { autoClose: 3000 });
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
