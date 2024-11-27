<template>
  <div class="layout">
    <HeaderTheGuestCabinetHeader v-if="isShow()" />
    <div>
      <slot />
    </div>
    <the-footer />
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const isShow = () => {
  const exclude = ["sign-in", "sign-up", "forgot-password"];
  if (typeof route.name === "string") {
    return !exclude.includes(route.name);
  }
};
</script>
