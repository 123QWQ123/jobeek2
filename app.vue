<template>
  <div>
      <NuxtLayout> </NuxtLayout>
  </div>
</template>

<script setup>

import {useAuthStore} from "~/store/auth";
import {useVacancyStore} from "~/store/vacancy";
import {useResumeStore} from "~/store/resume";
import {toast} from "vue3-toastify";
import {storeToRefs} from "pinia";

const { getConnectedEmployerProviders, importVacancies } = useVacancyStore();
const { getConnectedSeekerProviders } = useResumeStore();
const vacancyStore = useVacancyStore();
const {employerMessage} = storeToRefs(vacancyStore);


const authStore =  useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);
onMounted(async() => {

  await getConnectedEmployerProviders();
  await getConnectedSeekerProviders();


  setTimeout(async() => {
    const resData = await importVacancies();

    if (resData.hasOwnProperty('message')){
      toast.info(resData.message, {autoClose: 3000});
    }
  }, 4000)


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