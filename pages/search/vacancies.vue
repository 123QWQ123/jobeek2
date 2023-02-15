<script setup>
import {useAuthStore} from "../../store/auth";
import {navigateTo} from "nuxt/app";

definePageMeta({
  layout: 'main'
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);

console.log(isEmployer);

watch(isEmployer, (new_value) => {
  if (new_value){
    navigateTo({name: 'search-resumes'});
  }
  console.log(new_value);
})

const route = useRoute();
onMounted(async () => {
  console.log(route.query);
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