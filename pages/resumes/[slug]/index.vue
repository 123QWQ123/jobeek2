<template>
  <main class="main cabinet vacansy-page" role="main">
    <div class="bg-wrapper pt">
      <div class="main-section main-section-mob">
        <div class="wrapper wrapper--xl">
          <SearchForm></SearchForm>
        </div>
      </div>
      <div class="wrapper wrapper-1290" v-if="resume">
        <ResumesSingleContent :data="resume[provider]" />
        <h2 class="lk-page-title">Похожие резюме</h2>
        <div class="favorites-list-container">
          <VacanciesSingleLikeList></VacanciesSingleLikeList>
        </div>
      </div>
      <!--      <VacanciesSingleResumeListSelectModal :open="isOpen" />-->
    </div>
  </main>
</template>

<script setup>
import { useResumeStore } from "~/store/resume.js";
import { storeToRefs } from "pinia";

const pageTitle = computed(() => resume[provider]?.name + " - Jobeek");

useHead({
  title: pageTitle.value ?? "Loading",
});

const route = useRoute();
const resumeStore = useResumeStore();
const { getResume } = resumeStore;
const { resume } = storeToRefs(resumeStore);

const { slug } = route.params;
const { provider } = route.query;
onMounted(async () => {
  const resumeData = await getResume(slug, { provider });
});
// if (
//   !vacancyData.hasOwnProperty("hh") &&
//   !vacancyData.hasOwnProperty("superjob")
// ) {
//   navigateTo({ name: "404" });
// }
</script>

<style scoped>
.progress {
  background: none;
}
</style>
