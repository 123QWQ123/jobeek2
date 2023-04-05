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


const region = ref(null);
const city = ref('*');

const form = ref(useVacancyForm());


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

const searchSelectItemStyles = {
  width: 'auto !important',
  whiteSpace: 'pre-wrap',
}

const {regions, cities} = storeToRefs(vacancyStore);
const regionOptions = ref([]);
const cityOptions = ref([]);

const prepareCities = () => {
  const c_items = cities.value.map((item) => ({value: item.id, name: item.name}));
  c_items.unshift({
    value: '*', name: 'Все'
  });
  cityOptions.value = c_items;
}

const page = useRoute();

watch(region, async(newRegion) => {

  if (region.value !== '*'){
    await getCities({region_ids: [newRegion]});
  }
  prepareCities();
});


const country = computed(() => {
  if (form.value.countries.length === 0){
    return form.value.countries[0];
  } else return 1;
});
console.log(country)
onMounted(async() => {
  if (country.value){
    await getRegions({country_id: [country.value]});
  }
  if (form.value.regions.length === 1){
    region.value = form.value.regions[0];
  }
  const items = regions.value.map((item) => ({value: item.id, name: item.name}));
  items.unshift({
    value: '*', name: 'Все'
  });
  regionOptions.value = items;
});


const isLoading = ref(false);
onMounted(async() => {
  isLoading.value = true;
  if (page.name === 'search-vacancies'){
    if (vacancies.value.length === 0){
      const formParams = useVacancyForm(form.value, 'backend');
      await getVacancies({...formParams});
    }
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

</script>

<style scoped>

</style>