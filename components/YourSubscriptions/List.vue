<template>
  <div class="subs-list-container">
    <ul class="subs-list">
      <YourSubscriptionsListItem
        v-for="notification in notifications"
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

const notifications = ref([]);
onBeforeMount(async () => {
  const {
    data: { data, status },
  } = await useApi("seeker/subscription", {
    method: "get",
  });

  if (status === "success") {
    notifications.value = data;
  }
});
</script>

<style scoped></style>
