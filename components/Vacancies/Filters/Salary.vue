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
          v-for="item in salaryOptions"
          v-model="salary_id"
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
import { useDictionaryStore } from "~/store/dictionary";
import { useVacancyStore } from "~/store/vacancy";
import useQueryParams from "~/composables/useQueryParams.js";
import { useSalaryOptions } from "~/composables/useSalaryOptions.js";

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();

const filterClass = ref(true);
const search = ref("");
const filterItems = ref([]);

const { getQueryParam, updateQueryParam } = useQueryParams();
const getSalaryValue = () => {
  return (
    getQueryParam("salary") ?? {
      id: undefined,
      from: undefined,
      to: undefined,
    }
  );
};
const salary = ref(getSalaryValue());
const salary_id = ref(salary.value?.id ?? undefined);

watch(
  () => getSalaryValue(),
  (newValues, oldValues) => {
    salary.value = newValues;
  },
);
watch(
  () => salary_id.value,
  (newValue) => {
    if (newValue) {
      updateQueryParam("salary", { ...salary.value, id: newValue });
    } else {
      updateQueryParam("salary", undefined);
    }
  },
);

const salaryOptions = ref(useSalaryOptions());

const { sort } = useSort();

const prepare = (items) => {
  items = items.map((item) => ({
    ...item,
    is_checked: item.id === salary_id.value,
  }));
  filterItems.value = items;
};
onMounted(async () => {
  prepare([...salaryOptions.value]);
});
</script>

<style scoped></style>
