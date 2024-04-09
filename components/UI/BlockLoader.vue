<template>
  <div
    class="loading bg-dark bg-opacity-50 w-100 h-100 position-absolute d-flex align-items-center justify-content-center align-content-center"
  >
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageLoader",
};
</script>

<style scoped>
.loading {
  z-index: 11;
  display: block;
  top: 0;
  left: 0;
  right: 0;
}
</style>
