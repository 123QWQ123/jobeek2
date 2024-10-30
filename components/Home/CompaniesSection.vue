<template>
  <section
    v-if="topVacancies.length > 0"
    class="companies-section section wrapper"
  >
    <div class="section-head">
      <h2 class="section-title">Работайте у лучших</h2>
    </div>
    <ul class="companies-list">
      <li v-for="vacancy in topVacancies" :key="vacancy.id">
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

const { getVacanciesInTopCompanies } = useVacancyStore();
const topVacancies = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  topVacancies.value = await getVacanciesInTopCompanies();
  isLoading.value = false;
});
</script>
