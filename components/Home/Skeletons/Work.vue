<script setup lang="ts"></script>

<template>
  <div class="skeleton-hover">
    <div class="swiper cards-slider-row">
      <div class="cards-slider cards-grid">
        <div v-for="(item, idx) in 4" :key="'work_' + idx" class="tile-card">
          <h4 class="tile-card-title"><span class="pu-skeleton">‌</span></h4>
          <span class="tile-card-dop-info">
            <span class="pu-skeleton">‌</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
