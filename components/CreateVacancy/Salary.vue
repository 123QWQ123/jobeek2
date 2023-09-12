<template>
  <div class="input-row">
    <label>Зарплата:</label>
    <div class="row-container">
      <div class="row mb-2">
        <div class="col-6">
            <div class="input-wrapper w-100">
                <input id="salary_from" type="number" v-model="salary.from.val" placeholder="Укажите сумму" @focusin="$emit('clearError', 'salary.from')">
                <div class="text-danger d-block" v-if="errors.from">
                    {{ errors.from }}
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="input-wrapper w-100">
                <input id="salary_from" type="number" v-model="salary.to.val" placeholder="Укажите сумму" @focusin="$emit('clearError', 'salary.to')">
                <div class="text-danger d-block" v-if="errors.to">
                    {{ errors.to }}
                </div>
            </div>
        </div>

      </div>

      <div class="row">
        <div class="col-6">
          <CustomSelect class="skyBlueBG" :label="'Период'"
            :options="periodOptions"
            :style="skyBlueBG" v-model="salary.period.val"
            @focusin="clear('salary.period')"
          />

          <div class="text-danger d-block" v-if="errors.period">
            {{ errors.period }}
          </div>
        </div>
        <div class="col-6">
          <CustomSelect class="skyBlueBG" :label="'Валюта'"
            :options="currencyOptions"
            :style="skyBlueBG" v-model="salary.currency.val"
            @focusin="clear('salary_currency')"
          />

          <div class="text-danger d-block" v-if="errors.salary_currency">
            {{ errors.salary_currency }}
          </div>
        </div>
      </div>

      <div class="row">

        <div class="check-block mt-2">
          <div class="checkbox">
            <input type="checkbox" id="salary_gross" v-model.number="salary.gross.val" @focusin="() => errors.gross = ''">
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <label for="salary_gross" class="fs-14">до вычета налогов</label>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

import {useCurrencyOptions} from "~/composables/useCurrencyOptions";
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['update:modelValue', 'clearError']);
const props = defineProps({
    modelValue: {
        required: true,
        default: {}
    },
    errors: {
        required: true,
        default: {}
    }
})


const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();
const {getPaymentPeriodOptions} = dictionaryStore;
await getPaymentPeriodOptions();
const currencyOptions = ref(useCurrencyOptions());
const periodOptions = computed(() => {
  return dictionaryStore.payment_period.map((item) => ({name: item.name, value: item.id}));
});

const salary = reactive({
    from: {
        val: props.modelValue?.from,
        isChecked: false,
        isValid: false,
    },
    to: {
        val: props.modelValue?.to,
        isChecked: false,
        isValid: false,
    },
    gross: {
        val: props.modelValue?.gross ?? false,
        isChecked: false,
        isValid: false,
    },
    period: {
        val: props.modelValue?.period,
        isChecked: false,
        isValid: false,
    },
    currency: {
        val: props.modelValue?.currency,
        isChecked: false,
        isValid: false,
    },
});
const isFirst = ref(true);
watch(() => props.modelValue, (newValue) => {
  salary.from.val = newValue?.from;
  salary.to.val = newValue?.to;
  salary.gross.val = newValue?.gross;
  salary.period.val = newValue?.period;
  salary.currency.val = newValue?.currency;
})

const validate = () => {
    salary.from.isChecked = true;
    if (parseInt(salary.from.val) > 0){
        salary.from.isValid = true;
    }else{
        salary.from.isValid = false;
    }
    if (parseInt(salary.to.val) > 0){
        salary.to.isValid = true;
    }else{
        salary.to.isValid = false;
    }
    salary.currency.isChecked = true;
    if (currencyOptions.value.includes(salary.currency.val)){
        salary.currency.isValid = true;
    }else{
        salary.currency.isValid = false;
    }
    if (!isFirst.value){
      emit('update:modelValue', {from: salary.from.val,to: salary.to.val,gross: salary.gross.val,period: salary.period.val, currency: salary.currency.val});
    }else{
      isFirst.value = false;
    }
}
watch(salary, validate);
const skyBlueBG = {
    background: "#F5F8FA"
}
const errors = ref({});
watch(() => props.errors, (newErrors) => {
    console.log(errors.value, newErrors);
    errors.value = newErrors;
})

const clear = (input) => emit('clearError', input);
defineExpose({validate});

</script>


<style scoped>

</style>