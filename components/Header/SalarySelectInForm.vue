<template>
  <CustomSelect :label="'Зарплата'" v-model="selectedSalary" :options="salaryOptions" @change="onChange"></CustomSelect>
</template>

<script setup>
import {useSalaryOptions} from "../../composables/useSalaryOptions";

const props = defineProps(['modelValue', 'currency']);
const emit = defineEmits(['update:modelValue']);
const {modelValue: salary} = props;

const selectedSalary = ref(salary.id);

const salaryOptionsData = useSalaryOptions()
const salaryOptions = ref(salaryOptionsData);

const onChange = (id) => {
  let selectedOptionID = salaryOptionsData.findIndex(item => item.value === parseInt(id));
  if (selectedOptionID === -1){
    return;
  }
  const selectedOption = salaryOptionsData[selectedOptionID];
  emit('update:modelValue', {
    id: selectedOptionID,
    from: selectedOption.min,
    to: selectedOption.max,
  });
}

</script>