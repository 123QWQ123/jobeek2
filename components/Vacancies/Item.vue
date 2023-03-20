<template>
  <VacanciesHHItem v-if="item.provider === 'hh'" :item="item"></VacanciesHHItem>
  <VacanciesSuperjobItem v-if="item.provider === 'superjob'" :item="item"></VacanciesSuperjobItem>
</template>

<script setup>
const props = defineProps(['item']);
const {item} = props;
</script>
