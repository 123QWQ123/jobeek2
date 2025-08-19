<template>
  <main class="main results-page" role="main">
    <div class="results-page-content">
      <div class="wrapper">
        <div class="search-head">
          <div class="col">
            <div class="search-item">{{ search_keyword }}</div>
            <div class="found-count">
              Найдено
              {{ totalFormated }}
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
            <div v-if="!isLoading && total === 0" class="no-results">
              Нет результатов
            </div>
            <ResumesAsyncList v-if="!isLoading" />
            <ResumesLoadingList v-else />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script async setup>
import { useUIStore } from "~/store/ui";

import { useNuxtApp } from "#imports";
import useQueryParams from "~/composables/useQueryParams.js";
import { useResumeStore } from "~/store/resume.js";
import FilterIcon from "~/components/Vacancies/FilterIcon.vue";

const { $format_number } = useNuxtApp();
const resumeStore = useResumeStore();
const { total, resumes } = storeToRefs(resumeStore);
const uiStore = useUIStore();
const totalFormated = computed(() => $format_number(total.value));
const { toggleSidebar } = uiStore;

const toggle = () => {
  toggleSidebar();
};

const route = useRoute();
const { name: search_keyword } = route.query;

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
