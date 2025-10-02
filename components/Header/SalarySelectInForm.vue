<template>
  <CustomSelect
    class="no_bg"
    label="Все"
    v-model="selectedSalary"
    :options="salaryOptions"
    @change="onChange"
  ></CustomSelect>
</template>

<script setup>
import { useSalaryOptions } from "~/composables/useSalaryOptions";

const props = defineProps(["modelValue", "currency"]);
const emit = defineEmits(["update:modelValue"]);

const selectedSalary = ref(props.modelValue?.value ?? undefined);
watch(
  () => props.modelValue,
  (newValue) => {
    selectedSalary.value = newValue?.value ?? undefined;
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
    value: selectedOptionID,
    from: selectedOption.from,
    to: selectedOption.to,
  });
};
</script>

<style>
@media (max-width: 768px) {
  .search-row .input-wrap.has-label .nice-select {
    padding-left: 1rem !important;
  }
}

.no_bg {
  background: none !important;
}
</style>
