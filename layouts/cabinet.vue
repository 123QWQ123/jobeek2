<template>
  <div class="layout">
    <header class="header" v-if="hasHeaderSlot">
      <slot name="header"></slot>
    </header>
    <HeaderThePersonalCabinetHeader v-else></HeaderThePersonalCabinetHeader>

      <NuxtPage />
      <!-- <template #error="{ error }">
          <div>
            <p>
              Oh no, something broke when loading the lesson!
              <code>{{ error }}</code>
            </p>
            <p>
              <NuxtLink class="hover:cursor-pointer" to="/"> Go to / </NuxtLink>
            </p>
          </div>
        </template> -->

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
