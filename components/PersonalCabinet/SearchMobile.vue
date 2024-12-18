<template>
  <div v-if="props.with_wrapper" class="main-section-mob">
    <div class="wrapper">
      <form class="search-form" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label">
            <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
            <label for="name">Поиск </label>
            <input
              type="text"
              name="name"
              id="keyword_wrap"
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
      </form>
    </div>
  </div>

  <form
    v-else
    class="search-form main-section-mob"
    role="form"
    autocomplete="off"
  >
    <div class="search-row">
      <div class="input-wrap has-icon has-label">
        <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
        <label for="name">Поиск </label>
        <input
          type="text"
          name="name"
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
import { computed, ref, watch } from "vue";
import { useAuthStore } from "~/store/auth";
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useRouter, useRoute } from "vue-router";
import useQueryParams from "~/composables/useQueryParams.js";

// Props
const props = defineProps({
  with_wrapper: {
    default: false,
  },
});

// Stores
const auth = useAuthStore();
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const { searchCities } = profileStore;

// Router
const router = useRouter();
const route = useRoute();

// Query parameters
const { getCurrentQueryParams, getQueryParam } = useQueryParams();
const params = getCurrentQueryParams();

// Reactive state
const search = ref(route.query?.search ?? undefined);
const salary = ref(getQueryParam("salary") || {});
const city = ref(null);
const cityOptions = ref([]);
const isLoading = ref(false);

// Computed properties
const isEmployer = computed(() => auth.isEmployer);
const searchPlaceHolder = computed(() =>
  isEmployer.value
    ? "Какого специалиста вы ищете?"
    : "Какую вакансию вы ищете?",
);

// Country logic (многократно используется в приложении)
const country = computed(() => {
  if (params.countries && params.countries.length === 1) {
    return params.countries[0];
  }
  return 1;
});

// Watchers
watch(
  () => getQueryParam("salary"),
  (newValue) => {
    salary.value = newValue;
  },
);
const updateCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const onCityChange = (cityItem) => {
  city.value = cityItem.value || undefined;
};

const buildQueryParams = () => {
  const cities = city.value ? [city.value] : undefined;
  return {
    cities: JSON.stringify(cities),
    salary: JSON.stringify(salary.value),
    search: search.value,
  };
};

const navigateToSearch = async (query) => {
  const routeName = isEmployer.value ? "search-resumes" : "search-vacancies";
  await router.push({ name: routeName, query });
};

const onSubmit = async () => {
  isLoading.value = true;
  try {
    await vacancyStore.clearVacancies();
    const query = buildQueryParams();
    await navigateToSearch(query);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.search-form--widget {
  display: block;
}

.main-section-mob {
  margin-top: 1rem;
  padding-top: 3rem;
  margin-bottom: 3rem;
}

@media only screen and (max-width: 960px) {
  .search-form-mobile {
    display: none;
  }
}
</style>
