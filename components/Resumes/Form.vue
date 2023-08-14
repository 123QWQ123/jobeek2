<template>
  <form class="search-form" @submit.prevent="onSearchSubmit" role="form" autocomplete="off">
    <div class="wrapper">
      <div class="search-row">
        <div class="input-wrap has-icon has-label"><img class="icon" src="~/assets/img/svg/search.svg" alt="#">
          <label for="name">Названии вакансии </label>
          <input v-model="form.keyword" type="text" name="name" id="name" placeholder="Какую вакансию вы ищете?"
                 autocomplete="off">
        </div>
        <div class="input-wrap has-label">
          <label for="salary">Желаемая зарплата </label>
          <HeaderSalarySelectInForm v-model="form.salary"></HeaderSalarySelectInForm>
        </div>
        <div class="input-wrap has-icon">
            <img class="icon" src="~/assets/img/svg/location.svg" alt="#">
<!--          <input v-model="form.city" type="text" name="city" placeholder="Город" autocomplete="off">-->

          <SelectWithSearch :options="cityOptions" v-model.number="city" :placeholder="'Город'" @input="updateCityInput" ></SelectWithSearch>
        </div>
<!--        <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">-->
<!--          <input v-model="form.country" type="text" name="country" placeholder="Страна" autocomplete="off">-->
<!--        </div>-->
        <button class="button-accent submit-search-form" type="submit">Поиск </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import {useProfileStore} from "~/store/profile";
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";

const profileStore = useProfileStore();
const vacancyStore = useVacancyStore();
const { searchCities } = profileStore;
const { getVacancies, getRegions, getCities } = vacancyStore;

const onChange = (data) => {
  console.log(data);
}
const form = ref({
  keyword: "",
  city: "",
  country: "",
  salary: "0",
})

const router = useRouter();
const route = useRoute();

const { cities } = storeToRefs(vacancyStore);
const city = ref(null);
const cityOptions = ref([]);
const updateCityInput = async (newValue = '') => {
    const items = await searchCities({search: newValue}) ?? [];
    cityOptions.value = items.map(item => ({value: item.city_id, name: item.city_name}));
}


const prepareCities = () => {
    const c_items = cities.value.map((item) => ({
        value: item.id,
        name: item.name,
    }));
    c_items.unshift({
        value: "*",
        name: "Все",
    });
    cityOptions.value = c_items;
};


onMounted(() => {
  form.value = {...route.query};
})

const onSearchSubmit = (e) => {
  console.log(form.value);
  router.push({name: 'search-vacancies', query: form.value});
}
</script>

<style scoped>

</style>