<script setup>
import {useVacancyStore} from "../../store/vacancy";
import {navigateTo} from "nuxt/app";
import {useAuthStore} from "../../store/auth";

definePageMeta({
  layout: 'main'
});
const authStore = useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);

watch(isEmployer, (new_value) => {
  if (!new_value){
    navigateTo({name: 'search-vacancies'});
  }
})

const route = useRoute();
onMounted(async () => {
  console.log(route.query);
  if (!isEmployer.value){
    navigateTo({name: 'search-vacancies'});
  }
})
</script>
<template>
  <div>
    <ResumesForm></ResumesForm>
    <ResumesResults></ResumesResults>
  </div>
</template>