<template>
  <div class="layout">
    <header class="header" v-if="hasHeaderSlot">
      <slot name="header"></slot>
    </header>
    <TheHeader v-else></TheHeader>

    <main class="main container mt-5 mb-3">
      <slot />
    </main>

    <!-- <footer class="footer" v-if="hasFooterSlot">
    <slot name="footer"></slot>
  </footer> -->
  </div>
</template>

<script>
export default {
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    // hasFooterSlot() {
    //   return !!this.$slots.footer;
    // },
  },
};
</script>
