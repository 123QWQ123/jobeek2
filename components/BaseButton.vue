<template>
  <NuxtLink
    v-if="to"
    class="btn btn-primary text-white"
    :class="classes"
    :to="to"
    :link="link"
  >
    <slot></slot>
  </NuxtLink>
  <button v-else class="button-accent" :class="classes" :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    to: {
      required: false,
      default: null,
    },
    link: {
      required: false,
      default: null,
    },
  },
};
</script>
