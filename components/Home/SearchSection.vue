<template>
  <section class="search-section">
    <div class="wrapper">
      <div class="divided-box">
        <div class="divided-box-title">
          <h3 class="section-title">Поиск по отраслям</h3>
        </div>
        <div class="divided-box-content">
          <div class="labels-list-box" :class="{expanded: isMoreIndustries}">
            <ul class="labels-list">
              <li v-for="item in industries">
                <NuxtLink :to="{name: 'search-vacancies', query: {industries: [item.id]}}" class="label" >{{ item.title }}</NuxtLink>
              </li>
            </ul>
          </div>
          <button class="more more--down" v-if="!isMoreIndustries" @click="toggleIndustries">
            Показать еще
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
              <path d="M19.75 12.2256L4.75 12.2256" stroke="#5375FD" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.7002 6.20124L19.7502 12.2252L13.7002 18.2502" stroke="#5375FD"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="more more--up" v-else @click="toggleIndustries">
            Скрыть
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
              <path d="M19.75 12.2256L4.75 12.2256" stroke="#5375FD" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.7002 6.20124L19.7502 12.2252L13.7002 18.2502" stroke="#5375FD"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div class="divided-box">
        <div class="divided-box-title">
          <h3 class="section-title">Поиск по графику</h3>
        </div>
        <div class="divided-box-content">
          <div class="labels-list-box">
            <ul class="labels-list">
              <li> <a class="label" href="#">Вахтой</a></li>
              <li> <a class="label" href="#">1 через 3</a></li>
              <li> <a class="label" href="#">1 через 2</a></li>
              <li> <a class="label" href="#">1 через 1 </a></li>
              <li> <a class="label" href="#">1 через 10</a></li>
              <li> <a class="label" href="#">Удаленка</a></li>
              <li> <a class="label" href="#">Ночью</a></li>
              <li> <a class="label" href="#">Сменный график </a></li>
              <li> <a class="label" href="#">1 через 1</a></li>
              <li> <a class="label" href="#">1 через 10 </a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";

const industries = ref([]);

const isMoreIndustries = ref(false);
const toggleIndustries = () => {
  isMoreIndustries.value = !isMoreIndustries.value;
};
// const onIndustryClick = () => {
//   isMoreIndustries.value = !isMoreIndustries.value;
// };

const {getIndustries} = useVacancyStore();

onMounted(async () =>{
  const items = await getIndustries();

  industries.value = items.filter(item => item.parent_id === null);
})

</script>

<style scoped>
.labels-list-box{
  height: 50vh;
  overflow: hidden;
}
.labels-list-box.expanded{
  height: auto;
  overflow: visible;
}
</style>