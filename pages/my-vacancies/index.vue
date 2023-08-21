<script setup>
import { navigateTo } from "nuxt/app";
import { useAuthStore } from "../../store/auth";
import { useVacancyStore } from "../../store/vacancy";
import {useVacancyForm} from "~/composables/useVacancyForm";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Мои вакансии - Jobeek",
});

const authStore = useAuthStore();
const vacancyStore = useVacancyStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

const isLoading = ref(false);

watch(isEmployer, (new_value) => {
  if (!new_value) {
    navigateTo({ name: 'my-resumes' });
  }
});

const route = useRoute();

const isShownRestContent = ref(false);

const form = useVacancyForm();
onMounted(async () => {
    isShownRestContent.value = true;
});

</script>
<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt position-relative">

      <MyVacanciesConnectedProviders2/>
      <MyVacanciesList ></MyVacanciesList >
    </div>

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