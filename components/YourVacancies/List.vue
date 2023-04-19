<template>
  <div class="wrapper wrapper-1290">
      <NuxtLink class="create-button" type="link" :to="{name: 'create-vacancy'}" >Создать вакансию</NuxtLink>
      <div class="notification mt-4">
        <div class="ic">
          <img src="~/assets/img/svg/crown2.svg" alt="#" />
        </div>
        <div class="notification-text">
          <strong class="title">Подключите премиум</strong>
          <p>
            У вас стоит лимит на создание подписок: 3 шт. Чтобы создавать
            неограниченное кол-во подписок, подключите премиум
          </p>
        </div>
        <a class="notification-button button-accent" href="#">Подключить </a>

      </div>
      <h1 class="lk-page-title">Ваши вакансии</h1>
      <div class="resume-list-container">
        <ul class="resume-list">
          <YourVacanciesItem v-for="item in my_vacancies" :key="item.id" :item="item"></YourVacanciesItem>
        </ul>

          <div class="d-flex mt-4 justify-content-between">
              <button class="btn btn-primary btn-group-sm">Prev</button>
              <button class="btn btn-primary btn-group-sm">Next</button>
          </div>
      </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";
import {storeToRefs} from "pinia";
import Paginate from "vuejs-paginate-next";

const vacancyStore = useVacancyStore();
const {getMyVacancies} = vacancyStore;

const {my_vacancies} = storeToRefs(vacancyStore);

const vacancies = ref([]);
onMounted(async() => {
    await getMyVacancies();
})

watch(() => vacancyStore.my_vacancies, (newMyVacancies) => {
    vacancies.value = newMyVacancies;
})



</script>

<style scoped>

</style>