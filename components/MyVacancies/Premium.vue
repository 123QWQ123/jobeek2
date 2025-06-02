<template>
  <div class="lk-page-title mb-4 mb-0 margin-top-mobile">Премиум</div>
  
  <!-- NEW block -->
  <div class="sticky-item sidebar-premium">
  	<div class="notification mt-0">
  	  <div class="notification-text">
  	    <div class="premium-notification-icon"></div>
  	    <strong class="title">Премиум</strong>
        <div class="plash">Не подключен</div>
        <div class="theme-checker">
          <input type="checkbox" id="employer">
          <div class="theme-checker-ui">
            <div class="circle left"></div>
          </div>
        </div>
      </div>
    </div>
  	<div class="notification mt-0 active">
  	  <div class="notification-text">
  	    <div class="premium-notification-icon"></div>
  	    <strong class="title">Премиум</strong>
        <div class="plash">Подключен</div>
        <div class="theme-checker">
          <input type="checkbox" id="employer">
          <div class="theme-checker-ui">
            <div class="circle left"></div>
          </div>
        </div>
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
