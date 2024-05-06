<script setup>
import { useNuxtApp } from "#app";
import { useAuthStore } from "~/store/auth.js";

const props = defineProps(["name"]);

const { $format_phone } = useNuxtApp();

const authStore = useAuthStore();
const currentValue = ref($format_phone(authStore.user?.phone) ?? null);
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="Телефон"
      class="disabled"
      :value="currentValue"
      id="phone"
    />
  </div>
</template>

<style scoped>
.disabled {
  pointer-events: none;
  background: #ccc;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
