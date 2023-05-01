<template>
  <div class="input-row">
    <label for="remote-work">Опыт работы({{experience}})</label>
    <div class="d-flex flex-row justify-content-between align-content-center gap-2">
        <label class="radio-label form-control" v-for="item in experienceOptions" :class="{'active': experience === item.value}">
            <input class="hidden" type="radio" :value="item.value"  v-model="experience" />
            {{ item.name }}
        </label>
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
.radio-label{
    padding: 5px;
    text-align: center;
    cursor: pointer;
    color: #0A2540;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 20px rgba(28, 27, 98, 0.04);
}
.radio-label.active{
    background-color: #3e85f6;
    color: #F5F8FA;
}
.radio-label input.hidden{
    display: none;
}
</style>