<template>
  <div class="wrapper wrapper-mb">
    <div class="main-section-title"><h1 class="title mb-title-bottom">Поиск вакансий</h1></div>
    <form class="search-form" role="form" autocomplete="off">
      <div class="search-row" :class="{ wrapper: props.withWrapper }">
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
          <label for="city">Город</label>
          <SelectWithSearch
            :options="cityOptions"
            v-model="city"
            :placeholder="'Город'"
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
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import useQueryParams from "~/composables/useQueryParams.js";

const props = defineProps({
  withWrapper: { type: Boolean, default: false },
});

const placeholder = computed(() =>
  props.withWrapper
    ? "Какого специалиста вы ищете?"
    : "Какую вакансию вы ищете?",
);

const router = useRouter();
const route = useRoute();
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const { searchCities } = profileStore;
const { getQueryParam } = useQueryParams();

const search = ref(route.query?.search ?? "");
const salary = ref(getQueryParam("salary") ?? "");
const cityOptions = ref<{ value: number; name: string }[]>([]);
const city = ref<number | null>(extractCityIdFromQuery(route.query));

// Специальная функция для извлечения id города из query-параметра
function extractCityIdFromQuery(query): number | null {
  const raw = query?.cities;
  if (!raw) return null;
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? Number(arr[0]) : Number(arr);
  } catch {
    return Number(raw);
  }
}

// При инициализации — если в query есть город, добавляем его в cityOptions
await useAsyncData("city-from-query", async () => {
  let allCities = [];
  if (city.value) {
    const arr = JSON.parse(city.value);
    allCities = await vacancyStore.getCities({
      city_ids: Array.isArray(arr) ? arr : [Number(arr)],
    });
    const found = allCities?.find((item) => item.id === city.value);
    if (found) {
      cityOptions.value = [{ value: found.id, name: found.name }];
    }
  }
  return allCities;
});

watch(
  () => route.query?.cities,
  async (newCities) => {
    const id = extractCityIdFromQuery({ cities: newCities });
    if (id) {
      const arr = JSON.parse(city.value);
      const allCities = await vacancyStore.getCities({
        city_ids: Array.isArray(arr) ? arr : [Number(arr)],
      });
      const found = allCities?.find((item) => item.id === id);
      if (found) {
        cityOptions.value = [{ value: found.id, name: found.name }];
        city.value = found.id;
      }
    } else {
      city.value = null;
      cityOptions.value = [];
    }
  },
);

watch(
  () => getQueryParam("salary"),
  (newValue) => {
    salary.value = newValue;
  },
);

const onCityChange = (cityId) => {
  city.value = cityId ?? null;
};

const updateCityInput = async (newValue = "") => {
  cityOptions.value =
    (await searchCities({ search: newValue }))?.map((item) => ({
      value: item.id,
      name: item.name,
    })) ?? [];
};

const onSubmit = async () => {
  await router.push({
    name: "search-vacancies",
    query: {
      // Упаковываем id в строку-массив, так как роутер формирует такой формат
      cities: city.value ? JSON.stringify([city.value]) : undefined,
      salary: salary.value
        ? typeof salary.value === "object"
          ? JSON.stringify(salary.value)
          : salary.value
        : undefined,
      search: search.value || undefined,
    },
  });
};
</script>

<style scoped>
.search-form {
  box-shadow: none;
}
</style>
