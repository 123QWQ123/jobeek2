<template>
  <div class="input-row">
    <label for="income">Какой ЗП вы предложите (₽)?</label>
    <div class="row-container">
        {{salary}}
      <div class="c3">
        <div class="input-wrapper w-auto">
          <input id="salary_from" type="number" v-model.number="salary.from.val" placeholder="От">
          <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !salary.from.isValid && salary.from.isChecked}">
              введите только цифры
          </div>
        </div>
        <div class="input-wrapper w-auto">
          <input id="salary_to" type="number" v-model.number="salary.to.val" placeholder="До">
            <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !salary.to.isValid && salary.to.isChecked}">
                введите только цифры
            </div>
        </div>
        <div class="input-wrapper ms-auto">
            <CustomSelect class="skyBlueBG" :options="currencyOptions" :style="skyBlueBG" v-model="salary.currency"></CustomSelect>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);

import {useCurrencyOptions} from "~/composables/useCurrencyOptions";

const currencyOptions = useCurrencyOptions();

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
    currency: 'RUB',
});
watch(salary, () => {
    salary.from.isChecked = true;
    if (!salary.from.val instanceof Number){
        salary.from.isValid = false;
    }else{
        salary.from.isValid = true;
    }
    if (!salary.to.val instanceof Number){
        salary.to.isValid = false;
    }else{
        salary.to.isValid = true;
    }
    emit('set', 'salary', {from: salary.from.val, to: salary.to.val, currency: salary.currency});
});


const skyBlueBG = {
    background: "#F5F8FA"
}
</script>


<style scoped>

</style>