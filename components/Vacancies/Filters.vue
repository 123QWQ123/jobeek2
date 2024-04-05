<template>
  <aside class="aside" :class="{ active: isSidebarOpen }">
    <div class="filter-container">
      <div class="filter-head">
        <strong>Фильтры</strong>
        <button class="clear-all" @click="resetFilters">Очистить все</button>
      </div>
      <VacanciesFiltersSalary />

      <VacanciesFiltersIndustry />

      <!--      <VacanciesFiltersRegion :is-city-mode="isCityMode" />-->

      <!--      <VacanciesFiltersCity />-->

      <!--      <VacanciesFiltersPartTime />-->
      <!--      <VacanciesFiltersExperience />-->
      <!--      <VacanciesFiltersWorkType />-->
      <!--      <VacanciesFiltersSchedule />-->

      <!--      <VacanciesFiltersMetro name="metros" />-->
      <ClientOnly>
        <VacanciesFiltersSpecialization />
      </ClientOnly>
    </div>
    <button class="close-aside" @click="toggleSidebar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="20"
        height="20"
        viewBox="0 0 122.878 122.88"
        enable-background="new 0 0 122.878 122.88"
        xml:space="preserve"
      >
        <g>
          <path
            d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"
          />
        </g>
      </svg>
    </button>
  </aside>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useUIStore } from "~/store/ui";
import { useNuxtApp } from "#app";
import { useForm } from "vee-validate";

const vacancyStore = useVacancyStore();

const uiStore = useUIStore();
const { toggleSidebar } = uiStore;
const isSidebarOpen = computed(() => uiStore.isSidebarOpen);
const { $isMobile } = useNuxtApp();

const { turnOnMobileMode, turnOffMobileMode } = uiStore;
const isMobile = computed(() => $isMobile());
if (isMobile) {
  turnOnMobileMode();
} else {
  turnOffMobileMode();
}

const initialValues = {
  industries: [],
  countries: [1],
  regions: [],
  cities: [],
};
const { getCurrentQueryParams } = useQueryParams();
const currentParams = ref(getCurrentQueryParams(initialValues) ?? {});

const { values, setValues } = useForm({
  initialValues,
});
setValues(currentParams.value);

const isCityMode = computed(() => {
  // if (values.regions.length === 1) {
  //   return true;
  // }
  return false;
});

const { clearVacancies, getVacancies } = vacancyStore;

const resetFilters = () => {
  resetForm();
  // router.push({ query: toFrond(values) });
};
</script>

<style scoped>
.check-block label {
  white-space: pre-wrap;
}
</style>
