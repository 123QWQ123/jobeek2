<template>
  <div class="content">
    <div>
      <ul class="favorites-list">
        <SkeletonCard v-for="item in 10" :key="item" />
      </ul>
      <button id="load_more_button" class="create-button show-more">
        Показать еще
        <div class="ms-2 spinner-grow spinner-grow-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <img src="~/assets/img/svg/Arrow-Down2.svg" alt="#" />
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
