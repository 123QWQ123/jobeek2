<template>
  <div class="input-row">
    <label for="remote-work">Пол</label>
    <div class="input-wrapper">
        <CustomSelect :options="genderOptions" v-model="gender"></CustomSelect>

        <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">
            Введите название вакансий
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
const {getGenders} = vacancyStore;
const {genders} = storeToRefs(vacancyStore);
await getGenders();

console.log(genders);

const genderOptions = computed(() => genders?.value.map(item => ({value: item.id, name: item.name})));

const gender = ref(12);

watch(gender, (newValues) => {
    emit('set', 'gender', newValues);
})
</script>

<style scoped>

</style>