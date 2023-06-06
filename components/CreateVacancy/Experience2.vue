<template>
  <div class="input-row">
    <label for="remote-work">Опыт работы({{experience}})</label>
    <CustomRadio :options="experienceOptions" v-model="experience"></CustomRadio>
  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['set']);
import {storeToRefs} from "pinia";
const dictionaryStore = useDictionaryStore();
const {getExperiences} = dictionaryStore;
const {experiences} = storeToRefs(dictionaryStore);
await getExperiences();

const experienceOptions = computed(() => experiences.value.map(item => ({value: item.id, name: item.name})));

const experience = ref(76);
watch(experience, (newValues) => {
    emit('set', 'experience', newValues);
});
</script>

<style scoped>
</style>