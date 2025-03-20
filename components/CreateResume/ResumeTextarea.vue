<template>
  <textarea
    class="form-control"
    v-model="inputValue"
    :placeholder="props.placeholder"
  >
  </textarea>
  <div class="text-danger d-block" v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "ResumeTextarea",
};
</script>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  placeholder: String,
  value: {
    required: false,
  },
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage, setValue } = useField(() => props.name);
const inputValue = ref(props.value || value.value);

watch(
  () => inputValue.value,
  (newValue) => {
    setValue(newValue);
  },
);
</script>
