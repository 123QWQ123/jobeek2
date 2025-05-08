<script setup>
import { useAuthStore } from "~/store/auth.js";
const authStore = useAuthStore();
</script>

<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt-4">
      <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
        <div class="content mb-4">
          <h1 class="lk-page-title mb-4">Ваши подписки</h1>
          <YourSubscriptionsList></YourSubscriptionsList>
        </div>
        <aside class="sidebar">
          <div class="lk-page-title mb-4 mb-0 margin-top-mobile">Премиум</div>
            <!-- NEW block -->
            <div class="sticky-item sidebar-premium">
            	<div class="notification mt-0">
            		<div class="ic"><img src="~/assets/img/svg/crown2.svg" alt="#" /></div>
            		<div class="notification-text">
            			<strong class="title">Подключите премиум</strong>
            			<p> У вас есть лимит на создание вакансий: 1 шт. Чтобы создавать неограниченное количество вакансий, подключите премиум-подписку. </p>
            			<a class="btn btn-primary mt-3" href="#">Подключить</a>
            		</div>
            	</div>
            </div>
            <!-- END NEW block -->
        </aside>
      </div>
    </div>
    <div class="bg-wrapper bt">
      <HomeWorkSection />
    </div>
    <HomeSearchSection />
  </main>
</template>

<style scoped></style>
