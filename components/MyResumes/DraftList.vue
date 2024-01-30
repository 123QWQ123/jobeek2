<template>
  {{my_resumes}}


</template>

<script setup>
const props = defineProps({
  items: {
    required: false,
    default: [],
  }
});
const my_resumes = computed(() => props.items);
</script>

<style scoped>

.theme-checker input ~ .theme-checker-ui .circle.left{
  transform: translate(3px, -50%);
}
.theme-checker input ~ .theme-checker-ui .circle.right{
  transform: translate(30px, -50%);
}

.sort .d-select{
  background: #F5F8FA !important;
}
</style>