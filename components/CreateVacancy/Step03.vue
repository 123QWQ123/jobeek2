<template>
    <div class="step pb-3">
        <!--                      <p class="text-center mb-4">Третый этап</p>-->

        <CreateVacancyFirmName @set="updateState"></CreateVacancyFirmName>
        <div class="sep"> </div>
        <CreateVacancyFirmActivity @set="updateState"></CreateVacancyFirmActivity>
        <div class="sep"> </div>
        <CreateVacancyDescription @set="updateState"></CreateVacancyDescription>
        <div class="sep"> </div>
        <CreateVacancyNotifications @set="updateState"></CreateVacancyNotifications>
        <div class="sep"> </div>

        <div class="c2">
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHAcceptKids v-model="hhState.accept_kids"/>
            </div>
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHAcceptTemporary v-model="hhState.accept_temporary"/>

            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHAcceptIncompleteResumes v-model="hhState.accept_incomplete_resumes"/>
            </div>
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHAcceptHandicapped v-model="hhState.accept_handicapped"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHAllowMessages v-model="hhState.allow_messages"/>
            </div>
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHResponseNotifcation v-model="hhState.response_notification"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHWithZP v-model="hhState.with_zp"/>
            </div>
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHWorkinDays v-model="hhState.working_days"/>
            </div>
        </div>
        <div class="sep"></div>
        <div class="c2">
            <div class="input-wrapper input-wrapper--flex">
                <CreateVacancyHHWorkinTimeIntervals v-model="hhState.working_time_intervals"/>
            </div>
            <div class="input-wrapper input-wrapper--flex">
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
    </div>
</template>

<script setup>
const emit = defineEmits(['set']);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getVacancyBillingTypes} = vacancyStore;
const {vacancy_billing_types} = storeToRefs(vacancyStore);
await getVacancyBillingTypes();

const vacancyTypeOptions = computed(() => vacancy_billing_types.value.map(item => ({value: item.id, name: item.name})));

const vacancy_billing_type = ref(50);
watch(vacancy_billing_type, (newValues) => {
    emit('set', 'billing_type', newValues);
})
</script>

<style scoped>

</style>