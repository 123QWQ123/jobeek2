<template>
  <div class="favorites-card favorites-card--min">
    <span class="pu-skeleton">‌</span>
  </div>
</template>

<script>
export default {
  name: "Blur",
};
</script>

<style scoped>
.pu-skeleton {
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  width: 100%;
  background-color: rgb(238, 238, 238);
  background-image: linear-gradient(90deg, rgb(238, 238, 238), rgb(245, 245, 245), rgb(238, 238, 238));
  animation: 1.5s ease-in-out 0s infinite normal none running SkeletonLoading;
  height: 30px;
}

@keyframes SkeletonLoading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.no-favorites-txt {
  font-weight: bold;
}
</style>
