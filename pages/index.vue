<template>
  <div>
    <HomeMainSection />
    <HomePlaceSection />
    <HomeVacancySection />
    <HomeCompaniesSection />
    <HomeWorkSection />
    <HomeSearchSection />
  </div>
</template>

<script async setup>
import { useDictionaryStore } from "~/store/dictionary.js";
import { useVacancyStore } from "~/store/vacancy.js";
import { useAsyncData } from "#app";

useHead({
  title: "Jobeek - все для вашего удобства",
});

const {
  getVacanciesInMoscow,
  getVacanciesInTopCompanies,
  getCurrencyCityVacancies,
  getIndustries,
} = useVacancyStore();
const { getSchedules } = useDictionaryStore();

useAsyncData("industries", async () => {
  return await getIndustries();
});
useAsyncData("schedules", async () => {
  return await getSchedules();
});
useAsyncData("currencyCityVacancies", async () => {
  return await getCurrencyCityVacancies();
});
useAsyncData("vacanciesInTopCompanies", async () => {
  return await getVacanciesInTopCompanies();
});
useAsyncData("vacanciesInMoscow", async () => {
  return await getVacanciesInMoscow();
});
</script>
