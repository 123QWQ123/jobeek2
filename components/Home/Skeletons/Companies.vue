<script setup lang="ts"></script>

<template>
  <!--- skeleton place section-->
  <ul class="companies-list skeleton-hover">
    <li v-for="(item, idx) in 4">
      <div class="company company-card">
        <div class="company-logo"><span class="pu-skeleton">‌</span></div>
        <div class="company-name"><span class="pu-skeleton">‌</span></div>
      </div>
    </li>
  </ul>
  <!--- END skeleton place section-->
</template>

<style scoped></style>
