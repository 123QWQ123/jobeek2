<template>
  <div class="input-row">
    <label for="remote-work">Тип оплаты(тариф)</label>
    <div class="input-wrapper">
        <CustomSelect :options="vacancyTypeOptions" v-model="vacancy_billing_type"></CustomSelect>
    </div>
  </div>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getVacancyBillingTypes} = vacancyStore;
const {vacancy_billing_types} = storeToRefs(vacancyStore);
await getVacancyBillingTypes();

const vacancyTypeOptions = computed(() => vacancy_billing_types.value.map(item => ({value: item.id, name: item.name})));

const vacancy_billing_type = ref(50);
</script>

<style scoped>

</style>