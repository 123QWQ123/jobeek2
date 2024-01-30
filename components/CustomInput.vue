<template>
  <div class="input-wrapper mt-2">
    <VeeField
      v-model="modelValue"
      :name="props.name"
      :type="props.type"
      :rules="props.rules"
    />

    <div class="text-danger d-block">
      {{ errorMessage }}
      <VeeErrorMessage :name="props.name" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "modelValue",
  "name",
  "type",
  "rules",
  "errorMessage",
]);

const emit = defineEmits(["update:modelValue"]);

const modelValue = ref(props.modelValue ?? "");

watch(
  () => modelValue.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  }
);
watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = newValue;
  }
);
</script>
