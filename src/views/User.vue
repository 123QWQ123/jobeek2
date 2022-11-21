<template>Hello, {{ name }}</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    return {
      name: computed(() => store.state.user.name),
    };
  },
};
</script>
