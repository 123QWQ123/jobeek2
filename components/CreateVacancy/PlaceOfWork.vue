<template>
  <div class="input-row">
    <label for="remote-work">Формат работы({{place_of_work}})</label>
    <div class="input-wrapper">
<!--        <CustomSelect :options="formatOptions" v-model="format_of_work"></CustomSelect>-->
        <CustomRadio :options="formatOptions" v-model="place_of_work"></CustomRadio>
    </div>
  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['set']);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const dictionaryStore = useDictionaryStore();
const {getPlaceOfWorks} = dictionaryStore;
const {place_of_works} = storeToRefs(dictionaryStore);
await getPlaceOfWorks();

const formatOptions = computed(() => place_of_works.value.map(item => ({value: item.id, name: item.name})));

const place_of_work = ref(21);

watch(place_of_work, (newValues) => {
    emit('set', 'place_of_work', newValues);
});
</script>

<style scoped>

</style>