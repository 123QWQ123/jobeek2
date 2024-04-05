<template>
  <CustomSelect
    class="no_bg"
    label="Зарплата"
    v-model="selectedSalary"
    :options="salaryOptions"
    @change="onChange"
  ></CustomSelect>
</template>

<script setup>
import { useSalaryOptions } from "~/composables/useSalaryOptions";

const props = defineProps(["modelValue", "currency"]);
const emit = defineEmits(["update:modelValue"]);

console.log(props.modelValue);
const selectedSalary = ref(props.modelValue?.id ?? undefined);
watch(
  () => props.modelValue,
  (newValue) => {
    console.log(newValue);
    selectedSalary.value = newValue?.id ?? undefined;
  },
);

const salaryOptionsData = useSalaryOptions();
const salaryOptions = ref(salaryOptionsData);

const onChange = (id) => {
  let selectedOptionID = salaryOptionsData.findIndex(
    (item) => item.value === parseInt(id),
  );
  if (selectedOptionID === -1) {
    return;
  }
  const selectedOption = salaryOptionsData[selectedOptionID];
  emit("update:modelValue", {
    id: selectedOptionID,
    from: selectedOption.min,
    to: selectedOption.max,
  });
};
</script>

<style>
.no_bg {
  background: none !important;
}
</style>
