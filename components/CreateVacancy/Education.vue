<template>
  <div class="input-row">
    <label for="remote-work">Образование</label>
    <div class="input-wrapper">
        <CustomSelect :options="educationOptions" v-model="education"></CustomSelect>

        <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">
            Выберите
        </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);
const props = defineProps(['is_valid']);
const isValid = computed(() => props.is_valid);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getEducations} = vacancyStore;
const {educations} = storeToRefs(vacancyStore);
await getEducations();

const educationOptions = computed(() => educations.value.map(item => ({value: item.id, name: item.name})));
const education = ref(54);

watch(education, (newValues) => {
    emit('set', 'education', newValues);
})
</script>

<style scoped>

</style>