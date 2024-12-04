<template>
  <div v-if="props.with_wrapper">
    <div class="wrapper">
      <form class="search-form" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label">
            <img class="icon" src="~/assets/img/search.png" alt="#" />
            <label for="name">Поиск </label>
            <input
              type="text"
              name="name"
              placeholder="Какую вакансию вы ищете?"
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
    </div>
  </div>

  <form v-else class="search-form" role="form" autocomplete="off">
    <div class="search-row">
      <div class="input-wrap has-icon has-label">
        <img class="icon" src="~/assets/img/search.png" alt="#" />
        <label for="name">Поиск </label>
        <input
          type="text"
          name="name"
          placeholder="Какую вакансию вы ищете?"
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
          class="no_bg"
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

const props = defineProps({
  with_wrapper: {
    default: false,
  },
});

const auth = useAuthStore();

const { getCurrentQueryParams, getQueryParam } = useQueryParams();
const params = ref(getCurrentQueryParams() ?? {});

const router = useRouter();
const route = useRoute();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();

const search = ref(route.query?.name ?? undefined);

const salary = ref({
  min: undefined,
  max: undefined,
  value: undefined,
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
const { searchCities } = profileStore;
const { getVacancies, getCities } = vacancyStore;

const updateCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const cityOptions = ref([]);

// const page = useRoute();
//
// const country = computed(() => {
//   if (params.countries && params.countries.length === 1) {
//     return params.countries[0];
//   } else return 1;
// });

const isLoading = ref(false);

const { clearVacancies } = vacancyStore;
const onSubmit = async (e) => {
  isLoading.value = true;
  clearVacancies();
  const cities = city.value ? [city.value] : undefined;
  const queryParams = {
    cities: JSON.stringify(cities),
    salary: JSON.stringify(salary.value),
    name: search.value,
  };
  router.push({
    name: "search-resumes",
    query: queryParams,
  });

  isLoading.value = false;
};
</script>

<style scoped>
.search-form {
  box-shadow: none;
}
</style>
