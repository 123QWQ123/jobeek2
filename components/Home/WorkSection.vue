v
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
        <div v-if="isInitialized">
          <swiper
            :slides-per-view="'auto'"
            :space-between="20"
            :class="'cards-slider'"
            :wrapper-class="'cards-grid'"
          >
            <swiper-slide v-for="item in vacancies">
              <NuxtLink
                class="tile-card"
                :to="{
                  name: 'search-vacancies',
                  query: {
                    countries: [1],
                    regions: [22],
                    professional_roles: getProfessionalRoles(
                      item.professional_roles,
                    ),
                  },
                }"
              >
                <h4 class="tile-card-title">{{ item.name }}</h4>
                <span class="tile-card-dop-info" v-if="item.salary_to"
                  >До {{ vueNumberFormat(item.salary_to, {}) }} ₽ / месяц</span
                >
                <span v-else class="tile-card-dop-info"
                  >От {{ vueNumberFormat(item.salary_from, {}) }} ₽ /
                  месяц</span
                >
                <!--            <strong class="tile-card-count">2142 вакансии</strong>-->
              </NuxtLink>
            </swiper-slide>
          </swiper>
          <div v-if="!isLoading">
            <span class="text-danger">
              {{ noVacancyFoundMessage }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script async setup>
import { useVacancyStore } from "~/store/vacancy";
import { useAuthStore } from "~/store/auth.js";

const vacancyStore = useVacancyStore();
const { getVacanciesInMoscow } = vacancyStore;
const isLoading = ref(false);
const isInitialized = ref(false);
const noVacancyFoundMessage = ref(null);
const auth = storeToRefs(useAuthStore());
const vacancies = computed(() => vacancyStore.vacancies_in_moscow);

onMounted(async () => {
  isLoading.value = true;
  const resData = await getVacanciesInMoscow();
  isLoading.value = false;
  isInitialized.value = true;
  if (resData.status !== "success") {
    noVacancyFoundMessage.value = resData.message;
    return;
  }
  const TIMEOUT = 500;
  if (vacancies.value.length > 0) {
    setTimeout(() => {
      isInitialized.value = true;
    }, TIMEOUT);
  }
});
const getProfessionalRoles = (objectData) => {
  if (objectData) return Object.keys(objectData);
  return [];
};
</script>
<style scoped>
.section-head .more {
  gap: 0.3rem;
}
</style>
