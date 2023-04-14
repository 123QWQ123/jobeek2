v<template>
  <section class="work-section section wrapper">
    <div class="section-head">
      <h2 class="section-title"> Работа и вакансии в Москве</h2>
      <NuxtLink class="more" :to="{name: 'search-vacancies', query: {countries: [1], regions: [22]}}">
        Все <span> вакансии </span>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
          <path d="M19.75 12.2256L4.75 12.2256" stroke="#5375FD" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.7002 6.20124L19.7502 12.2252L13.7002 18.2502" stroke="#5375FD"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </NuxtLink>
    </div>
    <div class="swiper cards-slider-row">
      <ul class="cards-grid swiper-wrapper">
        <li class="swiper-slide" v-for="item in vacancies">
          <NuxtLink class="tile-card" :to="{name: 'search-vacancies', query: {countries: [1], regions: [22], professional_roles: [item.professional_role_id ?? 2]} }">
            <h4 class="tile-card-title">{{ item.name }}</h4>
            <span class="tile-card-dop-info">До {{vueNumberFormat(item.salary_to, {})}} ₽ / месяц</span>
<!--            <strong class="tile-card-count">2142 вакансии</strong>-->
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useVacancyStore} from "../../store/vacancy";
const vacancyStore = useVacancyStore();
const {getVacancies} = vacancyStore;
await getVacancies({countries: [1], region_ids: [22]});
const {top_10_vacancies: vacancies} = storeToRefs(vacancyStore);

</script>
<style scoped>
.section-head .more{
  gap: 0.3rem;
}
</style>