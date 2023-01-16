<script setup>
import { useRequestStore } from "~~/store/request";

const requestStore = useRequestStore();

const hasRequests = computed(() => requestStore.hasRequests);
const requests = computed(() => requestStore.items);
</script>

<template>
  <div class="row" v-if="hasRequests">
    <requests-item
      v-for="item in requests"
      :key="item.id"
      :name="item.name"
      :title="item.title"
      :description="item.description"
      :email="item.email"
    ></requests-item>
  </div>
  <div v-else class="no-item-found">No requests found</div>
</template>
