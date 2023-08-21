<template>
    <div class="step d-block">
        <!--                        <p class="text-center mb-4">Второй этап</p>-->

        <CreateVacancyChildren @set="updateState"></CreateVacancyChildren>
        <div class="sep"> </div>
        <CreateVacancyExperience2 @set="updateState"></CreateVacancyExperience2>
        <div class="sep"> </div>
        <CreateVacancyPlaceOfWork @set="updateState"></CreateVacancyPlaceOfWork>
        <div class="sep"> </div>
        <CreateVacancyLicenses @set="updateState"></CreateVacancyLicenses>
        <div class="sep"> </div>
        <CreateVacancySkills @set="updateState"></CreateVacancySkills>
        <div class="sep"> </div>
        <CreateVacancyAge @set="updateState"></CreateVacancyAge>
        <div class="sep"> </div>
        <CreateVacancyForeignLanguages @set="updateState"></CreateVacancyForeignLanguages>
        <div class="sep"> </div>


        <div class="w-box-foot">
            <div class="form-footer d-flex">
                <button type="button" id="prevBtn" @click="goToPrevStep">Назад</button>
                <button type="button" id="nextBtn" @click="goToNextStep">Далее</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['set', 'prev']);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getVacancyBillingTypes} = useDictionaryStore();
const {vacancy_billing_types} = storeToRefs(vacancyStore);
await getVacancyBillingTypes();

const vacancyTypeOptions = computed(() => vacancy_billing_types.value.map(item => ({value: item.id, name: item.name})));

const vacancy_billing_type = ref(50);
watch(vacancy_billing_type, (newValues) => {
    emit('set', 'billing_type', newValues);
});

const updateState = (name, value) => emit('set', name, value);


const goToPrevStep = () => {
  emit('prev');
}
</script>

<style scoped>

</style>