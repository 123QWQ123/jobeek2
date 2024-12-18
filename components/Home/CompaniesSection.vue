<template>
  <section
    v-if="vacancies_in_top_companies.length > 0"
    class="companies-section section wrapper"
  >
    <div class="section-head">
      <h2 class="section-title">Работайте у лучших</h2>
    </div>

    <!--- skeleton place section-->
    <ul v-if="isLoading" class="companies-list skeleton-hover">
      <li>
        <div class="company company-card">
          <div class="company-logo"><span class="pu-skeleton">‌</span></div>
          <div class="company-name"><span class="pu-skeleton">‌</span></div>
        </div>
      </li>
      <li>
        <div class="company company-card">
          <div class="company-logo"><span class="pu-skeleton">‌</span></div>
          <div class="company-name"><span class="pu-skeleton">‌</span></div>
        </div>
      </li>
      <li>
        <div class="company company-card">
          <div class="company-logo"><span class="pu-skeleton">‌</span></div>
          <div class="company-name"><span class="pu-skeleton">‌</span></div>
        </div>
      </li>
      <li>
        <div class="company company-card">
          <div class="company-logo"><span class="pu-skeleton">‌</span></div>
          <div class="company-name"><span class="pu-skeleton">‌</span></div>
        </div>
      </li>
    </ul>
    <!--- END skeleton place section-->

    <ul v-else class="companies-list">
      <li v-for="vacancy in vacancies_in_top_companies" :key="vacancy.id">
        <nuxt-link
          class="company company-card"
          :to="{
            name: 'search-vacancies',
            query: { search: vacancy.name },
          }"
        >
          <div class="company-logo">
            <img :src="vacancy.logo" alt="#" />
          </div>
          <div class="company-name">
            <strong>{{ vacancy.name }}</strong
            ><span class="count">{{ vacancy.open_vacancies }} вакансии</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
<script setup>
import { useVacancyStore } from "~/store/vacancy.js";
import { useAsyncData } from "#app";

const { vacancies_in_top_companies } = storeToRefs(useVacancyStore());
const { getVacanciesInTopCompanies } = useVacancyStore();
const isLoading = ref(false);

useAsyncData("vacanciesInTopCompanies", async () => {
  isLoading.value = true;
  const data = await getVacanciesInTopCompanies();
  isLoading.value = false;
  return data;
});
</script>

<style scoped>
.companies-list.skeleton-hover .company-logo .pu-skeleton {
  height: 100% !important;
}
.companies-list.skeleton-hover .company-name {
  width: 100% !important;
}
.companies-list.skeleton-hover .company-card:hover {
  border-color: #ececec !important;
}
</style>
