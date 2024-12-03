<template>
  <main class="main results-page" role="main">
    <div class="results-page-content">
      <div class="wrapper">
        <div class="search-head">
          <div class="col">
            <div class="search-item">{{ search_keyword }}</div>
            <div class="found-count">
              Найдено
              {{ $format_number(total) }}
              вакансий
            </div>
          </div>
        </div>
        <button class="mob-get-aside-btn" @click="toggle">
          <FilterIcon />
          Фильтры
        </button>
        <div class="aside-container">
          <BlockLoader class="position-fixed" v-if="isLoading" />
          <VacanciesFilters></VacanciesFilters>

          <VacanciesList :key="$route.fullPath"></VacanciesList>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useVacancyForm } from "~/composables/useVacancyForm";
import { useUIStore } from "~/store/ui";
import { useAsyncData, useNuxtApp } from "#app";
import useQueryParams from "~/composables/useQueryParams.js";
import FilterIcon from "~/components/Vacancies/FilterIcon.vue";

const { $format_number } = useNuxtApp();
const vacancyStore = useVacancyStore();
const uiStore = useUIStore();
const { getVacancies } = vacancyStore;
const { total } = storeToRefs(vacancyStore);
const { getCurrentQueryParams } = useQueryParams();
const isLoading = ref(false);
const { toggleSidebar } = uiStore;
const toggle = () => {
  toggleSidebar();
};
const route = useRoute();
const { name: search_keyword } = route.query;
const form = ref(useVacancyForm());

useAsyncData("vacancies", async () => {
  return await getVacancies(getCurrentQueryParams());
});

watch(
  () => ({ ...getCurrentQueryParams() }),
  async (newValues, oldValues) => {
    if (JSON.stringify(newValues) !== JSON.stringify(oldValues)) {
      isLoading.value = true;
      await getVacancies(newValues);
      isLoading.value = false;
    }
  },
);
</script>
<style></style>
<style scoped>
.sort {
  align-items: baseline;
  justify-content: end;
}

@media (max-width: 960px) {
  .sorting_forms {
    flex-direction: column;
  }

  .reversed_forms {
    flex-direction: column-reverse;
  }

  .sort {
    justify-content: flex-start !important;
  }
}

@media (max-width: 480px) {
  .sorting_forms {
    flex-direction: column;
  }

  .reversed_forms {
    flex-direction: column-reverse;
  }

  .sort {
    flex-direction: column;
  }
}
</style>
