<template>
  <div class="input-row">
    <label for="remote-work">Возрасть</label>
    <div class="input-wrapper">
        <div class="c2">
            <input type="number" v-model="age.from" placeholder="От">
            <input type="number" v-model="age.to" placeholder="До">
        </div>
    </div>
  </div>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();

const age = ref({});
</script>

<style scoped>

</style>