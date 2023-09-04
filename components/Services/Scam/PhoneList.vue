<script setup>

import {useNuxtApp} from "#app";

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

const {$format_phone} = useNuxtApp();
const phone = computed(() => props.phone.number);
const address = computed(() => props.phone.address ?? "нет адреса");
const operator = computed(() => props.phone.operator);
const typePhone = computed(() => props.phone.type_phone);
const link_map = computed(() => `https://www.google.ru/maps/search/` + props.phone.address );
const comments = computed(() => props.phone.comments ?? []);
const categories = computed(() => props.phone.categories);
const frequencyValue = computed(() => props.phone.frequency_call.cost);
const frequencyTitle = computed(() => props.phone.frequency_call.title);
const ratingValue = computed(() => props.phone.rating.cost);
const ratingTitle = computed(() => props.phone.rating.title);
</script>

<template>
  <div class="search-result-content">
    <h2 class="search-result-content__title">Найдено номеров: {{phones.length}}</h2>
    <ServicesScamPhoneCard v-for="item in phones" :phone="item" />
  </div>
</template>

<style scoped>

</style>