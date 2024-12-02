<template>
  <div class="content">
    <div>
      <ul class="favorites-list">
        <VacanciesItem v-for="item in vacancies" :key="item.id" :item="item" />
      </ul>

      <button
        ref="loadMoreButton"
        v-if="isMore"
        id="load_more_button"
        class="create-button show-more"
        @click="loadMore"
      >
        Показать еще
        <div
          v-if="isLoading"
          class="ms-2 spinner-grow spinner-grow-sm"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <img v-else src="~/assets/img/svg/Arrow-Down2.svg" alt="#" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacancyStore } from "~/store/vacancy";
import Swal from "sweetalert2";
import useQueryParams from "~/composables/useQueryParams.js";

const { getVacancies } = useVacancyStore();
const { current_page, vacancies } = storeToRefs(useVacancyStore());
const loadMoreButton = ref();
const isLoading = ref(false);
const isMore = ref(false);
const { getCurrentQueryParams } = useQueryParams();
const current_params = getCurrentQueryParams() ?? {};

const params = ref(current_params);
watch(
  () => getCurrentQueryParams(),
  (newParams) => {
    isLoading.value = true;

    params.value = newParams;
  },
);
onMounted(() => {
  if (vacancies.value.length > 0) {
    isMore.value = true;
  }
});
watch(vacancies, (newValues) => {
  if (newValues.length > 0) {
    isMore.value = true;
  }
});
const loadMore = async () => {
  isLoading.value = true;
  const res = await getVacancies(
    { ...params.value, page: parseInt(current_page.value) + 1 },
    true,
  );
  isLoading.value = false;

  if (res.status !== "success") {
    isMore.value = false;
    Swal.fire({
      title: "Больше вакансий не найдено!",
      icon: "success",
    });
    return;
  }
  loadMoreButton.value.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<style scoped></style>
