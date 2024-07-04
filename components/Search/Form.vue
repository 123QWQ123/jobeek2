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

const search = ref(null);
const salary = ref(null);
const region = ref(null);
const city = ref("*");

// onMounted(() => {
//   if (Array.from(form.value.cities).length === 1) {
//     city.value = form.value.cities[0];
//   }
// });
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
const { getVacancies, getRegions, getCities } = vacancyStore;
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
const { clearVacancies } = vacancyStore;
const onSubmit = (e) => {
  const params = useVacancyForm(form.value, "front");
  navigateTo({
    name: "search-vacancies",
    query: {
      countries: JSON.stringify([1]),
      cities: JSON.stringify(form.value.cities),
      salary: JSON.stringify(form.value.salary),
    },
  });
};

const searchPlaceHolder = computed(() =>
  auth.isEmployer ? "Какой специалист вы ищете?" : "Какую вакансию вы ищете?",
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
