<template>
  <div class="content">
    <div>
      <ul class="favorites-list">
        <ResumesItem v-for="item in resumes" :key="item.id" :item="item" />
      </ul>

      <button
        ref="loadMoreButton"
        v-if="isMore"
        :disabled="isLoading"
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

const { current_page, resumes, total } = storeToRefs(resumeStore);

const loadMoreButton = ref();
const isLoading = ref(false);
const isMore = ref(false);

const { getQueryParam, getCurrentQueryParams } = useQueryParams();

const params = ref(getCurrentQueryParams() ?? {});
watch(
  () => getCurrentQueryParams(),
  (newParams) => {
    isLoading.value = true;
    params.value = newParams;
  },
);
onMounted(() => {
  if (resumes.value.length > 0) {
    isMore.value = true;
  }
});
watch(
  () => resumes.value,
  (newValues) => {
    isMore.value = newValues.length > 0;
  },
);
const loadMore = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  const res = await getResumes(
    { ...params.value, page: parseInt(current_page.value ?? 0) + 1 },
    true,
    false,
  );
  isLoading.value = false;
  if (res.length >= total - 1) {
    isMore.value = false;
    await Swal.fire({
      title: "Больше резюме не найдено!",
      icon: "success",
    });
  }
  // loadMoreButton.value.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<style scoped></style>
