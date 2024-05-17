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
await scamStore.getHistory();

const isEmpty = computed(() => scamStore.history_items.length === 0);
</script>

<template>
  <div class="subscribes-grid-container">
    <h3 class="subscribes-grid-container__title">История поиска</h3>
    <div class="subscribes-grid">

        <Blur v-if="isEmpty"></Blur>
        <Blur v-if="isEmpty"></Blur>
        <Blur v-if="isEmpty"></Blur>

      <ServicesScamSearchHistoryItem
        v-for="item in scamStore.history_items"
        :phone="item"
      />
    </div>
  </div>
</template>

<style scoped></style>
