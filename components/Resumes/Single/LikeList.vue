<template>
  <ul class="favorites-list" >
    <ResumesSingleLikeItem v-for="i in 2" :key="i" :id="i"></ResumesSingleLikeItem>
  </ul>
</template>

<script setup>
import Resumes from "../../../pages/search/resumes";
</script>

<style scoped>

</style>