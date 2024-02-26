<template>
  <textarea
    class="form-control"
    v-model="value"
    :placeholder="props.placeholder"
  >
  </textarea>
  <div class="text-danger d-block" v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "VacancyTextarea",
};
</script>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  placeholder: String,
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);
</script>
