<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>

    <transition name="dialog">
      <div class="modal fade show" v-if="show">
        <div
          class="modal-dialog modal-dialog-centered"
          style="min-width: 320px"
        >
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h4>{{ title }}</h4>
              </slot>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer" v-if="!fixed">
              <slot name="actions">
                <base-button @click="tryClose">Close</base-button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.backdrop {
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  position: fixed;
}
.show {
  display: block;
}
</style>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>