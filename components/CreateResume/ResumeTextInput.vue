<template>
  <input
    v-model="inputValue"
    :type="props.type"
    :placeholder="props.placeholder"
  />
  <div class="text-danger d-block" v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "ResumeTextInput",
};
</script>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  type: String,
  placeholder: String,
  value: {
    type: String,
    required: false,
    default: null,
  },
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage, setValue } = useField(() => props.name);
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
