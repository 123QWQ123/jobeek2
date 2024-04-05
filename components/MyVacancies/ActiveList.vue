<template>
  <div>
    <PageLoader v-if="isLoading" />

    <div class="d-inline-flex">
      <form class="sort mx-1" action="#">
        <span>Показать:</span>
        <CustomSelect
          v-model="per_page"
          :options="perPageOptions"
          @change="onChangePerPage"
          class="bg-white w-auto"
          :listStyles="listStyles"
        ></CustomSelect>
      </form>
      <form class="sort mx-1" action="#">
        <span>Сортировать:</span>
        <CustomSelect
          v-model="order_by"
          :options="sortingOptions"
          @change="onChangeSorting"
          class="bg-white w-auto"
          :listStyles="listStyles"
        ></CustomSelect>
      </form>
    </div>

    <ul class="resume-list mt-4" v-if="my_vacancies.length > 0">
      <MyVacanciesActiveItem
        v-for="item in my_vacancies"
        :key="item.id"
        :item="item"
      />
    </ul>
    <div class="d-flex mt-4 pb-4 justify-content-center" v-else>
      <p>Ничего не найдено!</p>
    </div>

    <div class="d-flex mt-4 justify-content-between" v-if="isPaginationVisible">
      <button
        class="btn btn-primary btn-group-sm"
        :class="{ disabled: isPrevDisabled }"
        @click="prevPage"
      >
        Prev
      </button>
      <p>{{ current_page }}/{{ total_page }}</p>
      <button
        class="btn btn-primary btn-group-sm"
        :class="{ disabled: isNextDisabled }"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { useMyVacancySortingOptions } from "~/composables/useMyVacancySortingOptions.js";
import { useMyVacancyPerPageOptions } from "~/composables/useMyVacancyPerPageOptions.js";
import { useVacancyStore } from "~/store/vacancy.js";
import useQueryParams from "~/composables/useQueryParams.js";
import PageLoader from "~/components/UI/PageLoader.vue";

const props = defineProps({
  items: {
    required: false,
    default: [],
  },
});
const my_vacancies = computed(() => props.items);
const vacancyStore = useVacancyStore();
const current_page = ref(vacancyStore.my_current_page ?? 1);
const total_page = computed(() => vacancyStore.my_last_page);
const isPrevDisabled = computed(() => {
  if (parseInt(current_page.value) === 1) return true;
  return false;
});
const isNextDisabled = computed(
  () => vacancyStore.my_last_page === vacancyStore.my_current_page,
);
const isPaginationVisible = computed(() => vacancyStore.my_last_page !== 1);
const route = useRoute();
watch(
  () => route.query.page,
  () => {
    current_page.value = route.query.page ?? 1;
  },
);

watch(
  () => current_page.value,
  async (newPage) => {
    await getMyDrafts({
      page: newPage,
    });
  },
);

const per_page = ref(10);
const order_by = ref(null);
const sortingOptions = ref(useMyVacancySortingOptions());
const perPageOptions = ref(useMyVacancyPerPageOptions());
const { getMyVacancies } = vacancyStore;

const onChangePerPage = async (per_page) => {
  isLoading.value = true;
  // form.value.per_page = per_page;
  // const params = useMyVacancyForm(form.value, "front");
  // await getMyVacancies(params);
  isLoading.value = false;
  // form.value.page = 1;
  current_page.value = form.value.page;
};

const onChangeSorting = async (sorting) => {
  isLoading.value = true;
  // form.value.order_by = sorting;
  // const params = useMyVacancyForm(form.value, "front");
  // await getMyVacancies(params);
  isLoading.value = false;
};

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
  updateQueryParam("page", parseInt(current_page.value) - 1);
};

const nextPage = async (e) => {
  e.preventDefault();
  isLoading.value = true;
  updateQueryParam("page", parseInt(current_page.value) + 1);
};

onMounted(async () => {
  await getMyVacancies({});
});
</script>

<style scoped>
.theme-checker input ~ .theme-checker-ui .circle.left {
  transform: translate(3px, -50%);
}

.theme-checker input ~ .theme-checker-ui .circle.right {
  transform: translate(30px, -50%);
}

.sort .d-select {
  background: #f5f8fa !important;
}
</style>
