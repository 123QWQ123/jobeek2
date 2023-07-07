<template>
  <form class="search-form" role="form" autocomplete="off">
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
        <div class="input-wrap has-label">
          <label for="city">Город</label>
          <SelectWithSearch :options="cityOptions" v-model="city" :listStyles="searchSelectStyles" @change="onCityChange" :listItemStyles="searchSelectItemStyles"/>
        </div>
        <button class="button-accent submit-search-form" type="button" @click="onSubmit">Поиск </button>

<!--        <div class="input-wrap has-label">-->
<!--&lt;!&ndash;          <img class="icon" src="~/assets/img/svg/location.svg" alt="#">&ndash;&gt;-->
<!--          <label for="region">Регион</label>-->
<!--          <SelectWithSearch :options="regionOptions" v-model="region" :listStyles="searchSelectStyles" @change="onRegionChange" :listItemStyles="searchSelectItemStyles"/>-->
<!--        </div>-->
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

console.info('running');

const region = ref(null);
const city = ref('*');

const form = ref(useVacancyForm());

console.log(form.value)

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
// const regionOptions = ref([]);
const cityOptions = ref([]);

const prepareCities = () => {
  const c_items = cities.value.map((item) => ({value: item.id, name: item.name}));
  c_items.unshift({
    value: '*', name: 'Все'
  });
  cityOptions.value = c_items;
}

const page = useRoute();

// watch(region, async(newRegion) => {
//
//   if (region.value !== '*'){
//     await getCities({region_ids: [newRegion]});
//   }
//   prepareCities();
// });


const country = computed(() => {
  if (form.value.countries.length === 0){
    return form.value.countries[0];
  } else return 1;
});
onMounted(async() => {
    prepareCities();
  // if (country.value){
  //   await getRegions({country_id: [country.value]});
  // }
  // if (form.value.regions.length === 1){
  //   region.value = form.value.regions[0];
  // }
  // const items = regions.value.map((item) => ({value: item.id, name: item.name}));
  // items.unshift({
  //   value: '*', name: 'Все'
  // });
  // regionOptions.value = items;

});


const isLoading = ref(false);
const {clearVacancies} = vacancyStore;
const onSubmit = (e) => {
  const params = useVacancyForm(form.value, 'front');
  navigateTo({name: 'search-vacancies', query: params});
}

// const regionListStyles = {
//   left: 'unset',
//   right: '0px',
//   width: 'auto !important',
//   maxWidth: '20rem',
//   minWidth: '8rem',
// }
const searchSelectStyles = {
  left: 'unset',
  right: '0px',
  width: 'auto !important',
  maxWidth: '20rem',
  minWidth: '8rem',
}

</script>

<style scoped>

.search-row{
    grid-template-columns: 1fr 20% 20% 130px;
}
</style>