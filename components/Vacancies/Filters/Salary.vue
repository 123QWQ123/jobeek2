<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Зарплата</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>
    <div class="filter-box-body">
      <div class="check-block-list all-visible">
        <VacanciesRadio
          class="check-block"
          v-for="item in filterItems"
          :key="item.id"
          :modelValue="salary_id"
          @update:modelValue="onUpdated"
          :value="item.value"
          :name="'salary_id'"
          :id="`salary_${item.value}`"
          :label="item.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import useQueryParams from "~/composables/useQueryParams.js";
import { useSalaryOptions } from "~/composables/useSalaryOptions.js";

const filterClass = ref(true);
const filterItems = ref([]);

const { getQueryParam, updateQueryParam } = useQueryParams();
const getSalaryValue = () =>
  getQueryParam("salary") ?? { value: undefined, name: "Все" };
const salary = ref(getSalaryValue());
const salaryOptions = ref(useSalaryOptions());
const salary_id = ref(salary.value?.value ?? undefined);

const onUpdated = (newValue) => {
  if (newValue) {
    const found = [...salaryOptions.value].find(
      (item) => item.value === newValue,
    );
    salary.value = found;
    salary_id.value = newValue;
    prepare([...salaryOptions.value]);
    updateQueryParam("salary", {
      value: found.value,
      from: found.from,
      to: found.to,
    });
  } else {
    updateQueryParam("salary", undefined);
  }
};

const prepare = (items) => {
  items = items.map((item) => ({
    ...item,
    is_checked: item.value === salary_id.value,
  }));
  filterItems.value = items;
};
prepare([...salaryOptions.value]);
</script>

<style scoped></style>
