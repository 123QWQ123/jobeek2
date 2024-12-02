<template>
  <section class="vacancy-section section wrapper">
    <div class="section-head">
      <h2 class="section-title">Вакансии в вашем городе</h2>

      <NuxtLink
        class="more"
        :to="{
          name: auth.isEmployer ? 'search-vacancies' : 'search-resumes',
          query: { countries: `[${1}]`, regions: `[${22}]` },
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

    <div>
      <div>
        <div class="cards-slider">
          <div class="vacancy-list">
            <div v-for="item in vacancies_in_my_city">
              <div class="vacancy-card">
                <nuxt-link
                  :to="{
                    name: 'vacancies-slug',
                    params: { slug: item.id },
                    query: { provider: item.provider },
                  }"
                  class="vacancy-card-body"
                >
                  <div class="company">
                    <div class="company-logo">
                      <img
                        class="h-100 w-100"
                        :src="logo(item)"
                        :alt="item.name"
                      />
                    </div>
                    <div class="company-name">
                      <strong>{{ item.company }}</strong>
                      <span class="location">{{ item.city }}</span>
                    </div>
                  </div>
                  <span class="vacancy-card-title">{{ item.name }} </span>
                  <span class="vacancy-card-dop-info" v-if="item.salary_from"
                    >От {{ $format_number(item.salary_from) }} ₽</span
                  >
                  <span class="vacancy-card-dop-info" v-else
                    >До {{ $format_number(item.salary_to) }} ₽</span
                  >
                </nuxt-link>
                <div class="vacancy-card-footer">
                  <a class="btn button-md" href="#">Откликнуться</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useNuxtApp } from "#app";
import { useAuthStore } from "~/store/auth.js";

const auth = storeToRefs(useAuthStore());
const { $format_number } = useNuxtApp();
const vacancyStore = useVacancyStore();
const { vacancies_in_my_city } = storeToRefs(useVacancyStore());
/**
 * Get logo url
 * @param item Object
 * @returns {module:url.URL}
 */
const logo = (item) =>
  item.logo ||
  new URL(`/assets/img/logos/${item.provider}.svg`, import.meta.url);
</script>
