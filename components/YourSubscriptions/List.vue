<template>
  <div class="subs-list-container">
    <div v-if="!notifications || !notifications.length" class="no-results">
      Нет результатов
    </div>
    <ul class="subs-list">
      <YourSubscriptionsListItem
        v-for="notification in notifications || []"
        :key="notification.id"
        :notification="notification"
      ></YourSubscriptionsListItem>
    </ul>
    <NuxtLink class="create-button" :to="{ name: 'subscriptions-create' }"
      >Создать подписку</NuxtLink
    >
  </div>
</template>

<script setup>
import useApi from "~/hooks/useApi.js";

const { data: notifications } = useAsyncData("subscription", async () => {
  const {
    data: { data, status },
  } = await useApi("seeker/subscription", {
    method: "get",
  });

  return data;
});
</script>

<style scoped></style>
