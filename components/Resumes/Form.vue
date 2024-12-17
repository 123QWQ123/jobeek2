<template>
  <form class="search-form" role="form" autocomplete="off">
    <div class="wrapper">
      <div class="search-row">
        <div class="input-wrap has-icon has-label">
          <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
          <label for="name">Название</label>
          <input
            v-model="search"
            type="text"
            name="name"
            id="name"
            :placeholder="'Какую вакансию вы ищете?'"
            autocomplete="off"
          />
        </div>
        <div class="input-wrap has-label">
          <label for="salary">Зарплата</label>
          <HeaderSalarySelectInForm v-model="salary"></HeaderSalarySelectInForm>
        </div>
        <div class="input-wrap has-label">
          <label for="city">Город</label>
          <SelectWithSearch
            :options="cityOptions"
            v-model="city"
            :listStyles="searchSelectStyles"
            @change="onCityChange"
            :listItemStyles="searchSelectItemStyles"
          />
        </div>
        <button
          class="button-accent submit-search-form"
          type="button"
          @click="onSubmit"
        >
          Поиск
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

import { useVacancyStore } from "../../store/vacancy";
import { useVacancyForm } from "../../composables/useVacancyForm";
import { useResumeStore } from "~/store/resume";
import { useResumeForm } from "~/composables/useResumeForm";

const vacancyStore = useVacancyStore();
const resumeStore = useResumeStore();
const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const search = ref(null);
const salary = ref(null);
const region = ref(null);
const city = ref("*");

const form = ref(useResumeForm());

onMounted(() => {
  if (Array.from(form.value.cities).length === 1) {
    city.value = form.value.cities[0];
  }
});

const onCityChange = (regionItem) => {
  if (regionItem.value === "*") {
    form.value.cities = [];
  } else {
    form.value.cities = [regionItem.value];
  }
};
const { getRegions, getCities } = resumeStore;

const vacancies = computed(() => vacancyStore.vacancies);

const searchSelectItemStyles = {
  width: "auto !important",
  whiteSpace: "pre-wrap",
};

// const {regions, cities} = storeToRefs(vacancyStore);
const cities = computed(() => vacancyStore.cities);
const regions = computed(() => vacancyStore.regions);
// const regionOptions = ref([]);
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

// watch(region, async(newRegion) => {
//
//   if (region.value !== '*'){
//     await getCities({region_ids: [newRegion]});
//   }
//   prepareCities();
// });

const country = computed(() => {
  if (form.value.countries.length === 0) {
    return form.value.countries[0];
  } else return 1;
});

onMounted(async () => {
  await getRegions({ country_id: country.value });
  await getCities({ country_id: country.value });

  prepareCities();
});

const isLoading = ref(false);
const { clearVacancies } = vacancyStore;
const onSubmit = (e) => {
  const params = {name: search.value, cities: JSON.stringify(cities)};);
  navigateTo({ name: "search-resumes", query: params });
};

const searchPlaceHolder = computed(() =>
  auth.isEmployer ? "Какого специалиста вы ищете?" : "Какую вакансию вы ищете?",
);

const searchSelectStyles = {
  left: "unset",
  right: "0px",
  width: "auto !important",
  maxWidth: "20rem",
  minWidth: "8rem",
};
</script>

<style scoped></style>
