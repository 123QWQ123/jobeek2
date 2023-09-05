<template>
    <div class="step d-block">
        <!--                        <p class="text-center mb-4">Второй этап</p>-->

        <CreateVacancyOldChildren @set="updateState"></CreateVacancyOldChildren>
        <div class="sep"> </div>
        <CreateVacancyOldExperience2 @set="updateState"></CreateVacancyOldExperience2>
        <div class="sep"> </div>
        <CreateVacancyOldPlaceOfWork @set="updateState"></CreateVacancyOldPlaceOfWork>
        <div class="sep"> </div>
        <CreateVacancyOldLicenses @set="updateState"></CreateVacancyOldLicenses>
        <div class="sep"> </div>
        <CreateVacancyOldSkills @set="updateState"></CreateVacancyOldSkills>
        <div class="sep"> </div>
        <CreateVacancyOldAge @set="updateState"></CreateVacancyOldAge>
        <div class="sep"> </div>
        <CreateVacancyOldForeignLanguages @set="updateState"></CreateVacancyOldForeignLanguages>
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