<template>
  {{item}}

  <VacanciesHHItem v-if="item && item.provider === 'hh'" :item="item"></VacanciesHHItem>
  <VacanciesSuperjobItem v-if="item && item.provider === 'superjob'" :item="item"></VacanciesSuperjobItem>
  <SkeletonCard v-else />
</template>
<script setup>
const props = defineProps(['item']);
const {item} = props;
</script>
