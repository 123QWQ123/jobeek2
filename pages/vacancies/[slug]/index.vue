<template>
  <main class="main cabinet vacansy-page" role="main">
    <div class="bg-wrapper pt">
      <div class="main-section main-section-mob">
        <div class="wrapper wrapper--xl">
          <SearchForm></SearchForm>
        </div>
      </div>
      <div class="wrapper wrapper-1290">

        <VacanciesSingleHHContent
          v-if="provider === 'hh'"
          :item="vacancy.hh"
        ></VacanciesSingleHHContent>
        <VacanciesSingleSuperjobContent
          v-if="provider === 'superjob'"
          :item="vacancy.superjob"
        ></VacanciesSingleSuperjobContent>
        <h2 class="lk-page-title">Похожие вакансии</h2>
        <div class="favorites-list-container">
          <VacanciesSingleLikeList></VacanciesSingleLikeList>
        </div>
      </div>
    </div>
    <!--    <HomeWorkSection/>-->
    <!--    <HomeSearchSection/>-->
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacancyStore } from "../../../store/vacancy";
import {navigateTo} from "nuxt/app";
const route = useRoute();
const vacancyStore = useVacancyStore();
const { getVacancy } = vacancyStore;
const { vacancy } = storeToRefs(vacancyStore);

const { slug } = route.params;
const { provider } = route.query;
const vacancyData = await getVacancy(slug, { provider });
const pageTitle = computed(() => vacancyData[provider]?.name + " - Jobeek");

if (!vacancyData.hasOwnProperty('hh') && !vacancyData.hasOwnProperty('superjob')){
  navigateTo({name: '404'});
}
useHead({
  title: pageTitle.value,
});

</script>

<style scoped>
.progress {
  background: none;
}
</style>