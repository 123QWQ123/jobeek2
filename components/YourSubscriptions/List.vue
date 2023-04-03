<template>
  <div class="subs-list-container">
    <ul class="subs-list">
      <YourSubscriptionsListItem ></YourSubscriptionsListItem>
    </ul>
    <NuxtLink class="create-button" :to="{name: 'create-subscription'}">Создать подписку</NuxtLink>
  </div>
</template>

<script setup>
import BaseButton from "../BaseButton";
import YourSubscriptions from "../../pages/your-subscriptions";

const quantity = ref(2);
</script>

<style scoped>

</style>