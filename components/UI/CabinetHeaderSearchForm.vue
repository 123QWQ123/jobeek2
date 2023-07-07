<template>
  <form
    class="search-form search-form--widget search-form-desktop"
    action="#"
    role="form"
    autocomplete="off"
    @submit.prevent="onSubmit"
  >
    <div class="search-row">
      <div class="input-wrap has-icon has-label">
        <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
        <input
          type="text"
          name="name"
          id="keyword"
          :placeholder="searchPlaceHolder"
          autocomplete="off"
          v-model="form.name"
        />
      </div>
        <div class="input-wrap has-icon">
          <HeaderSalarySelectInForm
            v-model="form.salary"
            @change="onChange"
          ></HeaderSalarySelectInForm>
        </div>

      <div class="input-wrap has-icon">
<!--        <SelectWithSearch-->
<!--          :options="cityOptions"-->
<!--          v-model="city"-->
<!--          :listStyles="searchSelectStyles"-->
<!--          @change="onCityChange"-->
<!--          :placeholder="'Город'"-->
<!--          :listItemStyles="searchSelectItemStyles"-->
<!--        />-->
          <SelectWithSearch :options="cityOptions" v-model.number="city" :placeholder="'Город'" @input="updateCityInput" ></SelectWithSearch>
      </div>
<!--      <div class="input-wrap has-icon">-->
<!--        <img class="icon" src="~/assets/img/svg/location.svg" alt="#" />-->
<!--        <SelectWithSearch-->
<!--          :options="regionOptions"-->
<!--          v-model="region"-->
<!--          :placeholder="'Регион'"-->
<!--          :listStyles="searchSelectStyles"-->
<!--          @change="onRegionChange"-->
<!--          :listItemStyles="searchSelectItemStyles"-->
<!--        />-->
<!--      </div>-->
      <button class="button-xl submit-search-form" type="submit" @click="onSubmit">Поиск</button>
    </div>
  </form>
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
  console.log(e);
};
const router = useRouter();
const route = useRoute();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();

const region = ref(null);
const city = ref("*");
watch(() => city.value, (newCity) => {
    form.value.cities = [newCity];
})
const form = ref(useVacancyForm());

// const onRegionChange = (regionItem) => {
//   if (regionItem.value === "*") {
//     form.value.regions = [];
//   } else {
//     form.value.regions = [regionItem.value];
//   }
// };
// const onCityChange = (regionItem) => {
//   if (regionItem.value === "*") {
//     form.value.regions = [];
//   } else {
//     form.value.regions = [regionItem.value];
//   }
// };
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

const { regions, cities } = storeToRefs(vacancyStore);
const regionOptions = ref([]);
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

// watch(region, async (newRegion) => {
//   if (region.value !== "*") {
//     await getCities({ region_ids: [newRegion] });
//   }
//   prepareCities();
// });

const country = computed(() => {
  if (form.value.countries && form.value.countries.length === 0) {
    return form.value.countries[0];
  } else return 1;
});
onMounted(async () => {
  // if (country.value) {
  //   await getRegions({ country_id: [country.value] });
  // }
  // if (form.value.regions && form.value.regions.length === 1) {
  //   region.value = form.value.regions[0];
  // }
  // const items = regions.value.map((item) => ({
  //   value: item.id,
  //   name: item.name,
  // }));
  // items.unshift({
  //   value: "*",
  //   name: "Все",
  // });
  // regionOptions.value = items;
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
const regionListStyles = {
  left: "unset",
  right: "0px",
  width: "auto !important",
  maxWidth: "20rem",
  minWidth: "8rem",
};
const searchSelectStyles = {
  left: "unset",
  right: "0px",
  width: "auto !important",
  maxWidth: "20rem",
  minWidth: "8rem",
};
</script>

<style scoped>

.search-form--widget {
  display: block;
}

.search-form--widget .search-row{
    grid-template-columns: 1fr 20% 20% 130px;
}
@media only screen and (max-width: 1280px){
    .search-form-desktop{
        display: none;
    }
}
</style>