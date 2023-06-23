<template>
  <MyResumesHHItem v-if="item.provider === 'hh'" :item="item"></MyResumesHHItem>
  <MyResumesSuperjobItem v-if="item.provider === 'superjob'" :item="item"></MyResumesSuperjobItem>
</template>

<script setup>
const props = defineProps(['item']);
const {item} = props;
</script>

<style scoped>

</style>