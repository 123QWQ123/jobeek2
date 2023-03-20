<template>
  <YourVacanciesHHItem v-if="item.provider === 'hh'" :item="item"></YourVacanciesHHItem>
  <YourVacanciesSuperjobItem v-if="item.provider === 'superjob'" :item="item"></YourVacanciesSuperjobItem>
</template>

<script setup>
const props = defineProps(['item']);
const {item} = props;
</script>

<style scoped>

</style>