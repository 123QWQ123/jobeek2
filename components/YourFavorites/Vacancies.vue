<template>
  <div class="favorites-list-container">
    <ul class="favorites-list">
      <YourFavoritesVacanciesItem v-for="i in 2"></YourFavoritesVacanciesItem>
    </ul>
  </div>
</template>

<script setup>
import BaseButton from "../BaseButton";
import YourFavorites from "../../pages/your-favorites";

const quantity = ref(2);
</script>

<style scoped>

</style>