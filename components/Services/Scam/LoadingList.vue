<template>
<div class="skeleton-card mt-4">
    <div class="favorites-card">
      <div class="favorites-card-head align-start">
        <div class="company">
          <div class="company-logo">
            <span class="pu-skeleton" style="height: 100%;">‌</span>
          </div>
          <div class="company-name">
            <a href="#"></a><span class="count"></span>
          </div>
          <div class="company-info"><span class="pu-skeleton">‌</span>          </div>
        </div>
      </div>
      <div class="favorites-card-body favorites-card-body--brd">
        <span class="pu-skeleton">‌</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = ref(["-"]);
const comments = ref(["-"]);
</script>

<style scoped>
.skeleton-card .img {
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  background-color: #ddd;
}

.skeleton-card span {
  min-width: 100px;
  height: 16px;
  display: inline-block;
  background-color: #ddd;
}

.skeleton-card h3 {
  content: " ";
  width: 250px;
  height: 24px;
  background-color: #ddd;
  margin: 10px 0;
}

.skeleton-card p {
  width: 80%;
  background-color: #ddd;
  height: 16px;
  line-height: 140%;
}

.company-logo .pu-skeleton {
  height: 100%;
}

.favorites-card-head.align-start {
  width: 100%;
  display: block;
}
</style>
