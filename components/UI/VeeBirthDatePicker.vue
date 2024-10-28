<template>
  <div class="c3 w-100">
    <CustomSelect
      label="Год"
      :options="yearItems"
      v-model="date.year"
    ></CustomSelect>
    <CustomSelect
      label="Месяц"
      :options="monthItems"
      v-model="date.month"
    ></CustomSelect>
    <CustomSelect
      label="День"
      :options="dayItems"
      v-model="date.day"
    ></CustomSelect>
  </div>
  <div class="text-danger d-block" v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>
<style scoped>
#date-picker {
  display: flex;
}

#date-picker div {
  margin-right: 10px;
}
</style>

<script setup>
import moment from "moment";
import { useMonthOptions } from "~/composables/useMonthOptions";

import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  label: String,
  max: {
    default: 2009,
  },
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);

const emit = defineEmits({
  "update:modelValue": {
    required: true,
  },
});

const years = ref([]);

const birth = new Date(value.value);
const d = moment(value.value, "YYYY-MM-DD");
const year = d.format("YYYY");
const month = d.format("MM");
const day = parseInt(d.format("DD"));

const date = reactive({
  year: year,
  month: month,
  day: day,
});

const isFirst = ref(true);

onMounted(() => {
  const currentYear = props.max ?? new Date().getFullYear();
  for (let i = -100; i <= 0; i++) {
    years.value.push(currentYear + i);
  }
});

const update = (newDate) => {
  value.value = getModelValue(newDate);
};

const getModelValue = (newDate = null) => {
  if (newDate) {
    date.month = newDate.month;
    date.year = newDate.year;
    date.day = newDate.day;
  }
  const monthString = String(parseInt(date.month));
  const dayString = String(parseInt(date.day));
  return moment(
    `${date.year}-${monthString.padStart(2, "0")}-${dayString.padStart(
      2,
      "0",
    )}`,
    "YYYY-MM-DD",
  ).format("YYYY-MM-DD");
};

const maxDate = computed(() => {
  if ([1, 2, 4, 6, 7, 9, 11].includes(date.month)) {
    return 31;
  } else if ([3, 5, 8, 10].includes(date.month)) {
    return 30;
  }
  return 28;
});
const yearItems = computed(() => {
  return useYearOptions(1950, new Date().getUTCFullYear() - 16);
});
const monthItems = useMonthOptions();
const dayItems = computed(() => {
  return Array.from({ length: maxDate.value }, (value, index) => {
    return { name: index + 1, value: index + 1 };
  });
});

watch(
  () => value.value,
  (newDate) => {
    if (newDate) {
      const d = moment(newDate, "YYYY-MM-DD");
      const year = d.format("YYYY");
      const month = d.format("MM");
      const day = parseInt(d.format("DD"));
      if (newDate) {
        date.month = month;
        date.year = year;
        date.day = day;
      }
      isFirst.value = false;
    }
  },
);
watch(
  () => ({ ...date }),
  (newDate) => {
    update(newDate);
  },
);
</script>

<script>
export default {
  name: "BirthDatePicker",
};
</script>
