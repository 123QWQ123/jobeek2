<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const { getPremium } = authStore;

useAsyncData("getPremium", () => getPremium());

if (!authStore.isEmployer) {
  navigateTo({ name: "profile-seeker" });
} else {
  navigateTo({ name: "profile-employer" });
}
</script>
<template></template>
