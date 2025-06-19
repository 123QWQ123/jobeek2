<template>
  <main class="main cabinet vacansy-page" role="main">
    <div class="bg-wrapper pt">
      <div class="main-section main-section-mob">
        <div class="wrapper wrapper--xl">
          <SearchForm></SearchForm>
        </div>
      </div>
      <div class="wrapper wrapper-1290" v-if="vacancy">
        <VacanciesItemContent :data="vacancy[provider]" />
        <!--        <h2 class="lk-page-title">Похожие вакансии</h2>-->
        <!--        <div class="favorites-list-container">-->
        <!--          <VacanciesSingleLikeList></VacanciesSingleLikeList>-->
        <!--        </div>-->
      </div>
      <!--      <VacanciesSingleResumeListSelectModal :open="isOpen" />-->
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacancyStore } from "~/store/vacancy";
import { useAsyncData } from "#app";

const isOpen = ref(true);
const route = useRoute();
const vacancyStore = useVacancyStore();
const { getVacancy } = vacancyStore;
const { vacancy } = storeToRefs(vacancyStore);

const { slug } = route.params;
const { provider } = route.query;
const { data: vacancyData } = await useAsyncData("getVacancy", async () =>
  getVacancy(slug, { provider }),
);

if (!vacancyData.value) {
  navigateTo({ name: "favorite-vacancies", params: { slug, provider } });
}

let pageTitle = ref("Not found  - Jobeek");

if (vacancyData.value && vacancyData.value[provider]?.name) {
  pageTitle.value = vacancyData.value[provider]?.name + " - Jobeek";
}

useHead({
  title: pageTitle.value ?? "Loading",
});
</script>

<style scoped>
.progress {
  background: none;
}
</style>
