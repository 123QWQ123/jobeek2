<template>
  <div>
    <input
      v-model="inputValue"
      :type="props.type"
      :placeholder="props.placeholder"
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
});

const { value, setValue, errorMessage } = useField(() => props.name);
const inputValue = ref(value.value ?? null);

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
