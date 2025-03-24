<template>
  <div class="lk-page-title mb-4 mb-0 margin-top-mobile">Премиум</div>
  <div class="premium-col sticky-item">
    <div class="title" v-if="authStore.isSubscribed"><span>Действует до</span><strong>24 августа 2025</strong></div>
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
  </div>
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
