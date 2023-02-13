<template>
  <CustomSelect v-model="selectedSalary" :options="salaryOptions"></CustomSelect>
</template>

<script setup>
const salaryOptions = [
  {value: 0, name: 'Все'},
  {value: 1, name: '10K-30K'},
  {value: 2, name: '31K-50K'},
  {value: 3, name: '51K-100K'},
  {value: 4, name: '100K+'},
];

const selectedSalary = ref(0);

</script>