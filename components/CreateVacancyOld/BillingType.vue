<template>
  <div class="input-row">
    <label for="remote-work">Тип оплаты(тариф)</label>
    <div class="input-wrapper">
        <CustomSelect :options="vacancyTypeOptions" v-model="vacancy_billing_type"></CustomSelect>
    </div>
  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['set']);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const dictionaryStore = useDictionaryStore();
const {getVacancyBillingTypes} = dictionaryStore;
const {vacancy_billing_types} = storeToRefs(dictionaryStore);
await getVacancyBillingTypes();

const vacancyTypeOptions = computed(() => vacancy_billing_types.value.map(item => ({value: item.id, name: item.name})));

const vacancy_billing_type = ref(50);
watch(vacancy_billing_type, (newValues) => {
    emit('set', 'billing_type', newValues);
})
</script>

<style scoped>

</style>