<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Зарплата</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>
    <div class="filter-box-body">
      <div class="check-block-list all-visible">
        {{ salary_id }}
        <VacanciesRadio
          class="check-block"
          v-for="item in salaryOptions"
          v-model="salary_id"
          :value="item.value"
          :name="'salary_id'"
          :id="`salary_${item.value}`"
          :label="item.name"
        />
        <!--        <div v-for="item in salaryOptions" class="check-block">-->
        <!--          <div class="checkbox">-->
        <!--            <input-->
        <!--              type="radio"-->
        <!--              name="salary"-->
        <!--              :checked="item.is_checked"-->
        <!--              @change="onChange()"-->
        <!--            />-->
        <!--            <div class="radio-mask">-->
        <!--              <img src="~/assets/img/svg/check.svg" alt="#" />-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="l-wrap">-->
        <!--            <label :for="item.value">{{ item.name }} ₽</label>-->
        <!--            &lt;!&ndash;                <span class="count">200</span>&ndash;&gt;-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
    {{ salary_id }}
    <!--    {{ filterItems }}-->
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useVacancyStore } from "~/store/vacancy";
import useQueryParams from "~/composables/useQueryParams.js";
import { useSalaryOptions } from "~/composables/useSalaryOptions.js";

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();

const filterClass = ref(false);
const isMore = ref(true);
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
console.log(salary);
const salary_id = ref(salary.value?.id ?? undefined);

watch(
  () => getSalaryValue(),
  (newValues, oldValues) => {
    console.log(newValues, oldValues);
    salary.value = newValues;
    // work_types.value = newValues;
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
const onChange = (id) => {
  console.log(id);
};
onMounted(async () => {
  prepare([...salaryOptions.value]);
});
</script>

<style scoped></style>
