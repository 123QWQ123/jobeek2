<script setup>
import {navigateTo} from "nuxt/app";
import {useAuthStore} from "../store/auth";
import {useVacancyStore} from "../store/vacancy";
import {storeToRefs} from "pinia";
import PageLoader from "../components/UI/PageLoader";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Мои вакансии",
})

const authStore = useAuthStore();
const vacancyStore = useVacancyStore();

const isEmployer = computed(() => authStore.isEmployer);

const isLoading = ref(false);
watch(isEmployer, (new_value) => {
  if (new_value){
    navigateTo({name: 'your-vacancies'});
  }
})

const route = useRoute();
const {getMyVacancies} = vacancyStore;
const {my_vacancies} = storeToRefs(vacancyStore);
onMounted(async() => {
  if (isEmployer.value){
    navigateTo({name: 'your-vacancies'});
  }
  isLoading.value = true;
  if (my_vacancies.value.length === 0){
    await getMyVacancies();
  }
  isLoading.value = false;
});
</script>
<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt position-relative">
      <PageLoader v-if="isLoading"/>
      <YourVacanciesList></YourVacanciesList>
    </div>
    <div class="bg-wrapper bt">
      <HomeWorkSection></HomeWorkSection>
    </div>
    <HomeSearchSection></HomeSearchSection>
  </main>
</template>