<template>
  <input
    @input="$emit('update:phone', $event.target.value)"
    :value="phone"
    type="tel"
    ref="field"
    placeholder="Номер телефона"
  />
</template>

<script>
import { ref, onMounted } from "vue";
import Inputmask from "inputmask";

export default {
  emits: ["update:phone", "onComplete"],

  props: {
    phone: String,
    mask: {
      type: String,
      default: "+7 (999) 999 99-99",
    },
  },

  setup(props, { emit }) {
    const field = ref(null);

    onMounted(() => {
      const inputmask = new Inputmask({
        mask: props.mask,
        oncomplete: () => {
          emit("onComplete");
        },
      });

      inputmask.mask(field.value);
    });

    return { field };
  },
};
</script>
