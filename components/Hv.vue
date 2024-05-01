<script setup>
watch(
  () => window.innerHeight,
  () => {},
);

onMounted(() => {
  const updateVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
  };
  window.addEventListener("resize", updateVH);
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
});

onBeforeUnmount(() => {
  const updateVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
  };
  window.removeEventListener("resize", updateVH);
});
</script>

<template></template>

<style scoped></style>
