<template>
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
  
  <!-- <div class="premium-col sticky-item">
    <div class="term" v-if="authStore.isSubscribed"><span>Действует до</span><strong>24 августа 2025</strong></div>
    <div class="title" v-else>Подключите премиум подписку</div>
    <a class="btn button-xs" href="#" v-if="authStore.isSubscribed"
      >Отключить
    </a>
    <a
      v-else
      class="notification-button button-accent"
      @click.prevent="onClickConnect"
      >Подключить
    </a>
  </div>-->
</template>

<script setup>
import { useAuthStore } from "~/store/auth.js";

const authStore = useAuthStore();
const { getPremium, getPremiumUrl } = authStore;

onMounted(async () => {
  const premium = await getPremium();
  const premiumUrl = await getPremiumUrl();
});

const onClickConnect = () => {
  window.open(authStore.premium_url);
};
</script>
