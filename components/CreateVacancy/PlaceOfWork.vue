<template>
  <div class="input-row">
    <label for="remote-work">Форнмат работы</label>
    <div class="input-wrapper">
        <CustomSelect :options="formatOptions" v-model="format_of_work"></CustomSelect>
    </div>
  </div>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getPlaceOfWorks} = vacancyStore;
const {place_of_works} = storeToRefs(vacancyStore);
await getPlaceOfWorks();

const formatOptions = computed(() => place_of_works.value.map(item => ({value: item.id, name: item.name})));

const format_of_work = ref(21);
</script>

<style scoped>

</style>