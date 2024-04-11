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
      value: undefined,
      name: "Все",
    }
  );
};
const salary = ref(getSalaryValue());
const salary_id = ref(salary.value?.value ?? undefined);

watch(
  () => getSalaryValue(),
  (newValues, oldValues) => {
    salary.value = newValues;
  },
);
watch(
  () => salary.value,
  (newValues, oldValues) => {
    salary_id.value = newValues.value;
    prepare([...salaryOptions.value]);
  },
);

const onUpdated = (newValue) => {
  if (newValue) {
    const found = [...salaryOptions.value].find(
      (item) => item.value === newValue,
    );
    updateQueryParam("salary", { ...found });
    console.log("updated");
  } else {
    updateQueryParam("salary", undefined);
  }
};

const salaryOptions = ref(useSalaryOptions());

const { sort } = useSort();

const prepare = (items) => {
  items = items.map((item) => ({
    ...item,
    is_checked: item.value === salary_id.value,
  }));
  filterItems.value = items;
};
onMounted(async () => {
  prepare([...salaryOptions.value]);
});
</script>

<style scoped></style>
