<template>
  <VacanciesHHItem v-if="props.item && item.provider === 'hh'" :item="props.item"></VacanciesHHItem>
  <VacanciesSuperjobItem v-else :item="props.item"></VacanciesSuperjobItem>
</template>
<script setup>
const props = defineProps(['item']);
</script>
