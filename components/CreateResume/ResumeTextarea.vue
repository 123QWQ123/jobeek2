<template>
  <textarea
    class="form-control"
    :name="name"
    :rows="rows"
    :placeholder="placeholder"
    :value="value"
    @input="onInput"
    @change="onChange"
    v-bind="$attrs"
  />
  <div class="text-danger d-block" v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true },
  modelValue: { type: [String, Number], default: null },
  placeholder: { type: String, default: "" },
  rows: { type: [String, Number], default: 4 },
});

const emit = defineEmits(["update:modelValue", "input", "change"]);

const { errorMessage, setValue } = useField(() => props.name);
const value = computed(() => {
  return props.modelValue === null || props.modelValue === undefined
    ? ""
    : String(props.modelValue);
});

function onInput(e: Event) {
  const val = (e.target as HTMLTextAreaElement).value;
  setValue(val);
  emit("update:modelValue", val);
  emit("input", e);
}

function onChange(e: Event) {
  emit("change", e);
}
</script>

<style scoped></style>
