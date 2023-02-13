<script setup>
import SearchSection from "../components/Home/SearchSection";
import WorkSection from "../components/Home/WorkSection";

definePageMeta({
  layout: "cabinet",
});
</script>
<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt">
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
          <YourResumesList></YourResumesList>
          <NuxtLink :to="{name: 'create-resume'}" class="create-button">Создать резюме</NuxtLink>
        </div>
      </div>
    </div>
    <div class="bg-wrapper bt">
      <HomeWorkSection></HomeWorkSection>
    </div>
    <HomeSearchSection></HomeSearchSection>
  </main>
</template>