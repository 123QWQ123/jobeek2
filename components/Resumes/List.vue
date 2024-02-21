<template>
  <!--      <PageLoader v-if="isLoading"/>-->
  <div class="content">
    <ClientOnly>
      <Suspense>
        <template #default>
          <AsyncList />
        </template>

        <template #fallback>
          <ResumesLoadingList />
        </template>
      </Suspense>
    </ClientOnly>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useVacancyStore } from "~/store/vacancy";
import { useVacancyForm } from "~/composables/useVacancyForm";
import Swal from "sweetalert2";

const AsyncList = defineAsyncComponent(() => import("./AsyncList.vue"));
const loadVacancyList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 100,
          provider: "hh",
          title: "Matt Maribojoc",
          company_logo:
            "https://cdn-images-1.medium.com/fit/c/100/100/2*EcZb9cndrhTF7_d74dv2Fg.png",
          bio: "I run a VueJS community over at https://learnvue.co, develop web sites, and post whatever I find cool on the Internet.",
        },
      ]);
    }, 10000);
  });
};

const vacancyStore = useVacancyStore();
const { getVacancies } = vacancyStore;
const { vacancies, current_page } = storeToRefs(vacancyStore);
const form = ref(useVacancyForm());

const params = useVacancyForm(form.value, "backend");
// const res = await getVacancies({...params});
const vacanciesItems = computed(async () => await loadVacancyList());

const loadMoreButton = ref();
const isLoading = ref(false);
const isMore = ref(false);

const route = useRoute();
// watch(vacancies, (newValues) => {
//   vacanciesItems.value = newValues;
//   if (newValues.length > 0){
//     isMore.value = true;
//   }
// })
const loadMore = async () => {
  isLoading.value = true;
  const params = useVacancyForm(form.value, "backend");
  const res = await getVacancies(
    { ...params, page: parseInt(current_page.value) + 1 },
    true,
  );
  console.log(res);
  if (res.items.length < 1) {
    isMore.value = false;
    Swal.fire({
      title: "Больше вакансий не найдено!",
      icon: "success",
    });
  }
  isLoading.value = false;

  loadMoreButton.value.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<style scoped></style>
