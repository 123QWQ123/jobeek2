<template>
  <div class="content">
    <div>
      <ul class="favorites-list">
        <ResumesItem v-for="item in resumes" :key="item.id" :item="item" />
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
import Swal from "sweetalert2";
import useQueryParams from "~/composables/useQueryParams.js";
import { useResumeStore } from "~/store/resume.js";

const resumeStore = useResumeStore();
const { getResumes } = resumeStore;

const { resumes, current_page } = storeToRefs(resumeStore);

const loadMoreButton = ref();
const isLoading = ref(false);
const isMore = ref(false);

const { getQueryParam, getCurrentQueryParams } = useQueryParams();
const current_params = getCurrentQueryParams("back") ?? {};
console.log(current_params);
await getResumes({ ...current_params });

const params = ref(current_params);
watch(
  () => getCurrentQueryParams(),
  (newParams) => {
    isLoading.value = true;
    params.value = newParams;
  },
);
const route = useRoute();
onMounted(() => {
  if (resumes.value.length > 0) {
    isMore.value = true;
  }
});
watch(resumes, (newValues) => {
  if (newValues.length > 0) {
    isMore.value = true;
  }
});
const loadMore = async () => {
  isLoading.value = true;
  const res = await getResumes(
    { ...params, page: parseInt(current_page.value) + 1 },
    true,
  );
  if (res.length < 1) {
    isMore.value = false;
    Swal.fire({
      title: "Больше резюме не найдено!",
      icon: "success",
    });
  }
  isLoading.value = false;

  loadMoreButton.value.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<style scoped></style>
