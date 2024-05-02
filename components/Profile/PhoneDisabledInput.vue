<script setup>
const { $format_phone } = useNuxtApp();
const props = defineProps(["name"]);
const { value, setValue, error: errorMessage } = useField(() => props.name);

const phoneInputElement = ref();
const phoneValue = ref($format_phone(value.value));

watch(
  () => value.value,
  (newPhone) => {
    phoneValue.value = $format_phone(newPhone);
  },
);
</script>

<template>
  <input
    type="text"
    ref="phoneInputElement"
    placeholder="Телефон"
    :value="phoneValue"
    disabled
    id="phone"
  />
  <div class="text-danger d-block">
    {{ errorMessage }}
  </div>
</template>

<style scoped></style>
