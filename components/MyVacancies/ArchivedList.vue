<template>
  <!--  <ul class="resume-list mt-4" v-if="my_vacancies.length > 0">-->
  <!--    <MyVacanciesArchivedItem v-for="item in my_vacancies" :key="item.id" :item="item" />-->
  <!--  </ul>-->
  <!--  <div class="d-flex mt-4 pb-4 justify-content-center" v-else>-->
  <!--    <p>Ничего не найдено - archived!</p>-->
  <!--  </div>-->

  <div>
    <PageLoader v-if="isLoading" />

    <div class="d-inline-flex">
      <form class="sort mx-1" action="#">
        <span>Показать:</span>
        <CustomSelect
          v-model="per_page"
          :options="perPageOptions"
          class="bg-white w-auto"
          :listStyles="listStyles"
        ></CustomSelect>
      </form>
      <form class="sort mx-1" action="#">
        <span>Сортировать:</span>
        <CustomSelect
          v-model="order_by"
          :options="sortingOptions"
          class="bg-white w-auto"
          :listStyles="listStyles"
        ></CustomSelect>
      </form>
    </div>

    <ul class="resume-list mt-4" v-if="my_vacancies.length > 0">
      <MyVacanciesArchivedItem
        v-for="item in my_vacancies"
        :key="item.id"
        :item="item"
      />
    </ul>
    <div class="d-flex mt-4 pb-4 justify-content-center" v-else>
      <p>У Вас нет вакансий.</p>
    </div>

    <div
      class="d-flex mt-4 justify-content-between pagination"
      v-if="isPaginationVisible"
    >
      <button
        class="page-item"
        :class="{ disabled: isPrevDisabled }"
        :disabled="isPrevDisabled"
        @click="prevPage"
      >
        <span class="page-link"> Prev </span>
      </button>
      <button class="page-item">
        <span class="page-link"> {{ current_page }}/{{ total_page }}</span>
      </button>
      <button
        class="page-item"
        :class="{ disabled: isNextDisabled }"
        :disabled="isNextDisabled"
        @click="nextPage"
      >
        <span class="page-link"> Next </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useMyVacancySortingOptions } from "~/composables/useMyVacancySortingOptions.js";
import { useMyVacancyPerPageOptions } from "~/composables/useMyVacancyPerPageOptions.js";
import { useVacancyStore } from "~/store/vacancy.js";
import PageLoader from "~/components/UI/PageLoader.vue";
import useQueryParams from "~/composables/useQueryParams.js";

const props = defineProps({
  items: {
    required: false,
    default: [],
  },
});
const route = useRoute();
const my_vacancies = computed(() => props.items);
const vacancyStore = useVacancyStore();
const current_page = ref(route.query.page ?? 1);
const total_page = computed(() => vacancyStore.my_archived_vacancies_last_page);
const isPrevDisabled = computed(() => {
  if (parseInt(current_page.value) <= 1) return true;
  return false;
});
const isNextDisabled = computed(
  () => parseInt(current_page.value) === parseInt(total_page.value),
);
const isPaginationVisible = computed(
  () => vacancyStore.my_archived_vacancies_last_page !== 1,
);

const per_page = ref(10);
const order_by = ref(null);
const sortingOptions = ref(useMyVacancySortingOptions());
const perPageOptions = ref(useMyVacancyPerPageOptions());

const listStyles = {
  left: 0,
  right: "unset",
  width: "auto !important",
};

const isLoading = ref(false);
const { updateQueryParam } = useQueryParams();

const prevPage = async (e) => {
  e.preventDefault();
  isLoading.value = true;
  --current_page.value;
  updateQueryParam("page", current_page.value);
  isLoading.value = false;
};

const nextPage = async (e) => {
  e.preventDefault();
  isLoading.value = true;
  ++current_page.value;
  updateQueryParam("page", current_page.value);
  isLoading.value = false;
};
</script>

<style scoped>
.provider_buttons {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  font-weight: bold;
}

.theme-checker input ~ .theme-checker-ui .circle.left {
  transform: translate(3px, -50%);
}

.theme-checker input ~ .theme-checker-ui .circle.right {
  transform: translate(30px, -50%);
}
</style>
