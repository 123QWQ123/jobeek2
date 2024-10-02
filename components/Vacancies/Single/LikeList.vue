<template>
  <ul class="favorites-list">
    <VacanciesSingleLikeItem
      v-for="i in 2"
      :key="i"
      :id="i"
    ></VacanciesSingleLikeItem>
  </ul>
</template>

<script setup>
// const { slug } = route.params;
</script>

<style scoped></style>
