<template>
  <div class="input-row">
    <label for="remote-work">Дети</label>
    <div class="input-wrapper">
        <CustomSelect :options="childrenOptions" v-model="children"></CustomSelect>
    </div>
  </div>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
import {useDictionaryStore} from "~/store/dictionary";
const dictionaryStore = useDictionaryStore();
const {getChildren} = dictionaryStore;
const {children: childrens} = storeToRefs(dictionaryStore);
await getChildren();

const childrenOptions = computed(() => childrens.value.map(item => ({value: item.id, name: item.name})));
console.log(childrenOptions);

const children = ref(15);

watch(children, (newValues) => {
    emit('set', 'children', newValues);
})
</script>

<style scoped>

</style>