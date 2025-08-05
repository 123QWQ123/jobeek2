<template>
  <main class="main cabinet vacansy-page" role="main">
    <div class="bg-wrapper pt">
      <div class="main-section main-section-mob">
        <div class="wrapper wrapper--xl">
          <SearchForm></SearchForm>
        </div>
      </div>
      <div class="wrapper wrapper-1290" v-if="resumeData">
        <ResumesSingleContent :item="resumeData" />
      </div>
      <!--      <VacanciesSingleResumeListSelectModal :open="isOpen" />-->
    </div>
  </main>
</template>

<script setup>
import { useResumeStore } from "~/store/resume.js";
import { storeToRefs } from "pinia";

const route = useRoute();
const resumeStore = useResumeStore();
const { getSingleResume } = resumeStore;
const { resume } = storeToRefs(resumeStore);

const { slug } = route.params;
const { provider } = route.query;
const { data: resumeData } = useAsyncData(
  "resumeData",
  async () => await getSingleResume(slug, { provider }),
);
const pageTitle = computed(() => resume[provider]?.name + " - Jobeek");
console.log(resume.value, "resume.value");
console.log(resumeData.value, "resumeData.value");
useHead({
  title: pageTitle.value ?? "Loading",
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
