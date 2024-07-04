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
const emit = defineEmits(['update:modelValue', 'clearError']);
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

const salary = reactive({
    amount: {
        val: null,
        isChecked: false,
        isValid: false,
    },
    currency: {
        val: null,
        isChecked: false,
        isValid: false,
    },
});

watch(() => props.modelValue, (newValue) => {
    salary.amount.val = newValue.amount;
    salary.currency.val = newValue.currency;
})
onMounted(() => {
    salary.amount.val = props.modelValue.amount;
    salary.currency.val = props.modelValue.currency;
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
    emit('update:modelValue', {amount: salary.amount.val, currency: salary.currency.val});
}
watch(salary, validate);
const skyBlueBG = {
    background: "#F5F8FA"
}
const errors = ref({});
watch(() => props.errors, (newErrors) => {
    errors.value = newErrors;
})

const clear = (input) => emit('clearError', input);
defineExpose({validate});

</script>


<style scoped>

</style>