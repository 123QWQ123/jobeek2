<template>
  <main class="main cabinet vacansy-page" role="main">
    <div class="bg-wrapper pt pb-4">
      <div class="main-section main-section-mob">
        <div class="wrapper wrapper--xl">
          <SearchForm></SearchForm>
        </div>
      </div>
      <div
        class="wrapper wrapper-1290"
        v-if="provider && vacancyData && vacancyData"
      >
        <VacanciesItemSearchContent :data="vacancyData?.data" />
      </div>

      <div class="wrapper wrapper-1290" v-else>Not Found</div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacancyStore } from "~/store/vacancy";
import { useAuthStore } from "~/store/auth";
import { useAsyncData } from "#app";

const isOpen = ref(true);
const route = useRoute();
const vacancyStore = useVacancyStore();
const { getVacancy, getMyVacancy } = vacancyStore;
const { vacancy } = storeToRefs(vacancyStore);
const { isEmployer } = storeToRefs(useAuthStore());

const { slug } = route.params;
const { provider } = route.query;
const { data: vacancyData } = await useAsyncData("getVacancy", async () => {
  if (provider) {
    return getVacancy(slug, { provider });
  } else {
    return getMyVacancy(slug);
  }
});

if (!vacancyData.value) {
  navigateTo({ name: "favorite-vacancies", params: { slug, provider } });
}

let pageTitle = ref("Not found  - Jobeek");

if (
  (vacancyData.value && vacancyData.value?.name) ||
  vacancyData.value?.name
) {
  pageTitle.value =
    (vacancyData.value?.name || vacancyData.value?.name) +
    " - Jobeek";
}

useHead({
  title: pageTitle.value ?? "Loading",
});
watch(isEmployer, (new_value) => {
  if (new_value) {
    navigateTo({ name: "my-vacancies" });
  }
});
</script>

<style scoped>
.progress {
  background: none;
}
</style>
