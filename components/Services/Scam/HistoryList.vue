<script setup>

import {useNuxtApp} from "#app";
import {useScamStore} from "~/store/scam";

const props = defineProps({
  phones: {
    default: [],
    required: false
  },
  comments: {
    default: [],
    required: false
  },
  categories: {
    default: [],
    required: false
  },
});

const scamStore = useScamStore();
await scamStore.getHistory();

</script>

<template>
  <div class="subscribes-grid-container">
    <h3 class="subscribes-grid-container__title">История поиска</h3>
    <div class="subscribes-grid">
      <ServicesScamSearchHistoryItem v-for="item in scamStore.history_items" :phone="item" />
    </div>
  </div>
</template>

<style scoped>

</style>