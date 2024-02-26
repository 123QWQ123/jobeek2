<script setup>
import IMask from "imask";

const props = defineProps(["name"]);
const { value, setValue, error: errorMessage } = useField(() => props.name);

const phoneInputElement = ref();
const phoneMask = ref(null);
watch(
  () => value.value,
  (newPhone) => {
    phoneMask.value = new IMask(phoneInputElement.value, {
      mask: "+{7}(000)000-00-00",
    });
    phoneMask.value.unmaskedValue = newPhone;
  },
);
</script>

<template>
  <input
    type="text"
    ref="phoneInputElement"
    placeholder="Телефон"
    disabled
    id="phone"
  />
  <div class="text-danger d-block">
    {{ errorMessage }}
  </div>
</template>

<style scoped></style>
