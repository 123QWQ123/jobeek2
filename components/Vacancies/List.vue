<template>
  <div class="content">
    <ul class="favorites-list">
      <VacanciesItem v-for="i in quantity" :key="i" :id="i"></VacanciesItem>
    </ul>
    <button class="create-button show-more" @click="quantity = quantity+5">
      Показать еще
      <img src="~/assets/img/svg/Arrow-Down2.svg" alt="#">
    </button>
  </div>
</template>

<script setup>
const quantity = ref(2);
</script>
<style scoped>

</style>