<template>
  <MyVacanciesHHItem v-if="item.provider === 'hh'" :item="item"></MyVacanciesHHItem>
  <MyVacanciesSuperjobItem v-if="item.provider === 'superjob'" :item="item"></MyVacanciesSuperjobItem>
</template>

<script setup>
const props = defineProps(['item']);
const {item} = props;
console.log(item);
</script>

<style scoped>

</style>