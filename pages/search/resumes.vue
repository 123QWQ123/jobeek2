<script setup>
import { useAuthStore } from "../../store/auth";

useHead({
  title: "Поиск резюме - Jobeek",
});
definePageMeta({
  layout: "cabinet",
});
const authStore = useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);

const route = useRoute();
onMounted(() => {
  console.log("only client");
  console.log(isEmployer.value);
  // if (!isEmployer.value){
  //   navigateTo({name: 'search-vacancies'});
  // }
  // watch(() => isEmployer.value, (new_value) => {
  //   if (!new_value){
  //     navigateTo({name: 'search-vacancies'});
  //   }
  // })
});
</script>
<template>
  <div>
    <ResumesForm></ResumesForm>
    <ResumesResults></ResumesResults>
  </div>
</template>
