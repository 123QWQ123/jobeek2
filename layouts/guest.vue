<template>
  <div class="layout">
    <client-only>
      <HeaderTheGuestCabinetHeader v-if="isShow()" />
    </client-only>
    <div>
      <slot />
    </div>
    <the-footer />
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const isShow = () => {
  const exclude = ["sign-in", "sign-up"];
  if (typeof route.name === "string") {
    return !exclude.includes(route.name);
  }
};
</script>
