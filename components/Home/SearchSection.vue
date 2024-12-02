<template>
  <section class="search-section">
    <div class="wrapper">
      <div class="divided-box">
        <div class="divided-box-title">
          <h3 class="section-title">Поиск по отраслям</h3>
        </div>
        <div v-if="isLoading" class="position-relative">
          <BlockLoader />
        </div>
        <div v-else>
          <div class="divided-box-content">
            <div
              class="labels-list-box"
              :class="{ expanded: isMoreIndustries }"
            >
              <ul class="labels-list">
                <client-only>
                  <li v-for="item in industries" :key="item.id">
                    <NuxtLink
                      :to="{
                        name: 'search-vacancies',
                        query: { industries: `[${item.id}]` },
                      }"
                      class="label"
                      >{{ item.title }}
                    </NuxtLink>
                  </li>
                </client-only>
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
              <client-only>
                <li v-for="item in schedules">
                  <NuxtLink
                    class="label"
                    :to="{
                      name: 'search-vacancies',
                      query: { schedules: `[${item.id}]` },
                    }"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </client-only>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useVacancyStore } from "../../store/vacancy";
import { useDictionaryStore } from "~/store/dictionary";

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();
const { getSchedules } = dictionaryStore;

const schedules = computed(() => dictionaryStore.schedules);

onMounted(() => {
  getSchedules();
});

const isMoreIndustries = ref(false);
const industries = computed(() => {
  return vacancyStore.top_20_industries;
});
const toggleIndustries = () => {
  isMoreIndustries.value = !isMoreIndustries.value;
};

const { getIndustries } = useVacancyStore();
const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  await getIndustries();
  isLoading.value = false;
});
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
