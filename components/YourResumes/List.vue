<template>
  <div class="wrapper wrapper-1290">
    <h1 class="lk-page-title">Ваши резюме</h1>
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
        <YourResumesItem v-for="i in quantity" :key="i"></YourResumesItem>
      </ul>
      <NuxtLink class="create-button" type="link" :to="{name: 'create-resume'}" >Создать резюме</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "../BaseButton";
import YourResumes from "../../pages/your-resumes";

const quantity = ref(2);
</script>

<style scoped>

</style>