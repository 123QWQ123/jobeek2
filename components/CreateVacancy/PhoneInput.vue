<template>
  <div class="input-row border-1">
    <input class="" ref="phoneElement" v-model="phone" placeholder="+" />
  </div>
  <div class="text text-danger">
    {{ errorMessage }}
  </div>
</template>
<script>
export default {
  name: "PhoneInput",
};
</script>

<script setup>
const props = defineProps(["name"]);
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import { useField } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);

const { value: phone, errorMessage } = useField(() => props.name);

const phoneElement = ref();
const phoneMask = ref();

onMounted(() => {
  try {
    phoneMask.value = intlTelInput(phoneElement.value, {
      initialCountry: "auto",
      // showSelectedDialCode: true,
      // utilsScript: "intl-tel-input/build/js/utils",
    });
  } catch (e) {
    console.log(e);
  }

  setTimeout(() => {
    phoneMask.value.setCountry("kz");
  }, 2000);
});
</script>
