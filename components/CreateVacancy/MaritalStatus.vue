<template>
  <div class="input-row">
    <label for="remote-work">Семейное положение</label>
    <div class="input-wrapper">
        <CustomSelect :options="maritalStatusOptions" v-model="marital_status"></CustomSelect>

        <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">
            Выберите
        </div>
    </div>
  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['set']);
const props = defineProps(['is_valid']);
const isValid = computed(() => props.is_valid);

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const dictionaryStore = useDictionaryStore();
const {getMaritalStatus} = dictionaryStore;
const {marital_statuses} = storeToRefs(dictionaryStore);
await getMaritalStatus();

const maritalStatusOptions = computed(() => marital_statuses.value.map(item => ({value: item.id, name: item.name})));

const marital_status = ref(18);


watch(marital_status, (newValues) => {
    emit('set', 'marital_status', newValues);
})
</script>

<style scoped>

</style>