<template>
  <h2 class="lk-page-title mb-4">Мои избранные резюме</h2>
  <PageLoader v-if="isLoading" />

  <div class="favorites-list-container">
    <ul class="favorites-list">
      <ResumesItem
        v-for="item in my_favorite_resumes"
        :key="item.id"
        :item="item"
      ></ResumesItem>
    </ul>

    <!--    <div class="footer mt-3" v-if="my_favorite_resumes.length">-->
    <!--      <button-->
    <!--        class="btn btn-primary"-->
    <!--        @click="prevPage"-->
    <!--        :disabled="!hasPreviousPage"-->
    <!--      >-->
    <!--        Prev-->
    <!--      </button>-->
    <!--      <button-->
    <!--        class="btn btn-primary ms-2"-->
    <!--        @click="nextPage"-->
    <!--        :disabled="!hasNextPage"-->
    <!--      >-->
    <!--        Next-->
    <!--      </button>-->
    <!--    </div>-->
    <div v-if="!my_favorite_resumes.length" class="no-results no-results-mt-20">
      <p>
        У вас пока нет резюме в избранном<br />
        <span style="font-weight: normal; font-size: 14px"
          >Сохраняйте резюме, нажимая на звёздочку</span
        >
      </p>
    </div>
    <NuxtLink
      v-if="!my_favorite_resumes.length"
      class="create-button"
      :to="{ name: 'search-resumes' }"
      >Найти резюме</NuxtLink
    >
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useResumeStore } from "~/store/resume";
import Swal from "sweetalert2";

/**
 * Using Pinia store for managing favorite resumes
 */
const resumeStore = useResumeStore();
const { getMyFavoriteResumes } = resumeStore;
const { my_favorite_resumes, current_page } = storeToRefs(resumeStore);

/**
 * Reactive state
 */
const isLoading = ref(false);
const hasPreviousPage = computed(() => current_page.value > 1);
const hasNextPage = computed(() => my_favorite_resumes.value.length > 0);

/**
 * Fetch favorite resumes on component mount
 */
await useAsyncData("myFavoriteResumes", async () => {
  return await getMyFavoriteResumes({ page: current_page.value });
});

/**
 * Fetch function for favorite resumes
 */
const fetchFavorites = async (page = current_page.value) => {
  isLoading.value = true;
  try {
    return await getMyFavoriteResumes({ page });
  } finally {
    isLoading.value = false;
  }
};

/**
 * Pagination handlers
 */
const prevPage = async () => {
  if (!hasPreviousPage.value) return;
  await fetchFavorites(current_page.value - 1);
};

const nextPage = async () => {
  if (!hasNextPage.value) return;
  const res = await fetchFavorites(current_page.value + 1);
};
</script>

<style scoped></style>
