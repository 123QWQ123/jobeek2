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

const props = defineProps({
  modelValue: {
    type: String,
  },
  value: {
    type: String,
  },
  max: {
    default: 2009,
  },
});

const emit = defineEmits({
  "update:modelValue": {
    required: true,
  },
});

const years = ref([]);
// const year = ref();
// const month = ref(null);
// const day = ref(null);

const date = reactive({
  year: null,
  month: null,
  day: null,
});

const isFirst = ref(true);
onMounted(() => {
  const currentYear = props.max ?? new Date().getFullYear();
  for (let i = -100; i <= 0; i++) {
    years.value.push(currentYear + i);
  }
});

const emitDate = () => {
  emit("update:modelValue", getModelValue());
};

const getModelValue = (newDate = null) => {
  if (newDate) {
    date.month = newDate.month;
    date.year = newDate.year;
    date.day = newDate.day;
  }
  const monthString = String(parseInt(date.month) + 1);
  const dayString = String(parseInt(date.day));
  return moment(
    `${date.year}-${monthString.padStart(2, "0")}-${dayString.padStart(
      2,
      "0"
    )}`,
    "YYYY-MM-DD"
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
  let items = years.value.map((value, index) => {
    return { name: value, value };
  });
  items = items.reverse();
  items.unshift({
    name: "Год",
    value: null,
  });
  return items;
});
const monthItems = useMonthOptions();
const dayItems = computed(() => {
  const items = Array.from({ length: maxDate.value }, (value, index) => {
    return { name: index + 1, value: index + 1 };
  });

  items.unshift({
    name: "День",
    value: null,
  });
  return items;
});

watch(
  () => props.modelValue,
  (newDate) => {
    if (isFirst.value && newDate) {
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
  }
);
watch(
  () => ({ ...date }),
  (newDate) => {
    console.log(newDate);
    emitDate(newDate);
  }
);
</script>

<script>
export default {
  name: "BirthDatePicker",
};
</script>
