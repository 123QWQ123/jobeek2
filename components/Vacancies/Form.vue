<template>
  <form class="search-form" @submit.prevent="onSearchSubmit" role="form" autocomplete="off">
    <PageLoader v-if="isLoading"/>
    <div class="wrapper">
      <div class="search-row">
        <div class="input-wrap has-icon has-label"><img class="icon" src="~/assets/img/svg/search.svg" alt="#">
          <label for="name">Названии вакансии </label>
          <input v-model="form.name" type="text" name="name" id="name" placeholder="Какую вакансию вы ищете?"
                 autocomplete="off">

        </div>
        <div class="input-wrap has-label">
          <label for="salary">Желаемая зарплата</label>
          <HeaderSalarySelectInForm v-model="form.salary"></HeaderSalarySelectInForm>
        </div>
        <div class="input-wrap has-icon">
          <SelectWithSearch :options="cityOptions" v-model="city" :listStyles="searchSelectStyles" @change="onCityChange" :listItemStyles="searchSelectItemStyles"/>
        </div>
        <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">

          <SelectWithSearch :options="regionOptions" v-model="region" :listStyles="searchSelectStyles" @change="onRegionChange" :listItemStyles="searchSelectItemStyles"/>
<!--          <input v-model="form.region" type="text" name="region" placeholder="Регион" autocomplete="off">-->
        </div>
        <button class="button-accent submit-search-form" type="submit">Поиск </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import {useVacancyStore} from "../../store/vacancy";
import {useVacancyForm} from "../../composables/useVacancyForm";
import {storeToRefs} from "pinia";
const vacancyStore = useVacancyStore();
const route = useRoute();
const router = useRouter();

const region = ref('*');
const city = ref('*');

const form = ref(useVacancyForm());
if (form.value.regions.length === 1){
  region.value = form.value.regions[0];
}
const onRegionChange = (regionItem) => {
  if (regionItem.value === '*'){
    form.value.regions = [];
  }else{
    form.value.regions = [regionItem.value];
  }
}
const onCityChange = (regionItem) => {
  if (regionItem.value === '*'){
    form.value.regions = [];
  }else{
    form.value.regions = [regionItem.value];
  }
}
const {getVacancies, getRegions, getCities} = vacancyStore;
const vacancies = computed(() => vacancyStore.vacancies);

// const {salary, city, country, search} = route.query;

const regionListStyles = {
  left: 'unset',
  right: '0px',
  width: 'auto !important',
  maxWidth: '20rem',
  minWidth: '8rem',
}
const searchSelectStyles = {
  left: 'unset',
  right: '0px',
  width: 'auto !important',
  maxWidth: '20rem',
  minWidth: '8rem',
}

const searchSelectItemStyles = {
  width: 'auto !important',
  whiteSpace: 'pre-wrap',
}

const regionOptions = ref([]);
const cityOptions = ref([]);

const {regions, cities} = storeToRefs(vacancyStore);

onMounted(async() => {
  await getRegions({country_id: form.value.country});
  const items = regions.value.map((item) => ({value: item.id, name: item.name}));
  items.unshift({
    value: '*', name: 'Все'
  });
  regionOptions.value = items;

});

watch(region, async(newRegion) => {
  if (region.value !== '*'){
    await getCities({region_id: newRegion});
    console.log(cities.value);
    const c_items = cities.value.map((item) => ({value: item.id, name: item.name}));
    c_items.unshift({
      value: '*', name: 'Все'
    });
    cityOptions.value = c_items;
  }
})

const isLoading = ref(false);
onMounted(async() => {
  isLoading.value = true;
  if (vacancies.value.length === 0){
    const formParams = useVacancyForm(form.value, 'backend');
    // console.log(formParams);
    // await getVacancies({...formParams});
  }
  isLoading.value = false;
});


const {clearVacancies} = vacancyStore;
const onSearchSubmit = async(e) => {
  isLoading.value = true;
  clearVacancies();
  console.log(form.value);
  const params = useVacancyForm(form.value, 'front');
  console.log(params);
  router.replace({name: 'search-vacancies', query: params});
  isLoading.value = false;
}
</script>

<style scoped>

</style>