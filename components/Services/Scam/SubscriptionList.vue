<script setup>
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
await scamStore.getSubscribedPhones();

</script>

<template>
  <div>
    <h2 class="search-history-sidebar__title">Подписки</h2>
    <ServicesScamSubscriptionItem v-for="item in scamStore.subscribed_items" :phone="item"/>
  </div>
</template>

<style scoped>

</style>