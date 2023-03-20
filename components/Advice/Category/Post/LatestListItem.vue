<template>
  <li>
    <NuxtLink :to="url" class="publication-card-mini" href="#">
      <div class="publication-card-mini-img"><img src="~/assets/img/unsplash_QBpZGqEMsKgmini.jpg"
                                                alt="#"></div>
      <div class="publication-card-mini-text">
        <h5 class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa
          sem ac sed </h5>
        <div class="views a-count"> <img src="~/assets/img/svg/eye.svg" alt="#"><span>1
                                                  234</span></div>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup>
const props = defineProps(['id']);
const url = computed(() => 'http://localhost:3033/advice/popular/' + props.id);
</script>

<style scoped>

</style>