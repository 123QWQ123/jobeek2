<template>
  <div class="input-row">
    <label for="remote-work">Опыт работы</label>
    <div class="input-wrapper">
        <CustomSelect :options="experienceOptions" v-model="experience"></CustomSelect>
    </div>
  </div>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getExperiences} = vacancyStore;
const {experiences} = storeToRefs(vacancyStore);
await getExperiences();

const experienceOptions = computed(() => experiences.value.map(item => ({value: item.id, name: item.name})));

const experience = ref(76);
</script>

<style scoped>

</style>