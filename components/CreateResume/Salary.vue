<template>
  <div class="input-row">
    <label>Какой доход вы рассматриваете?</label>
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
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        required: true,
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
    emit('update:modelValue', {amount: salary.amount.val, currency: salary.currency.val});
}
watch(salary, validate);
defineExpose({validate});
const skyBlueBG = {
    background: "#F5F8FA"
}
</script>


<style scoped>

</style>