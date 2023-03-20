<template>
  <div class="content">
    <ul class="favorites-list">
      <VacanciesItem v-for="item in vacancies" :key="item.id" :item="item"></VacanciesItem>
    </ul>


    <button ref="loadMoreButton" v-if="vacancies.length" id="load_more_button" class="create-button show-more" @click="loadMore">
      Показать еще


      <div v-if="isLoading" class="ms-2 spinner-grow spinner-grow-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <img v-else src="~/assets/img/svg/Arrow-Down2.svg" alt="#">
    </button>
  </div>
</template>

<script setup>
import {useVacancyStore} from "../../store/vacancy";
import {storeToRefs} from "pinia";
const vacancyStore = useVacancyStore();
const {getVacancies} = vacancyStore;
const {vacancies, current_page} = storeToRefs(vacancyStore);

const loadMoreButton = ref();
const isLoading = ref(false);
const loadMore = async() => {
  isLoading.value = true;
  await getVacancies({page: parseInt(current_page.value) + 1}, true);
  isLoading.value = false;

  loadMoreButton.value.scrollIntoView({ behavior: "smooth", block: "start" });
}

</script>
<style scoped>

</style>