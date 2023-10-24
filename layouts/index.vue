<template>
  <div class="layout">
    <header class="header" v-if="hasHeaderSlot">
      <slot name="header"></slot>
    </header>
    <HeaderTheHeader v-else></HeaderTheHeader>
    <main class="main" role="main">
      <NuxtPage />
    </main>

    <footer class="footer" v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </footer>
    <the-footer v-else></the-footer>
  </div>
</template>

<script>
export default {
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
  },
};
</script>
