<template>
  <aside class="aside">
    <div class="filter-container">
      <div class="filter-head"> <strong>Фильтры</strong>
        <button class="clear-all" @click="resetFilters">Очистить все</button>
      </div>

      <VacanciesFiltersMetro @onFormChange="onFormChange" :selected-ids="form.metros"/>
      <VacanciesFiltersIndustry @onFormChange="onFormChange" :selected-ids="form.industries"/>
      <VacanciesFiltersSpecialization @onFormChange="onFormChange" :selected-ids="form.professional_roles"/>

      <VacanciesFiltersRegion :is-city-mode="isCityMode" :selected-country="selectedCountry" @onFormChange="onFormChange"/>
      <VacanciesFiltersCity v-if="isCityMode" :selected-region="selectedRegion" @onFormChange="onFormChange" />
      <VacanciesFiltersPartTime @onFormChange="onFormChange"/>
      <VacanciesFiltersExperience @onFormChange="onFormChange"/>
      <VacanciesFiltersSalary @onFormChange="onFormChange"/>
      <VacanciesFiltersWorkType @onFormChange="onFormChange"/>
      <VacanciesFiltersSchedule @onFormChange="onFormChange"/>
    </div>
    <button class="close-aside">
      <svg xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px"
           y="0px" width="20" height="20" viewBox="0 0 122.878 122.88"
           enable-background="new 0 0 122.878 122.88" xml:space="preserve">
          <g>
              <path
                  d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
          </g>
      </svg>
    </button>
  </aside>
</template>

<script setup>
console.log('filters');
import {useVacancyStore} from "../../store/vacancy";
import {useRoute, useRouter} from "nuxt/app";
import {useVacancyForm} from "../../composables/useVacancyForm";
const vacancyStore = useVacancyStore();

const form = ref(useVacancyForm());

const route = useRoute();
const router = useRouter();


const selectedCountry = computed(() => {
  if (form.value.countries.length === 1){
    return form.value.countries[0];
  }

  return 1;
});
const selectedRegion = computed(() => {
  if (form.value.regions.length === 1){
    return form.value.regions[0];
  }
});
const isCityMode = computed(() => {
  if (form.value.regions.length === 1){
    return true;
  }
  return false;
});

const {clearVacancies, getVacancies} = vacancyStore;

const resetFilters = () => {
  const params = useVacancyForm(null, 'reset');
  form.value = params;
  const resetParams = useVacancyForm(form.value, 'front');
  router.replace({query: resetParams});
}
const onFormChange = (filter_name, filter_value) => {
  form.value[filter_name] = filter_value;
  const params = useVacancyForm(form.value, 'front');
  router.replace({query: params});
}

</script>

<style>
.check-block label{
  white-space: pre-wrap;
}
</style>