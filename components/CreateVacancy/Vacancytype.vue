<template>
  <div class="input-row">
    <label for="remote-work">Тип вакансии</label>
    <div class="input-wrapper">
        <CustomSelect :options="vacancyTypeOptions" v-model="vacancy_type"></CustomSelect>
    </div>
  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['set']);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const dictionaryStore = useDictionaryStore();
const {getVacancyTypes} = dictionaryStore;
const {vacancy_types} = storeToRefs(dictionaryStore);
await getVacancyTypes();

const vacancyTypeOptions = computed(() => vacancy_types.value.map(item => ({value: item.id, name: item.name})));

const vacancy_type = ref(46);

watch(vacancy_type, (newValues) => {
    emit('set', 'vacancy_type', newValues);
});
</script>

<style scoped>

</style>