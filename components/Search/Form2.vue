<template>
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
          v-model="search"
        />
      </div>
      <div class="input-wrap has-label">
        <label for="salary">Желаемая зарплата</label>
        <HeaderSalarySelectInForm v-model="salary" />
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
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { useVacancyStore } from "~/store/vacancy";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/store/profile";
import useQueryParams from "~/composables/useQueryParams.js";

const auth = useAuthStore();

const isEmployer = computed(() => auth.isEmployer);
const searchPlaceHolder = computed(() =>
  auth.isEmployer ? "Какой специалист вы ищете?" : "Какую вакансию вы ищете?",
);
const { getCurrentQueryParams, getQueryParam } = useQueryParams();
const params = getCurrentQueryParams();
console.log(params);

const router = useRouter();
const route = useRoute();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const { searchCities } = profileStore;

const search = ref(route.query?.search ?? undefined);

const salary = ref({
  from: undefined,
  to: undefined,
  id: undefined,
});
salary.value = getQueryParam("salary");
const city = ref(null);

watch(
  () => getQueryParam("salary"),
  (newValue) => {
    salary.value = newValue;
  },
);

const onCityChange = (cityItem) => {
  if (cityItem.value === null) {
    city.value = undefined;
  } else {
    city.value = cityItem.value;
  }
};

const updateCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const { getVacancies, getCities } = vacancyStore;
const vacancies = computed(() => vacancyStore.vacancies);

const { cities } = storeToRefs(vacancyStore);
const cityOptions = ref([]);

const page = useRoute();

const country = computed(() => {
  if (params.countries && params.countries.length === 1) {
    return params.countries[0];
  } else return 1;
});

const isLoading = ref(false);

const { clearVacancies } = vacancyStore;
const onSubmit = async (e) => {
  isLoading.value = true;
  clearVacancies();
  const cities = city.value ? [city.value] : undefined;
  const queryVacancy = {
    cities: cities,
    salary: JSON.stringify(salary.value),
    search: search.value,
  };
  if (isEmployer.value) {
    router.push({
      name: "search-resumes",
      query: queryVacancy,
    });
  } else {
    router.push({
      name: "search-vacancies",
      query: queryVacancy,
    });
  }
  isLoading.value = false;
};
</script>
