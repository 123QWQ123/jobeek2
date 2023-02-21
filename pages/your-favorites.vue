<script setup>
definePageMeta({
  layout: "cabinet",
});

const hasFavs = ref(true);
</script>
<template>
  <main class="main cabinet subs-page" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <YourFavoritesList></YourFavoritesList>

        <div class="notification no-ic-bg">
          <div class="notification-text">
            <strong class="title">У вас пока нет вакансий в избранном</strong>
            <p>Сохраняйте вакансии, нажимая на звёздочку</p>
          </div>
          <a class="notification-button button-accent" href="#"
          >Найти вакансию
          </a>
        </div>
        <h2 class="lk-page-title">
          Вакансии, которые могут вас заинтересовать
        </h2>
        <YourFavoritesVacancies></YourFavoritesVacancies>
      </div>
    </div>
    <div class="bg-wrapper bt">
      <HomeWorkSection></HomeWorkSection>
    </div>
    <HomeSearchSection></HomeSearchSection>
  </main>
</template>