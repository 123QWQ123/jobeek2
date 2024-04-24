<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "cabinet",
});
const authStore = useAuthStore();
console.log(authStore.isEmployer + "profile/index");
if (authStore.isEmployer) {
  navigateTo({ name: "profile-employer" });
} else {
  navigateTo({ name: "profile-seeker" });
}
// onMounted(() => {
//   console.log(authStore.isEmployer);
// });
</script>

<template></template>
