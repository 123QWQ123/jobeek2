<template>
  <div class="input-row">
    <label for="remote-work">Название компании</label>
    <div class="input-wrapper">
        <input class="form-control" placeholder="Холдинг LLC" v-model="firm_name" />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();

const firm_name = ref("");
watch(firm_name, (newValues) => {
    emit('set', 'firm_name', newValues);
})
</script>

<style scoped>

</style>