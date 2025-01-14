<script setup lang="ts"></script>

<template>
  <div class="vacancy-list skeleton-hover">
    <div v-for="i in 3" :key="'vacancy_' + i">
      <div class="vacancy-card">
        <div class="vacancy-card-body">
          <div class="company">
            <div class="company-logo">
              <span class="pu-skeleton">‌</span>
            </div>
            <div class="company-name">
              <span class="pu-skeleton">‌</span>
            </div>
          </div>
          <span class="pu-skeleton">‌</span>
          <span class="pu-skeleton">‌</span>
        </div>
        <div class="vacancy-card-footer">
          <span class="pu-skeleton">‌</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
