<template>
  <div class="layout">
    <HeaderHomePersonalCabinetHeader />
    <div>
      <slot />
    </div>
    <!--       <template #error="{ error }">-->
    <!--        <div>-->
    <!--          <p>-->
    <!--            Oh no, something broke when loading the lesson!-->
    <!--            <code>{{ error }}</code>-->
    <!--          </p>-->
    <!--          <p>-->
    <!--            <NuxtLink class="hover:cursor-pointer" to="/"> Go to / </NuxtLink>-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </template>-->

    <the-footer></the-footer>
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
