<template>
  <div class="input-row">
    <label for="income">Какой доход вы рассматриваете?</label>
    <div class="row-container">
      <div class="row">
        <div class="col-8">
            <div class="input-wrapper w-100">
                <input id="salary_from" type="number" v-model="salary.amount.val" placeholder="Укажите сумму">
                <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !salary.amount.isValid && salary.amount.isChecked}">
                    Введите сумму
                </div>
            </div>
        </div>
        <div class="col-4">
            <CustomSelect class="skyBlueBG" :options="currencyOptions" :style="skyBlueBG" v-model="salary.currency.val"></CustomSelect>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);

import {useCurrencyOptions} from "~/composables/useCurrencyOptions";
const currencyOptions = ref(useCurrencyOptions());

const salary = reactive({
    amount: {
        val: null,
        isChecked: false,
        isValid: false,
    },
    currency: {
        val: 'RUB',
        isChecked: false,
        isValid: false,
    },
});

const validate = () => {
    salary.amount.isChecked = true;
    console.log(parseInt(salary.amount.val));
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
    emit('set', 'salary', {from: salary.amount.val, currency: salary.currency.val});
}
watch(salary, validate);
defineExpose({validate});
const skyBlueBG = {
    background: "#F5F8FA"
}
</script>


<style scoped>

</style>