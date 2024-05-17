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
const isEmpty = computed(() => scamStore.subscribed_items.length === 0);
</script>

<template>
  <div>
    <h2 class="search-history-sidebar__title">Подписки</h2>
    <span v-if="isEmpty">
      <div class="favorites-card favorites-card--min">
        <p class="no-favorites-txt">Вы еще не подписались ни на один из номеров</p>
      </div>
      <Blur></Blur>
    </span>

  </div>
  <div class="subscribes-grid">
    <ServicesScamSubscriptionItem v-for="item in scamStore.subscribed_items" :phone="item"/>
  </div>
</template>

<style scoped>

</style>