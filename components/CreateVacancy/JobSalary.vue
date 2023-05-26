<template>
  <div class="input-row">
    <label for="income">Какой ЗП вы предложите (₽)?</label>
    <div class="row-container">
      <div class="c3">
        <div class="input-wrapper w-auto">
          <input id="salary_from" type="number" v-model="salary.from.val" placeholder="От">
          <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !salary.from.isValid && salary.from.isChecked}">
              Введите стартовую вилку
          </div>
        </div>
        <div class="input-wrapper w-auto">
          <input id="salary_to" type="number" v-model.number="salary.to.val" placeholder="До">
            <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !salary.to.isValid && salary.to.isChecked}">
                Введите больше чем от
            </div>
        </div>
        <div class="input-wrapper ms-auto">
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
    to: {
        val: null,
        isChecked: false,
        isValid: false,
    },
    from: {
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
    salary.from.isChecked = true;
    console.log(parseInt(salary.from.val));
    if (parseInt(salary.from.val) > 0){
        salary.from.isValid = true;
    }else{
        salary.from.isValid = false;
    }
    salary.to.isChecked = true;
    if (salary.to.val == "" || parseInt(salary.to.val) > parseInt(salary.from.val)){
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
    emit('set', 'salary', {from: salary.from.val, to: salary.to.val, currency: salary.currency.val});
}
watch(salary, validate);
defineExpose({validate});
const skyBlueBG = {
    background: "#F5F8FA"
}
</script>


<style scoped>

</style>