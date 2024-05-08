<script setup>
import { useNuxtApp } from "#app";
import { useField } from "vee-validate";

const props = defineProps(["name"]);

const { $format_phone } = useNuxtApp();

const { value } = useField(() => props.name);
console.log(value.value);
const currentValue = ref($format_phone(value.value) ?? null);
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="Телефон"
      disabled
      autocomplete="off"
      :value="currentValue"
      id="phone"
    />
  </div>
</template>

<style scoped>
.disabled {
  pointer-events: none;
  background: #ccc;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
