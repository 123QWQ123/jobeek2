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

    <div v-if="isLoading" class="position-relative">
      <BlockLoader />
    </div>
    <div v-else>
      <div class="swiper cards-slider-row">
        <div class="cards-slider">
          <VacancyTile
            v-for="item in vacancies"
            :key="item.id"
            :vacancy="item"
          />
        </div>
        <div v-if="!isLoading && vacancies.length === 0">
          <span class="text-danger">
            {{ noVacancyFoundMessage }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useVacancyStore } from "~/store/vacancy";
import { useAuthStore } from "~/store/auth";
import VacancyTile from "~/components/VacancyTile.vue";

const vacancyStore = useVacancyStore();
const isLoading = ref(false);
const noVacancyFoundMessage = ref(null);
const auth = computed(() => useAuthStore());
const vacancies = computed(() =>
  vacancyStore.vacancies_in_moscow.sort((a, b) => a.name.localeCompare(b.name)),
);

onMounted(async () => {
  try {
    isLoading.value = true;
    const resData = await vacancyStore.getVacanciesInMoscow();
    isLoading.value = false;

    if (resData.status !== "success") {
      noVacancyFoundMessage.value = resData.message;
    }
  } catch (error) {
    isLoading.value = false;
    noVacancyFoundMessage.value = "Ошибка при загрузке вакансий.";
  }
});
</script>

<style scoped>
.section-head .more {
  gap: 0.3rem;
}
</style>
