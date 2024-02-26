<template>
  <input v-model="value" :type="props.type" :placeholder="props.placeholder" />
  <div class="text-danger d-block" v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "CustomTextInput",
};
</script>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  type: String,
  placeholder: String,
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);
</script>
