<template>
  <aside class="aside">
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
    <div class="filter-container">
      <div class="filter-head"> <strong>Фильтры</strong>
        <button class="clear-all">Очистить все</button>
      </div>
      {{ isRegionMode }}
      <VacanciesFiltersRegion v-if="isRegionMode" @onFormChange="onFormChange"/>
      <VacanciesFiltersCity :selected-region="selectedRegion" v-else @onFormChange="onFormChange" />
      <VacanciesFiltersSalary @onFormChange="onFormChange"/>
      <VacanciesFiltersSpecialization @onFormChange="onFormChange"/>
      <VacanciesFiltersWorkType @onFormChange="onFormChange"/>
      <VacanciesFiltersSchedule @onFormChange="onFormChange"/>
    </div>
  </aside>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";
import {useRoute, useRouter} from "nuxt/app";
import {useVacancyForm} from "../../composables/useVacancyForm";
const vacancyStore = useVacancyStore();

const route = useRoute();
const router = useRouter();

const form = ref(useVacancyForm());

const selectedRegion = computed(() => {
  if (form.value.regions.length === 1){
    return form.value.regions[0];
  }
});
const isRegionMode = computed(() => {
  if (form.value.regions.length === 1){
    return false;
  }
  return true;
});

const {clearVacancies, getVacancies} = vacancyStore;
const onFormChange = (filter_name, filter_value) => {
  console.log(filter_name, filter_value);

  form.value[filter_name] = filter_value;
  // isLoading.value = true;
  // clearVacancies();
  console.log(form.value);
  const params = useVacancyForm(form.value, 'front');
  console.log(params);
  router.push({query: params});
  // isLoading.value = false;
}
  // console.log(route.query.regions)

</script>

<style>
.check-block label{
  white-space: pre-wrap;
}
</style>