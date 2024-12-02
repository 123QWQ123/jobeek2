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
          :placeholder="searchPlaceHolder"
          autocomplete="off"
          v-model="search"
        />
      </div>
      <div class="input-wrap has-icon">
        <HeaderSalarySelectInForm v-model="salary" />
      </div>

      <div class="input-wrap has-icon">
        <SelectWithSearch
          :options="cityOptions"
          v-model.number="city"
          :placeholder="'Город'"
          @input="updateCityInput"
        ></SelectWithSearch>
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
      <button
        class="button-xl submit-search-form"
        type="submit"
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
  auth.isEmployer ? "Какого специалиста вы ищете?" : "Какую вакансию вы ищете?",
);
const { getCurrentQueryParams } = useQueryParams();
const params = getCurrentQueryParams();

const router = useRouter();
const route = useRoute();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const { searchCities } = profileStore;

const search = ref();
const salary = ref({
  from: undefined,
  to: undefined,
  id: undefined,
});
const city = ref(null);

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
    cities: JSON.stringify(cities),
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

<style scoped>
.search-form--widget {
  display: block;
}

.search-form--widget .search-row {
  grid-template-columns: 1fr 20% 20% 130px;
}

@media only screen and (max-width: 1280px) {
  .search-form-desktop {
    display: none;
  }
}
</style>
