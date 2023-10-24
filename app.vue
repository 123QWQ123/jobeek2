<template>
  <div>
      <NuxtLayout> </NuxtLayout>
  </div>
</template>

<script setup>

import {useProfileStore} from "~/store/profile";
import {useAuthStore} from "~/store/auth";

const { getConnectedSeekerProviders, getConnectedEmployerProviders } = useProfileStore();

const authStore =  useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);
if (isEmployer.value){
  await getConnectedEmployerProviders();
}else{
  await getConnectedSeekerProviders();
}
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