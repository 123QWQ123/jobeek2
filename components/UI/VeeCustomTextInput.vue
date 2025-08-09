<template>
  <div>
    <input
      v-model="inputValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :name="props.name"
      :autocomplete="isAutoCompleted"
      :disabled="props.disabled"
    />
    <span class="text-danger d-block" v-if="errorMessage">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
export default {
  name: "VeeCustomTextInput",
};
</script>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  type: String,
  placeholder: String,
  autofill: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    required: false,
    default: null,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: null,
  },
});
const isAutoCompleted = computed(() => {
  return props.autofill ? "on" : "off";
});
const { value, setValue, errorMessage } = useField(() => props.name);
const inputValue = ref(value.value ?? props.value);

watch(
  () => value.value,
  (newValue) => {
    inputValue.value = newValue;
  },
);
watch(
  () => inputValue.value,
  (newValue) => {
    setValue(newValue);
  },
);
</script>
