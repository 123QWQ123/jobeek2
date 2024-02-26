<template>
  <div class="main-section">
    <div class="wrapper wrapper--xl">
      <div class="main-section-title">
        <h1 class="title">Поиск вакансий</h1>
        <!--          <span>Lorem ipsum dolor sit amet, consectetur adipiscing-->
        <!--                            elit. Id.</span>-->
      </div>
      <form class="search-form" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label">
            <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
            <label for="name">Поиск </label>
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
            <label for="salary">Желаемая зарплата</label>
            <HeaderSalarySelectInForm
              v-model="form.salary"
            ></HeaderSalarySelectInForm>
          </div>
          <div class="input-wrap has-label">
            <label for="salary">Город</label>
            <SelectWithSearch
              :options="cityOptions"
              v-model.number="city"
              placeholder="Город"
              @input="updateCityInput"
              @change="onCityChange"
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
      </form>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "~~/store/auth";
import { useVacancyStore } from "../../store/vacancy";
import { useVacancyForm } from "../../composables/useVacancyForm";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/store/profile";

const auth = useAuthStore();

const isEmployer = computed(() => auth.isEmployer);
const searchPlaceHolder = computed(() =>
  auth.isEmployer ? "Какой специалист вы ищете?" : "Какую вакансию вы ищете?",
);

const router = useRouter();
const route = useRoute();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const { searchCities } = profileStore;

const region = ref(null);
const city = ref("*");

const form = ref(useVacancyForm());

// const onRegionChange = (regionItem) => {
//     if (regionItem.value === "*") {
//         form.value.regions = [];
//     } else {
//         form.value.regions = [regionItem.value];
//     }
// };
const onCityChange = (cityItem) => {
  if (cityItem.value === "*") {
    form.value.cities = [];
  } else {
    form.value.cities = [cityItem.value];
  }
};

const updateCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const { getVacancies, getRegions, getCities } = vacancyStore;
const vacancies = computed(() => vacancyStore.vacancies);

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

// watch(city, async (newCity) => {
//   form.value.cities = [newCity];
// });

watch(region, async (newRegion) => {
  if (region.value !== "*") {
    await getCities({ region_ids: [newRegion] });
  }
  prepareCities();
});
const country = computed(() => {
  if (form.value.countries && form.value.countries.length === 0) {
    return form.value.countries[0];
  } else return 1;
});
onMounted(async () => {
  if (country.value) {
    await getRegions({ country_id: [country.value] });
  }

  if (form.value.regions && form.value.regions.length === 1) {
    region.value = form.value.regions[0];
  }
  const items = regions.value.map((item) => ({
    value: item.id,
    name: item.name,
  }));
  items.unshift({
    value: "*",
    name: "Все",
  });
  regionOptions.value = items;
});

const isLoading = ref(false);

const { clearVacancies } = vacancyStore;
const onSubmit = async (e) => {
  isLoading.value = true;
  clearVacancies();
  console.log(isEmployer.value);
  const params = useVacancyForm(form.value, "front");
  if (isEmployer.value) {
    router.push({ name: "search-resumes", query: params });
  } else {
    router.push({ name: "search-vacancies", query: params });
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
