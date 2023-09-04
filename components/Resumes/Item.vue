<template>
  <ResumesHHItem v-if="props.item && item.provider === 'hh'" :item="props.item"/>
  <ResumesSuperjobItem v-else-if="props.item && item.provider === 'superjob'" :item="props.item" />
</template>
<script setup>
const props = defineProps(['item']);
</script>
