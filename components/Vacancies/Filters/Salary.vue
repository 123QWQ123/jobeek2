<template>
  <div class="filter-box" :class="{ open: salaryFilterClass }">
    <div
      class="filter-box-handle"
      @click="salaryFilterClass = !salaryFilterClass"
    >
      <strong>Зарплата</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>
    <div class="filter-box-body">
      <div class="check-block-list all-visible">
        <div v-for="item in salaryOptions" class="check-block">
          <div class="checkbox">
            <input
              type="radio"
              name="salary"
              :checked="isChecked(item)"
              @change="onChange(item.value)"
            />
            <div class="radio-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label :for="item.value">{{ item.name }} ₽</label>
            <!--                <span class="count">200</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useVacancyStore } from "~/store/vacancy";
import useQueryParams from "~/composables/useQueryParams.js";
import { useSalaryOptions } from "~/composables/useSalaryOptions.js";

const emit = defineEmits(["onFormChange"]);

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();

const filterClass = ref(true);
const isMore = ref(true);
const search = ref("");
const filterItems = ref([]);

const { getQueryParam, updateQueryParam } = useQueryParams();
const salary = ref(getQueryParam("salary") ?? []);
watch(
  () =>
    getQueryParam("salary") ?? {
      id: undefined,
      from: undefined,
      to: undefined,
    },
  (newValues) => {
    work_types.value = newValues;
  },
);

const salaryOptions = ref(useSalaryOptions());

const { sort } = useSort();

onMounted(async () => {});
// const emit = defineEmits(["onFormChange"]);
//
// import { useSalaryOptions } from "~/composables/useSalaryOptions";
// import { useVacancyStore } from "~/store/vacancy";
// import { useVacancyForm } from "~/composables/useVacancyForm";
//
// const vacancyStore = useVacancyStore();
// const salaryOptions = ref(useSalaryOptions());
// const form = ref(useVacancyForm());
//
// const isChecked = (current) => {
//   const selectedSalary = form.value.salary;
//   if (current.value === selectedSalary.id) {
//     return true;
//   }
//   return false;
// };
//
// const isLoading = ref(false);
// const router = useRouter();
// const { getVacancies, clearVacancies } = vacancyStore;
// const onChange = async (id) => {
//   let selectedOptionID = salaryOptions.value.findIndex(
//     (item) => item.value === id,
//   );
//   if (selectedOptionID === -1) {
//     return;
//   }
//   const selectedOption = salaryOptions.value[selectedOptionID];
//   emit("onFormChange", "salary", {
//     id: selectedOptionID,
//     from: selectedOption.min,
//     to: selectedOption.max,
//   });
// };

const salaryFilterClass = ref(true);
</script>

<style scoped></style>
