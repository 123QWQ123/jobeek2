<template>
  <h2 class="lk-page-title">Избранные</h2>
  <div class="favorites-list-container">

    <ul class="favorites-list">
      <VacanciesItem v-for="item in vacanciesItems" :key="item.id" :item="item"></VacanciesItem>
    </ul>



    <div class="footer mt-3" v-if="vacanciesItems.length">
      <button class="btn btn-primary" @click="prevPage">Prev</button>
      <button class="btn btn-primary ms-2 " @click="nextPage">Next</button>
    </div>
    <h3 v-else>
      К сожалению больше ничего не нашли!
    </h3>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";
import {storeToRefs} from "pinia";
import {useVacancyForm} from "../../composables/useVacancyForm";
import Swal from "sweetalert2";
const vacancyStore = useVacancyStore();
const {getMyFavoriteVacancies} = vacancyStore;
const {my_favorite_vacancies, current_page} = storeToRefs(vacancyStore);

const vacanciesItems = ref([]);

const isLoading = ref(false);
const isMore = ref(false);

const route = useRoute();
const form = ref(useVacancyForm());
watch(my_favorite_vacancies, (newValues) => {
  vacanciesItems.value = newValues;
  if (newValues.length > 0){
    isMore.value = true;
  }
});

onMounted(() => {
  getMyFavoriteVacancies({});
})

const prevPage = async() => {
  isLoading.value = true;
  const res = await getMyFavoriteVacancies({page: parseInt(current_page.value) - 1});
  if (res.items.length < 1){
    Swal.fire({
      title: 'Больше вакансий не найдено!',
      icon: "success",
    });
  }
  isLoading.value = false;
}
const nextPage = async() => {
  isLoading.value = true;
  const res = await getMyFavoriteVacancies({page: current_page.value + 1});
  if (res.items.length < 1){
    isMore.value = false;
    Swal.fire({
      title: 'Больше вакансий не найдено!',
      icon: "success",
    });
  }
  isLoading.value = false;
}
</script>

<style scoped>

</style>