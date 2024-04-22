<template>
  <div class="subs-list-container">
    <ul class="subs-list">
      <YourSubscriptionsListItem></YourSubscriptionsListItem>
    </ul>
    <NuxtLink class="create-button" :to="{ name: 'create-subscription' }"
      >Создать подписку</NuxtLink
    >
  </div>
</template>

<script setup>

const quantity = ref(2);
</script>

<style scoped></style>
