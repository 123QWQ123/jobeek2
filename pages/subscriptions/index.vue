<script setup>
import { useAuthStore } from "~/store/auth.js";
const authStore = useAuthStore();
</script>

<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt-4">
      <div class="wrapper wrapper-1290">
        <div class="content mb-4">
          <h1 class="lk-page-title mb-4">Ваши подписки</h1>
          <YourSubscriptionsList></YourSubscriptionsList>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
