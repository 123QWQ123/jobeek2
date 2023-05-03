<template>
  <div class="input-row">
    <label for="remote-work">Описание</label>
    <div class="input-wrapper">
        <textarea class="form-control" rows="4" v-model="description"></textarea>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();

const description = ref("");
watch(description, (newValues) => {
    emit('set', 'description', newValues);
})
</script>

<style scoped>

</style>