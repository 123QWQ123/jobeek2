<template>
  <div class="input-row">
    <label for="remote-work">Формат работы({{format_of_work}})</label>
    <div class="input-wrapper">
<!--        <CustomSelect :options="formatOptions" v-model="format_of_work"></CustomSelect>-->
        <CustomRadio :options="formatOptions" v-model="format_of_work"></CustomRadio>
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

console.log(place_of_works);

const formatOptions = computed(() => place_of_works.value.map(item => ({value: item.id, name: item.name})));

const format_of_work = ref(21);

watch(format_of_work, (newFormat) => {
    // console.log(newFormat);
})
</script>

<style scoped>

</style>