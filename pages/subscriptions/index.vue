<script setup>

</script>

<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt-4">
      <div class="wrapper wrapper-1290">
        <h1 class="lk-page-title mb-4">Ваши подписки</h1>
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
        <YourSubscriptionsList></YourSubscriptionsList>
      </div>
    </div>
    <div class="bg-wrapper bt">
      <HomeWorkSection />
    </div>
    <HomeSearchSection />
  </main>
</template>


<style scoped>
</style>