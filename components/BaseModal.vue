<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>

    <transition name="dialog">
      <div :class="type" class="modal fade show" v-if="show">
        <div
          class="modal-dialog modal-dialog-centered"
          style="min-width: 320px"
        >
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h2>{{ title }}</h2>
              </slot>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer" v-if="!fixed">
              <slot name="actions">
                <base-button :to="null" @click="tryClose">Close</base-button>
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
.modal-content {
  width:100%;
}

.error.modal {
  color: red;
}
.success.modal {
  color: green;
}

.modal-dialog-centered {
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
  -ms-flex-align:center;
  align-items:center;
  min-height:calc(100% - (.5rem * 2));
}



@media (min-width: 576px) {
  .modal-dialog-centered {
    min-height:calc(100% - (1.75rem * 2));
  }
}
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
    },
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