<template>
  <div class="content">
      <PageLoader v-if="isLoading"/>

      <ul class="favorites-list">
        <VacanciesItem v-for="item in vacanciesItems" :key="item.id" :item="item"></VacanciesItem>
      </ul>

      <button ref="loadMoreButton" v-if="isMore" id="load_more_button" class="create-button show-more" @click="loadMore">
        Показать еще
        <div v-if="isLoading" class="ms-2 spinner-grow spinner-grow-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <img v-else src="~/assets/img/svg/Arrow-Down2.svg" alt="#">
      </button>
      <h3 v-else>
        К сожалению ничего не нашли!
      </h3>
  </div>
</template>

<script setup>
import {useVacancyStore} from "../../store/vacancy";
import {storeToRefs} from "pinia";
import {useVacancyForm} from "../../composables/useVacancyForm";
import Swal from "sweetalert2";
const vacancyStore = useVacancyStore();
const {getVacancies} = vacancyStore;
const {vacancies, current_page} = storeToRefs(vacancyStore);

const vacanciesItems = ref([]);

const loadMoreButton = ref();
const isLoading = ref(false);
const isMore = ref(false);

const route = useRoute();
const form = ref(useVacancyForm());
watch(vacancies, (newValues) => {
  vacanciesItems.value = newValues;
  if (newValues.length > 0){
    isMore.value = true;
  }
})


onMounted(async() => {
    isLoading.value = true;
    const params = useVacancyForm(form.value, 'backend');
    const res = await getVacancies({...params});
    console.log(res);
    if (res?.status !== 'success'){
        isLoading.value = false;
    }
    isLoading.value = false;
})

const loadMore = async() => {
  isLoading.value = true;
  const params = useVacancyForm(form.value, 'backend');
  const res = await getVacancies({...params, page: parseInt(current_page.value) + 1}, true);
    console.log(res);
  if (res.items.length < 1){
    isMore.value = false;
    Swal.fire({
      title: 'Больше вакансий не найдено!',
      icon: "success",
    });
  }
  isLoading.value = false;

  loadMoreButton.value.scrollIntoView({ behavior: "smooth", block: "start" });
}

</script>
<style scoped>

</style>