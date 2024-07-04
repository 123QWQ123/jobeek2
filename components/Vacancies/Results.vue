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
            <!--            <div class="d-inline-flex">-->
            <!--              <form class="sort mx-1 mr-2" action="#">-->
            <!--                <span>Валюта:</span>-->
            <!--                <CustomSelect-->
            <!--                  v-model="form.currency"-->
            <!--                  :options="currencyOptions"-->
            <!--                  class="bg-white w-auto"-->
            <!--                  @change="onChangeCurrency"-->
            <!--                  :listStyles="listStyles"-->
            <!--                ></CustomSelect>-->
            <!--              </form>-->
            <!--              <form class="sort mx-1" action="#">-->
            <!--                <span>Сортировать:</span>-->
            <!--                <CustomSelect-->
            <!--                  v-model="form.order_by"-->
            <!--                  :options="sortingOptions"-->
            <!--                  @change="onChangeSorting"-->
            <!--                  class="bg-white w-auto"-->
            <!--                  :listStyles="listStyles"-->
            <!--                ></CustomSelect>-->
            <!--              </form>-->
            <!--            </div>-->
          </div>
        </div>
        <button class="mob-get-aside-btn" @click="toggle">
          <FilterIcon />
          Фильтры
        </button>
        <div class="aside-container">
          <BlockLoader class="position-fixed" v-if="isLoading" />
          <VacanciesFilters></VacanciesFilters>
          <!--          {{-->
          <!--            vacancyStore.industries_formatted_for_filter.map((item) => ({-->
          <!--              id: item.id,-->
          <!--              title: item.title,-->
          <!--            }))-->
          <!--          }}-->

          <VacanciesList :key="$route.fullPath"></VacanciesList>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useCurrencyOptions } from "~/composables/useCurrencyOptions";
import { useSortingOptions } from "~/composables/useSortingOptions";
import { useVacancyForm } from "~/composables/useVacancyForm";
import { navigateTo } from "nuxt/app";
import { useDictionaryStore } from "~/store/dictionary";
import { useUIStore } from "~/store/ui";

import { useNuxtApp } from "#app";
import useQueryParams from "~/composables/useQueryParams.js";
import { useResumeStore } from "~/store/resume.js";
import FilterIcon from "~/components/Vacancies/FilterIcon.vue";

const { $format_number } = useNuxtApp();
const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();
const uiStore = useUIStore();
const total = ref($format_number(vacancyStore.total) ?? 0);

onBeforeMount(() => {
  total.value = $format_number(vacancyStore.total);
});
// if (process.server) {
// }
const isSidebarOpen = computed(() => uiStore.isSidebarOpen);
const { toggleSidebar } = uiStore;

const toggle = () => {
  toggleSidebar();
};

const route = useRoute();
const { name: search_keyword } = route.query;

const currencyOptions = ref(useCurrencyOptions());
const sortingOptions = ref(useSortingOptions());

const form = ref(useVacancyForm());

const isLoading = ref(false);
const router = useRouter();
const { clearVacancies } = vacancyStore;
const onChangeSorting = (sorting) => {
  form.value.order_by = sorting;
  const params = useVacancyForm(form.value, "front");
  navigateTo({ query: params });
};

const onChangeCurrency = (currency) => {
  form.value.currency = currency;
  const params = useVacancyForm(form.value, "front");
  navigateTo({ query: params });
};

const { getMyResumes } = useResumeStore();
const { getVacancies } = vacancyStore;
const { getCurrentQueryParams } = useQueryParams();
const currentParams = ref(getCurrentQueryParams());
watch(
  () => ({ ...getCurrentQueryParams() }),
  async (newValues) => {
    isLoading.value = true;

    currentParams.value = newValues;
    await getVacancies(newValues);

    isLoading.value = false;
  },
);

onMounted(async () => {
  await getMyResumes();
});
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
