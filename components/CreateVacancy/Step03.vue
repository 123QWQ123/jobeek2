<template>
    <div class="step step3 pb-3">
        <!--                      <p class="text-center mb-4">Третый этап</p>-->

        <CreateVacancyFirmName @set="updateState"></CreateVacancyFirmName>
        <div class="sep"> </div>
        <CreateVacancyFirmActivity @set="updateState"></CreateVacancyFirmActivity>
        <div class="sep"> </div>
        <CreateVacancyDescription @set="updateState"></CreateVacancyDescription>
        <div class="sep"> </div>

        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyHHAcceptKids v-model="hhState.accept_kids"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyHHAcceptTemporary v-model="hhState.accept_temporary"/>

            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyHHAcceptIncompleteResumes v-model="hhState.accept_incomplete_resumes"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyHHAcceptHandicapped v-model="hhState.accept_handicapped"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyHHAllowMessages v-model="hhState.allow_messages"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyHHResponseNotifcation v-model="hhState.response_notification"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyHHWithZP v-model="hhState.with_zp"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyHHWorkinDays v-model="hhState.working_days"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper--flex">
                <CreateVacancyHHWorkinTimeIntervals v-model="hhState.working_time_intervals"/>
            </div>
            <div class="input-wrapper--flex">
                <CreateVacancyHHWorkinTimeModes v-model="hhState.working_time_modes"/>
            </div>
        </div>
        <div class="sep"></div>
        <CreateVacancyHHResponseUrl v-model="hhState.response_url"/>
        <div class="sep"></div>
        <CreateVacancyVacancytype @set="updateState"></CreateVacancyVacancytype>
        <div class="sep"> </div>
        <CreateVacancyBillingType @set="updateState"></CreateVacancyBillingType>
        <div class="sep"> </div>

        <CreateVacancyNotifications @set="updateState"></CreateVacancyNotifications>
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