<template>
  <CustomSelect label="Год" :options="yearItems" v-model="year"></CustomSelect>
  <CustomSelect
    label="Месяц"
    :options="monthItems"
    v-model="month"
  ></CustomSelect>
  <CustomSelect label="День" :options="dayItems" v-model="day"></CustomSelect>
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

const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

// console.log(props.modelValue);

// console.log(props.modelValue);

const years = ref([]);
const year = ref(0);
const month = ref(0);
const day = ref(0);

onMounted(() => {
  const currentYear = new Date().getFullYear();
  for (let i = -100; i <= 0; i++) {
    years.value.push(currentYear + i);
  }
  const d = props.modelValue;
  year.value = d.format("YYYY");
  month.value = d.format("MM");
  day.value = d.format("DD");
});

onUpdated(() => {
  const d = props.modelValue;
  year.value = d.format("YYYY");
  month.value = +d.format("MM") - 1;
  day.value = +d.format("DD");
});

const emitDate = () => {
  emit(
    "update:modelValue",
    moment(
      `${year.value}-${parseInt(month.value) + 1}-${day.value}`,
      "YYYY-MM-DD"
    )
  );
};

const maxDate = computed(() => {
  if ([1, 2, 4, 6, 7, 9, 11].includes(month.value)) {
    return 31;
  } else if ([3, 5, 8, 10].includes(month.value)) {
    return 30;
  }
  return 28;
});
const yearItems = computed(() => {
  let items = years.value.map((value, index) => {
    return { name: value, value: value };
  });
  items = items.reverse();
  return items;
});
const monthItems = computed(() => {
  return [
    {
      name: "Январь",
      value: 0,
    },
    {
      name: "Февраль",
      value: 1,
    },
    {
      name: "Март",
      value: 2,
    },
    {
      name: "Апрель",
      value: 3,
    },
    {
      name: "Май",
      value: 4,
    },
    {
      name: "Июнь",
      value: 5,
    },
    {
      name: "Июль",
      value: 6,
    },
    {
      name: "Август",
      value: 7,
    },
    {
      name: "Сентябрь",
      value: 8,
    },
    {
      name: "Октябрь",
      value: 9,
    },
    {
      name: "Ноябрь",
      value: 10,
    },
    {
      name: "Декабрь",
      value: 11,
    },
  ];
});
const dayItems = computed(() => {
  return Array.from({ length: maxDate.value }, (value, index) => {
    return { name: index + 1, value: index + 1 };
  });
});

watch(year, () => {
  emitDate();
});
watch(month, (new_value) => {
  emitDate();
});
watch(day, (new_value) => {
  emitDate();
});
</script>

<script>
export default {
  name: "BirthDatePicker",
};
</script>