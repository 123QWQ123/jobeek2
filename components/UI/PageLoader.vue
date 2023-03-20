<template>
  <div class="loading bg-dark bg-opacity-50 w-100 h-100 position-fixed pt-5 justify-content-between align-content-center" style="z-index: 11;display: block;top:0;left: 0;right: 0;" >
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageLoader"
}
</script>

<style scoped>

</style>