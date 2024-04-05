<template>
  <section class="vacancy-section section wrapper">
    <div class="section-head">
      <h2 class="section-title">Вакансии в вашем городе</h2>

      <NuxtLink
        class="more"
        :to="{
          name: 'search-vacancies',
          query: { countries: [1], regions: [22] },
        }"
      >
        Все <span class="ms-1"> вакансии </span>
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
      <swiper
        :slides-per-view="'auto'"
        :space-between="20"
        :class="'cards-slider'"
        :wrapper-class="'vacancy-list'"
      >
        <swiper-slide v-for="item in vacancies">
          <div class="vacancy-card">
            <div class="vacancy-card-body">
              <div class="company">
                <div class="company-logo">
                  <img src="~/assets/img/logos/megafon.svg" alt="#" />
                </div>
                <div class="company-name">
                  <strong>{{ item.company }}</strong>
                  <span class="location">{{ item.city }}</span>
                </div>
              </div>
              <nuxt-link
                :to="{
                  name: 'vacancies-slug',
                  params: { slug: item.id },
                  query: { provider: item.provider },
                }"
                class="vacancy-card-title"
                >{{ item.name }}
              </nuxt-link>
              <span class="vacancy-card-dop-info" v-if="item.salary_from"
                >От {{ $format_number(item.salary_from) }} ₽</span
              >
              <span class="vacancy-card-dop-info" v-else
                >До {{ $format_number(item.salary_to) }} ₽</span
              >
            </div>
            <div class="vacancy-card-footer">
              <a class="btn button-md" href="#">Откликнуться</a>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useAreaStore } from "~/store/area";
import { useNuxtApp } from "#app";

const { $format_number } = useNuxtApp();
const vacancyStore = useVacancyStore();
const areaStore = useAreaStore();

const { getCurrencyCityVacancies } = vacancyStore;
const { getLocation } = areaStore;
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const location = await getLocation({ ip: "213.232.228.45" });
  await getCurrencyCityVacancies({
    countries: [location?.country?.id],
    region_ids: [location?.region?.id],
    city_id: location?.city?.id,
  });
  isLoading.value = false;
});
const vacancies = computed(() => vacancyStore.vacancies_in_my_city.sort());
</script>
