<template>
  <div v-if="with_wrapper" class="main-section-mob">
    <div class="wrapper">
      <form class="search-form" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label">
            <img class="icon" src="~/assets/img/search.png" alt="#" />
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
    :class="{ hidden: hiddenSearchForm }"
    autocomplete="off"
  >
    <div class="search-row">
      <div class="input-wrap has-icon has-label">
        <img class="icon" src="~/assets/img/search.png" alt="#" />
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

<script setup lang="ts">
import { ref, computed, watch, defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "~/store/auth";
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useUIStore } from "~/store/ui";
import useQueryParams from "~/composables/useQueryParams.js";

const props = defineProps({
  with_wrapper: {
    default: false,
  },
});

const auth = useAuthStore();
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const { searchCities } = profileStore;
const { hiddenSearchForm } = storeToRefs(useUIStore());

const router = useRouter();
const route = useRoute();

const { getQueryParam } = useQueryParams();

const search = ref(route.query?.search ?? "");
const salary = ref(getQueryParam("salary") ?? "");
const city = ref(route.query?.cities ? +route.query.cities : null);
const cityOptions = ref([]);

const isEmployer = computed(() => auth.isEmployer);
const searchPlaceHolder = computed(() =>
  isEmployer.value
    ? "Какого специалиста вы ищете?"
    : "Какую вакансию вы ищете?",
);

// Сразу подгружаем города (можно заменить на useAsyncData).
const fetchCities = async (query: string = "") => {
  const items = (await searchCities({ search: query })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

// При изменении, снова получаем опции (supports search-as-you-type)
const updateCityInput = async (newValue = "") => {
  await fetchCities(newValue);
};

const onCityChange = (cityItem: any) => {
  city.value = cityItem?.value || null;
};

const buildQueryParams = () => {
  return {
    cities: city.value ? String(city.value) : undefined, // только id, не массив
    salary: salary.value
      ? typeof salary.value === "object"
        ? JSON.stringify(salary.value)
        : salary.value
      : undefined,
    search: search.value || undefined,
  };
};

const onSubmit = async () => {
  await vacancyStore.clearVacancies();
  const query = buildQueryParams();
  const routeName = isEmployer.value ? "search-resumes" : "search-vacancies";
  await router.push({ name: routeName, query });
};

// Подгружаем города при открытии
fetchCities();

watch(
  () => route.query.cities,
  (newVal) => {
    if (newVal) {
      city.value = +newVal;
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.search-form--widget {
  display: block;
}

@media only screen and (max-width: 960px) {
  .search-form-mobile {
    display: none;
  }
}
</style>
