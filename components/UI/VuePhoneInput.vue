<template>
  <vue-tel-input
    ref="phoneElement"
    :value="phone"
    :disabled="props.disabled"
    @input="onInput"
  />
</template>

<script setup>
const emit = defineEmits(["update:modelValue", "change-country-code"]);
const props = defineProps({
  modelValue: {
    required: true,
    type: String,
    default: "",
  },
  disabled: {
    required: true,
    type: Boolean,
    default: false,
  },
});
import { VueTelInput } from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";

const phone = ref(props.modelValue);
const phoneElement = ref();
const onInput = (phoneInput, phoneObject, input) => {
  if (phoneObject?.formatted) {
    phone.value = phoneObject.formatted;
  }
  if (phoneInput.valid) {
    emit("change-country-code", phoneObject.countryCode);
  }
};

watch(
  () => phone.value,
  (newValue) => {
    if (phone.value) {
      emit(
        "update:modelValue",
        "+" +
          phoneElement.value.vueNumberUnformat(newValue, { isInteger: true }),
      );
    }
  },
);
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      phone.value = newValue;
    }
  },
);

const focus = () => {
  phoneElement.value.focus();
};

defineExpose({
  focus,
});
</script>
