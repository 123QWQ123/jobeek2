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

    <div class="footer mt-3" v-if="items.length">
      <button
        class="btn btn-primary"
        @click="changePage(-1)"
        :disabled="current_page <= 1"
      >
        Prev
      </button>
      <button
        class="btn btn-primary ms-2"
        @click="changePage(1)"
        :disabled="!isMore"
      >
        Next
      </button>
    </div>
    <div class="notification no-ic-bg" v-else>
      <div class="notification-text">
        <strong class="title">У вас пока нет вакансий в избранном</strong>
        <p>Сохраняйте вакансии, нажимая на звёздочку</p>
      </div>
      <nuxt-link
        class="notification-button button-accent"
        :to="{ name: 'search-vacancies' }"
      >
        Найти вакансию
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
// Import required dependencies
import { useVacancyStore } from "~/store/vacancy";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import { useResumeStore } from "~/store/resume.js";

const { getMyResumes } = useResumeStore();
// Create a reference to the vacancy store
const vacancyStore = useVacancyStore();
const { getMyFavoriteVacancies } = vacancyStore;
// Destructure necessary states from the store
const { my_favorite_vacancies, current_page } = storeToRefs(vacancyStore);

// Reactive reference for the list of vacancies
const items = computed(() => my_favorite_vacancies.value); // Automatically watches for changes
const isLoading = ref(false); // Tracks loading state
const isMore = ref(true); // Flag for the availability of additional pages

useAsyncData("getMyFavoriteVacancies", async () => {
  return await getMyFavoriteVacancies();
});
useAsyncData("getMyResumes", async () => {
  return await getMyResumes();
});

// Function to load vacancies (loads the given page or the current page)
const loadVacancies = async (page = current_page.value) => {
  isLoading.value = true; // Enable the loading indicator

  try {
    const res = await getMyFavoriteVacancies({ page }); // Fetch vacancies

    // Check if there are no vacancies
    if (!res.items?.length) {
      isMore.value = false; // Disable the "next" button if no more pages
      Swal.fire({
        title: "Больше вакансий не найдено!",
        icon: "info",
      });
    } else {
      isMore.value = true; // Enable the "next" button if vacancies are available
    }
  } catch (error) {
    console.error("Error while loading vacancies:", error); // Log the error
  } finally {
    isLoading.value = false; // Disable the loading indicator in all cases
  }
};

// Common function for page switching (next or previous)
const changePage = (direction) => {
  const nextPage = current_page.value + direction; // Calculate the next page number
  if (nextPage > 0 && isMore.value) {
    loadVacancies(nextPage); // Load the requested page
  }
};
</script>

<style scoped></style>
