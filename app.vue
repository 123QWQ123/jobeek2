<template>
  <div>
      <NuxtLayout> </NuxtLayout>
  </div>
</template>

<script setup>

import {useProfileStore} from "~/store/profile";
import {useAuthStore} from "~/store/auth";
import {useVacancyStore} from "~/store/vacancy";
import {useResumeStore} from "~/store/resume";

const { getConnectedEmployerProviders } = useVacancyStore();
const { getConnectedSeekerProviders } = useResumeStore();

const authStore =  useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);
onMounted(async() => {

  await getConnectedEmployerProviders();
  await getConnectedSeekerProviders();
  setTimeout(() => {
  }, 1000)
})

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
<script setup lang="ts">
</script>