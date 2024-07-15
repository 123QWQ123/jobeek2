<template>
  <h2 class="lk-page-title">Мои Избранные вакансии</h2>
  <PageLoader v-if="isLoading" />
  <div class="favorites-list-container">
    <ul class="favorites-list">
      <VacanciesItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      ></VacanciesItem>
    </ul>

    <!--    {{ my_favorite_vacancies }}-->
    <div class="footer mt-3" v-if="items.length">
      <button class="btn btn-primary" @click="prevPage">Prev</button>
      <button class="btn btn-primary ms-2" @click="nextPage">Next</button>
    </div>
    <div class="notification no-ic-bg" v-else>
      <div class="notification-text">
        <strong class="title">У вас пока нет вакансий в избранном</strong>
        <p>Сохраняйте вакансии, нажимая на звёздочку</p>
      </div>
      <nuxt-link
        class="notification-button button-accent"
        :to="{ name: 'search-vacancies' }"
        >Найти вакансию
      </nuxt-link>
    </div>
    <!--    <h3 >К сожалению ничего не нашли.</h3>-->
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { storeToRefs } from "pinia";
import { useVacancyForm } from "~/composables/useVacancyForm";
import Swal from "sweetalert2";

const vacancyStore = useVacancyStore();
const { getMyFavoriteVacancies } = vacancyStore;
const { my_favorite_vacancies, current_page } = storeToRefs(vacancyStore);

const items = ref([]);

const isLoading = ref(false);
const isMore = ref(false);

const route = useRoute();
const form = ref(useVacancyForm());
watch(my_favorite_vacancies, (newValues) => {
  items.value = newValues;
  if (newValues.length > 0) {
    isMore.value = true;
  }
});

onMounted(async () => {
  await getMyFavoriteVacancies({});
  isLoading.value = false;
});

const prevPage = async () => {
  isLoading.value = true;
  const res = await getMyFavoriteVacancies({
    page: parseInt(current_page.value) - 1,
  });
  if (res.items.length < 1) {
    Swal.fire({
      title: "Больше вакансий не найдено!",
      icon: "success",
    });
  }
  isLoading.value = false;
};
const nextPage = async () => {
  isLoading.value = true;
  const res = await getMyFavoriteVacancies({ page: current_page.value + 1 });
  if (res.items.length < 1) {
    isMore.value = false;
    Swal.fire({
      title: "Больше вакансий не найдено!",
      icon: "success",
    });
  }
  isLoading.value = false;
};
</script>

<style scoped></style>
