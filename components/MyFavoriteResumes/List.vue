<template>
  <h2 class="lk-page-title">Избранные</h2>
  <PageLoader v-if="isLoading" />
  <div class="favorites-list-container">
    <ul class="favorites-list">
      <ResumesItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      ></ResumesItem>
    </ul>

    <div class="footer mt-3" v-if="items.length">
      <button class="btn btn-primary" @click="prevPage">Prev</button>
      <button class="btn btn-primary ms-2" @click="nextPage">Next</button>
    </div>
    <h3 v-else>К сожалению больше ничего не нашли.</h3>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacancyForm } from "~/composables/useVacancyForm";
import Swal from "sweetalert2";
import { useResumeStore } from "~/store/resume";

const resumeStore = useResumeStore();
const { getMyFavoriteResumes } = resumeStore;
const { my_favorite_resumes, current_page } = storeToRefs(resumeStore);

const items = ref([]);

const isLoading = ref(true);
const isMore = ref(false);

const route = useRoute();
const form = ref(useVacancyForm());
watch(my_favorite_resumes, (newValues) => {
  items.value = newValues;
  if (newValues.length > 0) {
    isMore.value = true;
  }
});

onMounted(async () => {
  await getMyFavoriteResumes({});
  isLoading.value = false;
});

const prevPage = async () => {
  isLoading.value = true;
  const res = await getMyFavoriteResumes({
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
