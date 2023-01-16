<template>
  <button class="btn btn-primary" :class="classes" :type="type" v-if="!to">
    <slot></slot>
  </button>
  <NuxtLink
    class="btn btn-primary text-white"
    :class="classes"
    v-else
    :to="to"
    :link="link"
  >
    <slot></slot>
  </NuxtLink>
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
      default: "/",
    },
    link: {
      required: false,
      default: null,
    },
  },
};
</script>