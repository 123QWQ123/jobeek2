<template>
  <section class="search-section">
    <div class="wrapper">
      <div class="divided-box">
        <div class="divided-box-title">
          <h3 class="section-title">Поиск по отраслям</h3>
        </div>
        <div>
          <div class="divided-box-content">
            <div
              class="labels-list-box"
              :class="{ expanded: isMoreIndustries }"
            >
              <ul class="labels-list">
                <li v-for="item in top_20_industries" :key="item.id">
                  <NuxtLink
                    :to="{
                      name: isEmployer ? 'search-vacancies' : 'search-resumes',
                      query: { industries: `[${item.id}]` },
                    }"
                    class="label"
                    >{{ item.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <button
              class="more more--down"
              v-if="!isMoreIndustries"
              @click="toggleIndustries"
            >
              Показать еще
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
            </button>
            <button class="more more--up" v-else @click="toggleIndustries">
              Скрыть
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
            </button>
          </div>
        </div>
      </div>
      <div class="divided-box">
        <div class="divided-box-title">
          <h3 class="section-title">Поиск по графику</h3>
        </div>
        <div class="divided-box-content">
          <div class="labels-list-box">
            <ul class="labels-list">
              <li v-for="item in schedules">
                <NuxtLink
                  class="label"
                  :to="{
                    name: isEmployer ? 'search-vacancies' : 'search-resumes',
                    query: { schedules: `[${item.id}]` },
                  }"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy.js";
import { useDictionaryStore } from "~/store/dictionary.js";
import { useAuthStore } from "~/store/auth.js";
import { useAsyncData } from "#app";

const { getIndustries } = useVacancyStore();
const { getSchedules } = useDictionaryStore();
const { top_20_industries } = storeToRefs(useVacancyStore());
const { schedules } = storeToRefs(useDictionaryStore());
const { isEmployer } = storeToRefs(useAuthStore());
const isMoreIndustries = ref(false);

useAsyncData("industries", async () => {
  return await getIndustries();
});
useAsyncData("schedules", async () => {
  return await getSchedules();
});
const toggleIndustries = () =>
  (isMoreIndustries.value = !isMoreIndustries.value);
</script>

<style scoped>
.labels-list-box {
  height: auto;
  max-height: 20vh;
  overflow: hidden;
}

.labels-list-box.expanded {
  height: auto;
  max-height: unset;
  overflow: visible;
}
</style>
