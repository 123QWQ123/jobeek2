<template>
  <div>
    <NuxtLayout></NuxtLayout>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { useVacancyStore } from "~/store/vacancy";
import { useResumeStore } from "~/store/resume";

// import { defineRule } from "vee-validate";

// defineRule("required", (value) => {
//   if (!value || !value.length) {
//     return "This field is required";
//   }
//
//   return true;
// });

const { getConnectedEmployerProviders } = useVacancyStore();
const { getConnectedSeekerProviders } = useResumeStore();
const vacancyStore = useVacancyStore();

const authStore = useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);
onMounted(async () => {
  await getConnectedEmployerProviders();
  await getConnectedSeekerProviders();
});
</script>

<style>
.layout {
  /*overflow-y: hidden;*/
}

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
</style>
