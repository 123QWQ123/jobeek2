<template>
  <div class="input-row">
    <label for="remote-work">Семейное положение</label>
    <div class="input-wrapper">
        <CustomSelect :options="maritalStatusOptions" v-model="marital_status"></CustomSelect>
    </div>
  </div>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getMaritalStatus} = vacancyStore;
const {marital_statuses} = storeToRefs(vacancyStore);
await getMaritalStatus();

const maritalStatusOptions = computed(() => marital_statuses.value.map(item => ({value: item.id, name: item.name})));

const marital_status = ref(18);
</script>

<style scoped>

</style>