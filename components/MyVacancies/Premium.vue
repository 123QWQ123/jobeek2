<template>
  <div class="lk-page-title mb-4 mb-0 margin-top-mobile">Премиум</div>

  <!-- NEW block -->
  <div class="sticky-item sidebar-premium">
    <div
      class="notification mt-0"
      :class="{ active: isSubscribed }"
      @click.prevent="onClickConnect"
    >
      <div class="notification-text">
        <div class="premium-notification-icon"></div>
        <strong class="title">Премиум</strong>
        <div v-if="isSubscribed" class="plash">Подключен</div>
        <div v-else class="plash">Не подключен</div>
        <div class="premium-checker">
          <input
            type="checkbox"
            id="employer"
            :checked="isSubscribed"
            disabled
          />
          <div class="premium-checker-ui">
            <div class="circle left"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth.js";

const authStore = useAuthStore();
const { getSubPremiumUrl, getUnsubPremiumUrl } = authStore;
const { sub_premium_url, unsub_premium_url, isSubscribed } =
  storeToRefs(authStore);

useAsyncData("premiumUrl", async () => {
  await getSubPremiumUrl();
  await getUnsubPremiumUrl();
});

const onClickConnect = () => {
  if (!isSubscribed.value) {
    window.open(sub_premium_url.value, "_blank");
  } else {
    window.open(unsub_premium_url.value, "_blank");
  }
};
</script>
