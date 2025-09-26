<template>
  <div class="input-row m-5">
    <input class="form-control" ref="phoneElement" />
  </div>
</template>
<script>
export default {
  name: "PhoneInput",
};
</script>

<script setup>
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input/build/js/intlTelInput";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({});

const phoneElement = ref();
const phoneMask = ref(null);
onMounted(() => {
  try {
    phoneMask.value = intlTelInput(phoneElement.value, {
      initialCountry: "auto",
      utilsScript: "intl-tel-input/build/js/utils",
    });
  } catch (e) {}

  setTimeout(() => {
    phoneMask.value.setCountry("kz");
  }, 2000);
});
</script>
