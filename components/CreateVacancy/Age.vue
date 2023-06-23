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
const emit = defineEmits(['set']);
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();

const age = reactive({});

watch(age, (newValues) => {
    emit('set', 'age_from', newValues.from);
    emit('set', 'age_to', newValues.to);
})
</script>

<style scoped>

</style>