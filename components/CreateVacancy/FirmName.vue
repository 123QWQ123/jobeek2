<template>
  <div class="input-row">
    <label for="remote-work">Название компании</label>
    <div class="input-wrapper">
        <input class="form-control" placeholder="Холдинг LLC" v-model="firm_activity" />
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();

const firm_activity = ref("");
</script>

<style scoped>

</style>