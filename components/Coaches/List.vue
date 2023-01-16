
<script setup>
import { storeToRefs } from "pinia";
import { useCoachStore } from "~~/store/coach";
const store = useCoachStore();

const { hasCoaches } = storeToRefs(store);

const coaches = computed(() => {
  return store.items;
});
</script>

<template>
  <div class="row justify-content-center" v-if="hasCoaches">
    <coaches-item
      v-for="item in coaches"
      :key="item.id"
      :id="item.userId"
      :first_name="item.first_name"
      :last_name="item.last_name"
      :photo="item.photo"
      :description="item.description"
      :tags="item.tags ?? []"
      :field="item.field"
      :email="item.email"
    ></coaches-item>
  </div>
  <div v-else class="no-item-found">No coaches found</div>
</template>
