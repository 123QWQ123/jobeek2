<script setup>
import { useScamStore } from "~/store/scam";

const props = defineProps({
  phones: {
    default: [],
    required: false,
  },
  comments: {
    default: [],
    required: false,
  },
  categories: {
    default: [],
    required: false,
  },
});

const scamStore = useScamStore();
await scamStore.getSubscribedPhones();
const isEmpty = computed(() => scamStore.subscribed_items.length === 0);
</script>

<template>
  <div>
    <h2 class="search-history-sidebar__title">Подписки</h2>
  </div>
  <div>
    <div v-if="isEmpty" class="no-results">Нет результатов</div>
    <ServicesScamSubscriptionItem
      v-else
      v-for="item in scamStore.subscribed_items"
      :phone="item"
    />
  </div>
</template>

<style scoped></style>
