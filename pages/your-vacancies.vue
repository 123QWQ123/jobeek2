<script setup>
import { navigateTo } from "nuxt/app";
import { useAuthStore } from "../store/auth";
import { useVacancyStore } from "../store/vacancy";
import { storeToRefs } from "pinia";
import PageLoader from "../components/UI/PageLoader";
import {useVacancyForm} from "~/composables/useVacancyForm";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Мои вакансии - Jobeek",
});

const authStore = useAuthStore();
const vacancyStore = useVacancyStore();

const {getMyVacancies} = vacancyStore;

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

const isLoading = ref(false);

watch(isEmployer, (new_value) => {
  if (new_value) {
    navigateTo({ name: 'your-vacancies' });
  }
});

const route = useRoute();

const form = useVacancyForm();
onMounted(async () => {
    isLoading.value = true;
    await getMyVacancies(useVacancyForm(form.value,  'backend'));
    isLoading.value = false;
});

</script>
<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt position-relative">
      <PageLoader v-if="isLoading" />

      <YourVacanciesConnectedProviders/>
      <YourVacanciesList ></YourVacanciesList >
    </div>
    <div class="bg-wrapper bt">
      <HomeWorkSection></HomeWorkSection>
    </div>
    <HomeSearchSection></HomeSearchSection>

  </main>
</template>



<style>
.list-of-providers {
  display: inline-flex;
  max-height: 20rem;
  padding: 1.5rem;
}

.list-of-providers .provider-item {
  max-height: 10rem;
  max-width: 10rem;
  display: inline-flex;
  justify-content: center;
}

.list-of-providers .provider-item {
  width: 100%;
  position: relative;
}

.list-of-providers .provider-item .provider-label {
  position: absolute;
  top: 0;
  left: 24px;
  transform: scale(1.5);
  background-color: rgba(229, 229, 229, 0.99);
  border-radius: 50%;
}</style>