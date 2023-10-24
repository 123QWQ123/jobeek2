<script setup>

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

const phone = computed(() => props.phone.number);
const address = computed(() => props.phone.address ?? "нет адреса");
const comments = computed(() => props.phone.comments ?? []);
</script>

<template>
  <div class="search-result-content">
    <h2 class="search-result-content__title">Найдено номеров: {{phones.length}}</h2>
    <ServicesScamPhoneCard v-for="item in phones" :phone="item" />
  </div>
</template>

<style scoped>

</style>