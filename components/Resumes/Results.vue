<template>
  <main class="main results-page" role="main">
    <div class="results-page-content">
      <div class="wrapper">
        <div class="search-head">
          <div class="col">
            <div class="search-item">{{ search_keyword }}</div>
            <div class="found-count">
              Найдено
              {{ total }}
              вакансий
            </div>
          </div>
          <div class="col d-flex justify-content-end">
            <div class="d-inline-flex"></div>
          </div>
        </div>
        <button class="mob-get-aside-btn" @click="toggle">
          <FilterIcon />
          Фильтры
        </button>
        <div class="aside-container">
          <BlockLoader class="position-fixed" v-if="isLoading" />
          <ResumesFilters></ResumesFilters>

          <div class="content">
            <ResumesAsyncList v-if="!isLoading" />
            <ResumesLoadingList v-else />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script async setup>
import { useVacancyForm } from "~/composables/useVacancyForm";
import { useUIStore } from "~/store/ui";

import { useNuxtApp } from "#app";
import useQueryParams from "~/composables/useQueryParams.js";
import { useResumeStore } from "~/store/resume.js";
import FilterIcon from "~/components/Vacancies/FilterIcon.vue";

const { $format_number } = useNuxtApp();
const resumeStore = useResumeStore();
const uiStore = useUIStore();
const total = computed(() => $format_number(resumeStore.total));
const { toggleSidebar } = uiStore;

const toggle = () => {
  toggleSidebar();
};

const route = useRoute();
const { name: search_keyword } = route.query;

const form = ref(useVacancyForm());

const isLoading = ref(false);

const { getResumes } = resumeStore;
const { getCurrentQueryParams } = useQueryParams();

await useAsyncData("getResumes", async () => {
  return await getResumes({ ...getCurrentQueryParams() }, false);
});
watch(
  () => ({ ...getCurrentQueryParams() }),
  async (newValues, oldValues) => {
    if (JSON.stringify(newValues) !== JSON.stringify(oldValues)) {
      isLoading.value = true;
      await getResumes({ ...getCurrentQueryParams() }, false, true);
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
