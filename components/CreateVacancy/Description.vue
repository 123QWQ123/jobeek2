<template>
  <div class="input-row">
    <label for="remote-work">Описание</label>
    <div class="input-wrapper">
        <textarea class="form-control" rows="4" v-model="description"></textarea>
    </div>
  </div>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();

const description = ref("");
</script>

<style scoped>

</style>