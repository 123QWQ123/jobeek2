<script setup>
import {useAuthStore} from "../../store/auth";
import {navigateTo} from "nuxt/app";

definePageMeta({
  layout: 'main'
});
useHead({
  title: "Поиск вакансий - Jobeek",
})

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);

watch(isEmployer, (new_value) => {
  if (new_value){
    navigateTo({name: 'search-resumes'});
  }
})

const route = useRoute();
onMounted(async () => {
  if (isEmployer.value){
    navigateTo({name: 'search-resumes'});
  }
})
</script>
<template>
  <div>
    <VacanciesForm></VacanciesForm>
    <VacanciesResults></VacanciesResults>
  </div>
</template>