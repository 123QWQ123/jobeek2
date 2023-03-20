<template>

  <div class="publications-col sticky-item">
    <h4 class="publications-col-title">Последние публикации</h4>

    <ul class="publications-col-list">
      <AdviceCategoryPostLatestListItem v-for="i in 4" :key="i" :id="i"></AdviceCategoryPostLatestListItem>
    </ul>

  </div>
</template>

<script setup>
</script>

<style scoped>

</style>