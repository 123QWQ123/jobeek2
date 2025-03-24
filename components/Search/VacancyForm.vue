<template>
  <form class="search-form" role="form" autocomplete="off">
    <div class="search-row">
      <div class="input-wrap has-icon has-label">
        <img class="icon" src="~/assets/img/search.png" alt="#" />
        <label for="name">Поиск</label>
        <input
          type="text"
          name="name"
          :placeholder="placeholder"
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
          v-model="city"
          placeholder="Город"
          @update:modelValue="onCityChange"
          @input="updateCityInput"
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
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  withWrapper: {
    type: Boolean,
    default: false,
  },
});

const placeholder = computed(() =>
  props.withWrapper
    ? "Какого специалиста вы ищете?"
    : "Какую вакансию вы ищете?",
);

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const { searchCities } = profileStore;
const { clearVacancies, getVacancies, getCities } = vacancyStore;

const { getQueryParam } = useQueryParams();

const search = ref(route.query?.search ?? "");
const salary = ref(getQueryParam("salary"));
const city = ref(null);
const cityOptions = ref([]);

onMounted(async () => {
  const citiesFromQuery = getQueryParam("cities");
  if (citiesFromQuery && citiesFromQuery.length > 0) {
    const cityFromAPI = (await getCities())?.find(
      (item) => item.id === citiesFromQuery[0],
    );
    if (cityFromAPI) {
      cityOptions.value = [{ value: cityFromAPI.id, name: cityFromAPI.name }];
      city.value = cityFromAPI.id;
    }
  }
});

watch(
  () => getQueryParam("salary"),
  (newValue) => {
    salary.value = newValue;
  },
);

const onCityChange = (cityItem) => {
  city.value = cityItem?.value ?? undefined; // Simplify city value update
};

const updateCityInput = async (newValue = "") => {
  cityOptions.value =
    (await searchCities({ search: newValue }))?.map((item) => ({
      value: item.id,
      name: item.name,
    })) ?? [];
};

const onSubmit = async () => {
  await clearVacancies();
  const cities = city.value ? [city.value] : undefined;

  await router.push({
    name: "search-vacancies",
    query: {
      cities: JSON.stringify(cities),
      salary: JSON.stringify(salary.value),
      search: search.value,
    },
  });
};
</script>

<style scoped>
.search-form {
  box-shadow: none;
}
</style>
