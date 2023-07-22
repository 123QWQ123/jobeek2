<template>
  <div class="main-section main-section-mob">
    <div class="wrapper wrapper--xl">
      <form class="search-form search-form--mobile" @submit.prevent="onSubmit" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label">
              <img class="icon" src="~/assets/img/svg/search.svg" alt="#">
              <label for="name">Названии вакансии </label>

              <input
                type="text"
                name="name"
                id="keyword"
                :placeholder="searchPlaceHolder"
                autocomplete="off"
                v-model="form.name"
              />
          </div>
          <div class="input-wrap has-label">
            <label>Желаемая зарплата </label>
              <HeaderSalarySelectInForm
                      v-model="form.salary"
                      @change="onChange"
              ></HeaderSalarySelectInForm>
          </div>
          <div class="input-wrap has-icon">
<!--              <SelectWithSearch-->
<!--                      :options="cityOptions"-->
<!--                      v-model="city"-->
<!--                      :listStyles="searchSelectStyles"-->
<!--                      @change="onCityChange"-->
<!--                      :placeholder="'Город'"-->
<!--                      :listItemStyles="searchSelectItemStyles"-->
<!--              />-->

              <SelectWithSearch :options="cityOptions" v-model.number="city" :placeholder="'Город'" @input="updateCityInput" ></SelectWithSearch>
          </div>
<!--          <div class="input-wrap has-icon">-->
<!--              <img class="icon" src="~/assets/img/svg/location.svg" alt="#" />-->
<!--              <SelectWithSearch-->
<!--                      :options="regionOptions"-->
<!--                      v-model="region"-->
<!--                      :placeholder="'Регион'"-->
<!--                      :listStyles="searchSelectStyles"-->
<!--                      @change="onRegionChange"-->
<!--                      :listItemStyles="searchSelectItemStyles"-->
<!--              />-->
<!--          </div>-->
          <button class="button-accent submit-search-form" type="submit">Поиск </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>

import { useAuthStore } from "~~/store/auth";
import { navigateTo } from "nuxt/app";
import { useVacancyStore } from "../../store/vacancy";
import { useVacancyForm } from "../../composables/useVacancyForm";
import { storeToRefs } from "pinia";
import {useProfileStore} from "~/store/profile";

const auth = useAuthStore();
const { logout } = auth;

const isEmployer = computed(() => auth.isEmployer);
const searchPlaceHolder = computed(() =>
    auth.isEmployer ? "Какой специалист вы ищете?" : "Какую вакансию вы ищете?"
);

const onChange = (e) => {
    // console.log(e);
};
const router = useRouter();
const route = useRoute();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();

const city = ref("*");
watch(() => city.value, (newCity) => {
    form.value.cities = [newCity];
})
const form = ref(useVacancyForm());
onMounted(() => {
    // console.log(form.value);
})


const {searchCities} = profileStore;
const updateCityInput = async (newValue = '') => {
    const items = await searchCities({search: newValue}) ?? [];
    cityOptions.value = items.map(item => ({value: item.city_id, name: item.city_name}));
}

const { getVacancies, getRegions, getCities } = vacancyStore;
const vacancies = computed(() => vacancyStore.vacancies);

const searchSelectItemStyles = {
    width: "auto !important",
    whiteSpace: "pre-wrap",
};

const { cities } = storeToRefs(vacancyStore);
const cityOptions = ref([]);

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

const page = useRoute();

const country = computed(() => {
    if (form.value.countries && form.value.countries.length === 0) {
        return form.value.countries[0];
    } else return 1;
});

const isLoading = ref(false);

const { clearVacancies } = vacancyStore;
const onSubmit = async (e) => {
    isLoading.value = true;
    clearVacancies();
    const params = useVacancyForm(form.value, "front");
    if (isEmployer.value) {
        navigateTo({ name: "search-resumes", query: params });
    } else {
        navigateTo({ name: "search-vacancies", query: params });
    }
    isLoading.value = false;
};
</script>

<style scoped>
.search-form--widget {
    display: block;
}

@media only screen and (max-width: 960px){
    .search-form-mobile{
        display: none;
    }
}
</style>