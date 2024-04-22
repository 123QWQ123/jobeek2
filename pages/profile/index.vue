<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "cabinet",
});
const authStore = useAuthStore();
console.log(authStore.isEmployer);
onMounted(() => {
  console.log(authStore.isEmployer);
  if (authStore.isEmployer) {
    navigateTo({ name: "profile-employer" });
  } else {
    navigateTo({ name: "profile-seeker" });
  }
});
</script>

<template></template>
