<template>
  <div class="wrapper wrapper-mb">
    <div class="main-section-title"><h1 class="title">Поиск резюме</h1></div>
    <div v-if="with_wrapper">
      <form class="search-form" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label">
            <img class="icon" src="~/assets/img/search.png" alt="#" />
            <label for="name">Поиск</label>
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
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProfileStore } from "~/store/profile";
import useQueryParams from "~/composables/useQueryParams.js";
import { useResumeStore } from "~/store/resume";

const props = defineProps({
  withWrapper: { type: Boolean, default: false },
  with_wrapper: {
    default: false,
  },
});

const router = useRouter();
const route = useRoute();
const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const { searchCities } = profileStore;
const { getQueryParam } = useQueryParams();

const search = ref(route.query?.search ?? undefined);
const salary = ref(getQueryParam("salary") ?? undefined);
const cityOptions = ref([]);
const city = ref(extractCityIdFromQuery(route.query));
const isLoading = ref(false);

// Специальная функция для извлечения id города из query-параметра
function extractCityIdFromQuery(query) {
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
let allCities = [];
if (city.value) {
  const id = extractCityIdFromQuery({ cities: city.value });
  allCities = await searchCities({
    city_ids: Array.isArray(id) ? id : [Number(id)],
  });
  const found = allCities?.find((item) => item.id === city.value);
  if (found) {
    cityOptions.value = [{ name: found.name, value: found.id }];
  }
}

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
const onSubmit = async (e) => {
  isLoading.value = true;
  const cities = city.value ? [city.value] : undefined;
  const queryParams = {
    cities: JSON.stringify(cities),
    salary: JSON.stringify(salary.value),
    search: search.value,
  };
  await navigateTo({ name: "search-resumes", query: queryParams });

  isLoading.value = false;
};
</script>

<style scoped>
.search-form {
  box-shadow: none;
}
</style>
