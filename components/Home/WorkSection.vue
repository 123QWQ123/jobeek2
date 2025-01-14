<template>
  <section class="work-section section wrapper">
    <div class="section-head">
      <h2 class="section-title">Работа и вакансии в Москве</h2>
      <NuxtLink
        class="more"
        :to="{
          name: auth.isEmployer ? 'search-vacancies' : 'search-resumes',
          query: { countries: `[${1}]`, regions: `[${22}]` },
        }"
      >
        Все <span> вакансии </span>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.75 12.2256L4.75 12.2256"
            stroke="#5375FD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.7002 6.20124L19.7502 12.2252L13.7002 18.2502"
            stroke="#5375FD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </NuxtLink>
    </div>

    <!--- skeleton place section-->
    <HomeSkeletonsWork v-if="isLoading" />
    <!--- END skeleton place section-->

    <div v-if="!isLoading">
      <div class="swiper cards-slider-row">
        <div class="cards-slider cards-grid">
          <VacancyTile
            v-for="item in vacancies_in_moscow"
            :key="item.id"
            :vacancy="item"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useAuthStore } from "~/store/auth";
import { useAsyncData } from "#app";

const { getVacanciesInMoscow } = useVacancyStore();
const { vacancies_in_moscow } = storeToRefs(useVacancyStore());
const auth = storeToRefs(useAuthStore());
const isLoading = ref(false);

useAsyncData("vacanciesInMoscow", async () => {
  isLoading.value = true;
  const data = await getVacanciesInMoscow();
  isLoading.value = false;
  return data;
});
</script>

<style scoped>
.section-head .more {
  gap: 0.3rem;
}
.skeleton-hover .tile-card:hover {
  border-color: #ececec !important;
}
</style>
