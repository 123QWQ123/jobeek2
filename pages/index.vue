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

<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";
import { useVacancyStore } from "~/store/vacancy.js";

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

await getVacanciesInMoscow();
await getVacanciesInTopCompanies();
await getCurrencyCityVacancies();
await getIndustries();
await getSchedules();
</script>
