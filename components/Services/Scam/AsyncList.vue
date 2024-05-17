<template>
  <div class="search-result-content">
    <h2 class="search-result-content__title">Найдено номеров: {{ phones.length }}</h2>
    <Blur v-if="isEmpty"></Blur>

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
    default: []
  }

})
const {getPhones} = props;
// const res = await getVacancies({...params});
// const phones = ref(await getPhones());
const phones = computed(() => props.phones);
const isEmpty = phones.value.length === 0;
const loadMoreButton = ref();
const isLoading = ref(false);
const isMore = ref(false);

const route = useRoute();
onMounted(() => {
  if (phones.value.length > 0){
    isMore.value = true;
  }
})
</script>

<style scoped>

</style>