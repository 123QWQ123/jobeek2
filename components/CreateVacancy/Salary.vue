<template>
  <div class="input-row">
    <label>Зарплата:</label>
    <div class="row-container">
      <div class="row mb-2">
        <div class="col-6">
          <div class="input-wrapper w-100">
            <input
              id="salary_from"
              type="number"
              v-model="salary.from.val"
              placeholder="Укажите сумму"
              @focusin="$emit('clearError', 'salary.from')"
            />
            <div class="text-danger d-block" v-if="errors.from">
              {{ errors.from }}
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="input-wrapper w-100">
            <input
              id="salary_from"
              type="number"
              v-model="salary.to.val"
              placeholder="Укажите сумму"
              @focusin="$emit('clearError', 'salary.to')"
            />
            <div class="text-danger d-block" v-if="errors.to">
              {{ errors.to }}
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="!salary.gross.is_hidden">
        <div class="check-block mt-2">
          <div class="checkbox">
            <input
              type="checkbox"
              id="salary_gross"
              v-model.number="salary.gross.val"
              @focusin="() => (errors.gross = '')"
            />
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <label for="salary_gross" class="fs-14">до вычета налогов</label>
        </div>
      </div>
    </div>
    {{ props.providers }}
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";

import { useCurrencyOptions } from "~/composables/useCurrencyOptions";
import { useDictionaryStore } from "~/store/dictionary";
import { useWatchStateValues } from "~/composables/useWatchStateValues";

const emit = defineEmits(["update:modelValue", "clearError"]);
const props = defineProps({
  modelValue: {
    required: true,
    default: {},
  },
  errors: {
    required: true,
    default: {},
  },
  providers: {
    required: false,
    default: {
      hh: false,
      superjob: false,
    },
  },
});

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();

const isFirst = ref(true);
const currencyOptions = ref(useCurrencyOptions());

const salary = reactive({
  from: {
    val: props.modelValue?.from,
    isChecked: false,
    isValid: false,
    is_hidden: false,
  },
  to: {
    val: props.modelValue?.to,
    isChecked: false,
    isValid: false,
    is_hidden: false,
  },
  gross: {
    val: props.modelValue?.gross ?? false,
    isChecked: false,
    isValid: false,
    is_hidden: false,
  },
  period: {
    val: props.modelValue?.period,
    isChecked: false,
    isValid: false,
    is_hidden: false,
  },
  currency: {
    val: props.modelValue?.currency,
    isChecked: false,
    isValid: false,
    is_hidden: false,
  },
});
const fields = ref({
  hh: {
    gross: false,
  },
  superjob: {
    period: false,
  },
});

const validate = () => {
  salary.from.isChecked = true;
  salary.from.isValid = parseInt(salary.from.val) > 0;
  salary.to.isValid = parseInt(salary.to.val) > 0;
  salary.currency.isChecked = true;
  salary.currency.isValid = currencyOptions.value.includes(salary.currency.val);
  if (!isFirst.value) {
    emitChanges();
  } else {
    isFirst.value = false;
  }
};
const emitChanges = (key, value) => {
  const passData = {
    from: salary["from"].val,
    to: salary["to"].val,
    gross: salary["gross"].val,
    period: salary["period"].val,
    currency: salary["currency"].val,
  };
  if (!props.providers.hh) {
    delete passData["gross"];
  }
  if (!props.providers.superjob) {
    delete passData["period"];
  }
  emit("update:modelValue", passData);
};
watch(() => useWatchStateValues(salary), emitChanges);

const errors = ref({});
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  },
);

defineExpose({ validate });
</script>

<style scoped></style>
