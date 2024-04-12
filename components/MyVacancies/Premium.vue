<template>
  <div class="premium-col sticky-item">
    <div class="title" v-if="authStore.isSubscribed">Премиум</div>
    <div class="title" v-else>Подключите Премиум подписку</div>
    <!--    <div class="term" v-if="authStore.isSubscribed">-->
    <!--      <span>Действует до</span><strong>24 августа 2024</strong>-->
    <!--    </div>-->
    <a class="btn button-xs" href="#" v-if="authStore.isSubscribed"
      >Отключить
    </a>
    <a
      v-else
      class="notification-button button-accent"
      @click.prevent="onClickConnect"
      >Подключить
    </a>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth.js";

const authStore = useAuthStore();
const { getPremium, getPremiumUrl } = authStore;
const premiumUrl = await getPremiumUrl();
const premium = await getPremium();

const onClickConnect = () => {
  console.log(authStore.premium_url);
  window.open(authStore.premium_url);
};
</script>

<style scoped>
.vacancy_tabs .nav-link {
  padding: 0.8rem 2rem 0.5rem 2rem;
}

.theme-checker input ~ .theme-checker-ui .circle.left {
  transform: translate(3px, -50%);
}

.theme-checker input ~ .theme-checker-ui .circle.right {
  transform: translate(30px, -50%);
}
</style>
