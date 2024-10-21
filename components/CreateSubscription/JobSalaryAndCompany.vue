<template>
  <div class="input-row">
    <label for="income">Какой доход вы рассматриваете (₽)?</label>
    <div class="row-container">
      <label for="salary_from">От</label>
      <div class="c2">
        <div class="input-wrapper">
          <input
            type="number"
            id="salary_from"
            name="salary_from"
            @input="salaryFrom"
          />
          <div class="text-danger">
            <ErrorMessage name="salary.from" />
          </div>
        </div>
      </div>
      <label for="salary_to">До</label>
      <div class="c2">
        <div class="input-wrapper">
          <input
            type="number"
            id="salary_to"
            name="salary_to"
            @input="salaryTo"
          />
          <div class="text-danger">
            <ErrorMessage name="salary.to" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSetFormValues, useFormErrors } from "vee-validate";

const setFormValues = useSetFormValues();

const errors = useFormErrors();
const salaryFrom = (event) => {
  const value = event.target.value;
  const number = parseInt(value);
  setFormValues({
    salary: {
      from: !isNaN(number) ? number : value !== "" ? value : null,
    },
  });
};
const salaryTo = (event) => {
  const value = event.target.value;
  const number = parseInt(value);
  setFormValues({
    salary: { to: !isNaN(number) ? number : value !== "" ? value : null },
  });
};
</script>

<style scoped></style>
