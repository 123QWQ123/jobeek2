<template>
  <div class="input-row">
    <label for="remote-work">Дети</label>
    <div class="input-wrapper">
        <CustomSelect :options="childrenOptions" v-model="children"></CustomSelect>
    </div>
  </div>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getChildren} = vacancyStore;
const {childrens} = storeToRefs(vacancyStore);
await getChildren();

const childrenOptions = computed(() => childrens.value.map(item => ({value: item.id, name: item.name})));

const children = ref(15);
</script>

<style scoped>

</style>