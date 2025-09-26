<template>
  <form class="search-form" role="form" autocomplete="off">
    <div class="wrapper">
      <div class="search-row">
        <div class="input-wrap has-icon has-label">
          <img class="icon" src="~/assets/img/search.png" alt="#" />
          <label for="name">Название</label>
          <input
            v-model="search"
            type="text"
            name="name"
            id="name"
            :placeholder="searchPlaceHolder"
            autocomplete="off"
          />
        </div>
        <div class="input-wrap has-label">
          <label for="salary placeholder">Зарплата</label>
          <HeaderSalarySelectInForm v-model="salary"></HeaderSalarySelectInForm>
        </div>
        <div class="input-wrap has-label">
          <label for="city">Город</label>
          <SelectWithSearchWithIcon
            :options="cityOptions"
            v-model="city"
            :listStyles="searchSelectStyles"
            @input="updateCityInput"
            :listItemStyles="searchSelectItemStyles"
            not_found="Город не найдено"
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

import { useVacancyStore } from "~/store/vacancy";
import { useVacancyForm } from "~/composables/useVacancyForm";
import { useProfileStore } from "~/store/profile.js";

const vacancyStore = useVacancyStore();
const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const search = ref(undefined);
const salary = ref(undefined);
const city = ref(undefined);

const profileStore = useProfileStore();
const { searchCities } = profileStore;
const updateCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};
const city_name = ref("");
// watch(
//   () => city_name.value,
//   (newCity) => {
//     form.value.city_name = newCity;
//   },
// );
// const onCityChange = (regionItem) => {
//   if (regionItem.value === "*") {
//     form.value.cities = [];
//   } else {
//     form.value.cities = [regionItem.value];
//   }
// };
const { getCities } = vacancyStore;
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

const isLoading = ref(false);
const onSubmit = async (e) => {
  await navigateTo({
    name: !auth.isEmployer ? "search-vacancies" : "search-resumes",
    query: {
      search: search.value,
      cities: city.value,
      salary: salary.value
        ? JSON.stringify({
            min: salary.value.min,
            max: salary.value.max,
          })
        : undefined,
    },
  });
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
