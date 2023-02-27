<template>
  <div class="wrapper wrapper-1290">
    <h1 class="lk-page-title">Ваши вакансии</h1>
    <div class="notification">
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
    <div class="resume-list-container">
      <ul class="resume-list">
        <YourVacanciesItem v-for="i in quantity" :key="i"></YourVacanciesItem>
      </ul>
      <NuxtLink class="create-button" type="link" :to="{name: 'create-vacancy'}" >Создать вакансию</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const quantity = ref(2);
</script>

<style scoped>

</style>