<template>
  <div v-if="props.with_wrapper">
    <div class="wrapper">
      <form class="search-form" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label">
            <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
            <label for="name">Поиск </label>
            <input
              type="text"
              name="name"
              placeholder="Какого специалиста вы ищете?"
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
        <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
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
import { useProfileStore } from "~/store/profile";
import useQueryParams from "~/composables/useQueryParams.js";
import { ref } from "vue";

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
let cityOptions = ref([]);
const isLoading = ref(false);
const city = ref(null);
const { searchCities } = profileStore;
const { clearVacancies, getVacancies, getCities } = vacancyStore;

const search = ref(route.query?.search ?? undefined);

const salary = ref({
  min: undefined,
  max: undefined,
  value: undefined,
});
salary.value = getQueryParam("salary");

onBeforeMount(async () => {
  let cities = getQueryParam("cities");
  if (cities && cities.length > 0) {
    let item = (await getCities()).find((item) => item.id === cities[0]);

    cityOptions.value = [
      {
        value: item.id,
        name: item.name,
      },
    ];
    city.value = item.id;
  }
});

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

const onSubmit = async (e) => {
  isLoading.value = true;
  await clearVacancies();
  const cities = city.value ? [city.value] : undefined;
  const queryParams = {
    cities: JSON.stringify(cities),
    salary: JSON.stringify(salary.value),
    search: search.value,
  };
  await router.push({
    name: "search-vacancies",
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
