<template>
  <div class="search-result-content">
    <h2 class="search-result-content__title">
      Найдено номеров: {{ phones.length }}
    </h2>
    <div v-if="isEmpty" class="no-results">Нет результатов</div>

    <ServicesScamPhoneCard v-for="item in phones" :phone="item" />
  </div>
</template>

<script setup>
const props = defineProps({
  getPhones: {
    required: true,
  },
  phones: {
    required: true,
    default: [],
  },
});

const phones = computed(() => props.phones);
const isEmpty = phones.value.length === 0;
const isLoading = ref(false);
const isMore = ref(false);

const route = useRoute();
onMounted(() => {
  if (phones.value.length > 0) {
    isMore.value = true;
  }
});
</script>

<style scoped></style>
