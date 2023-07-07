<template>
  <div class="input-row">
    <label>Какой доход вы рассматриваете?</label>
    <div class="row-container">
      <div class="row">
        <div class="col-8">
            <div class="input-wrapper w-100">
                <input id="salary_from" type="number" v-model="salary.amount.val" placeholder="Укажите сумму" @focusin="$emit('clearError', 'salary_amount')">
                <div class="text-danger d-block" v-if="errors.salary_from">
                    {{ errors.salary_from }}
                </div>

                <div class="text-danger d-block" v-if="errors.until_today">
                    {{ errors.until_today }}
                </div>
            </div>
        </div>
        <div class="col-4">
            <CustomSelect class="skyBlueBG" :label="'Валюта'"
                          :options="currencyOptions"
                          :style="skyBlueBG" v-model="salary.currency.val"
                          @focusin="clear('salary_currency')"
                          ></CustomSelect>

            <div class="text-danger d-block" v-if="errors.salary_currency">
                {{ errors.salary_currency }}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'clear-error']);
const props = defineProps({
    modelValue: {
        required: true,
    },
    errors: {
        required: true,
        default: {}
    }
})
import {useCurrencyOptions} from "~/composables/useCurrencyOptions";
const currencyOptions = ref(useCurrencyOptions());

const {modelValue} = props;
const salary = reactive({
    amount: {
        val: modelValue.amount,
        isChecked: false,
        isValid: false,
    },
    currency: {
        val: modelValue.currency,
        isChecked: false,
        isValid: false,
    },
});

watch(() => props.modelValue, (newValue) => {
    salary.amount.val = newValue.amount;
    salary.currency.val = newValue.currency;
})
const validate = () => {
    salary.amount.isChecked = true;
    if (parseInt(salary.amount.val) > 0){
        salary.amount.isValid = true;
    }else{
        salary.amount.isValid = false;
    }
    salary.currency.isChecked = true;
    if (currencyOptions.value.includes(salary.currency.val)){
        salary.currency.isValid = true;
    }else{
        salary.currency.isValid = false;
    }
    console.log(salary.amount.val, salary.currency.val);
    emit('update:modelValue', {amount: salary.amount.val, currency: salary.currency.val});
}
watch(salary, validate);
defineExpose({validate});
const skyBlueBG = {
    background: "#F5F8FA"
}
const errors = ref({});
watch(() => props.errors, (newErrors) => {
    console.log(errors.value, newErrors);
    errors.value = newErrors;
})

const clear = (input) => emit('clear-error', input);
</script>


<style scoped>

</style>