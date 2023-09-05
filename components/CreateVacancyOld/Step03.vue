<template>
    <div class="step step3 pb-3">
        <!--                      <p class="text-center mb-4">Третый этап</p>-->

        <CreateVacancyOldFirmName @set="updateState"></CreateVacancyOldFirmName>
        <div class="sep"> </div>
        <CreateVacancyOldFirmActivity @set="updateState"></CreateVacancyOldFirmActivity>
        <div class="sep"> </div>
        <CreateVacancyOldDescription @set="updateState"></CreateVacancyOldDescription>
        <div class="sep"> </div>

        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHAcceptKids v-model="hhState.accept_kids"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHAcceptTemporary v-model="hhState.accept_temporary"/>

            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHAcceptIncompleteResumes v-model="hhState.accept_incomplete_resumes"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHAcceptHandicapped v-model="hhState.accept_handicapped"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHAllowMessages v-model="hhState.allow_messages"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHResponseNotifcation v-model="hhState.response_notification"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHWithZP v-model="hhState.with_zp"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHWorkinDays v-model="hhState.working_days"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHWorkinTimeIntervals v-model="hhState.working_time_intervals"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyOldHHWorkinTimeModes v-model="hhState.working_time_modes"/>
            </div>
        </div>
        <div class="sep"></div>
        <CreateVacancyOldHHResponseUrl v-model="hhState.response_url"/>
        <div class="sep"></div>
        <CreateVacancyOldVacancytype @set="updateState"></CreateVacancyOldVacancytype>
        <div class="sep"> </div>
        <CreateVacancyOldBillingType @set="updateState"></CreateVacancyOldBillingType>
        <div class="sep"> </div>

        <CreateVacancyOldNotifications @set="updateState"></CreateVacancyOldNotifications>
        <div class="sep"> </div>


        <div class="w-box-foot">
          <div class="form-footer d-flex">
            <button type="button" id="prevBtn" @click="goToPrevStep">Назад</button>
          </div>
        </div>
    </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['set', 'prev']);
import {storeToRefs} from "pinia";
const dictionaryStore = useDictionaryStore();
const {getVacancyBillingTypes} = dictionaryStore;
const {vacancy_billing_types} = storeToRefs(dictionaryStore);
await getVacancyBillingTypes();

const vacancyTypeOptions = computed(() => vacancy_billing_types.value.map(item => ({value: item.id, name: item.name})));

const hhState = reactive({});
const vacancy_billing_type = ref(50);
watch(vacancy_billing_type, (newValues) => {
    emit('set', 'billing_type', newValues);
});

const updateState = (name, value) => emit('set', name, value);

const goToPrevStep = () => {
  console.log(1);
  emit('prev');
}
</script>

<style>
.form-check-input{
  width: 1.5rem;
  height: 1.5rem;
}
.form-check-input~*{
  padding-left: 1rem;
}

@media (min-width: 768px) {

  .create-vacancy__form .step3 .c2{
    display: flex;
  }

  .create-vacancy__form .step3 .c2 > div{
    width: 50%;
    flex: 1;
    text-wrap: normal;
  }


}

.create-vacancy__form .step3 .c2 > div .check-block{
  white-space: normal;
  justify-content: start;
  align-items: center;
}

.create-vacancy__form .step3 .c2 > div .check-block label{
  white-space: normal;
}
</style>