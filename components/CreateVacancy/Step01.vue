<template>
    <div class="step">
        {{state}}
        <!--                        <p class="text-center mb-4">первый этап</p>-->
        <CreateVacancyProvidersIntegration :hh="state.providers.hh" :superjob="state.providers.superjob" @set="updateState"></CreateVacancyProvidersIntegration>

        <div class="sep"> </div>
        <CreateVacancyName  @set="updateState"></CreateVacancyName>
        <div class="sep"> </div>
        <CreateVacancyFieldsAndAreas @set="updateState"></CreateVacancyFieldsAndAreas>
        <div class="sep"> </div>
        <CreateVacancyJobSalary @set="updateState"></CreateVacancyJobSalary>
        <div class="sep"></div>
        <CreateVacancyContacts @set="updateState"></CreateVacancyContacts>
        <div class="sep"></div>
        <CreateVacancyJobEmploymentAndEducation @set="updateState"></CreateVacancyJobEmploymentAndEducation>
        <div class="sep"> </div>
        <CreateVacancyGender @set="updateState"></CreateVacancyGender>
        <div class="sep"> </div>
        <CreateVacancyMaritalStatus @set="updateState"></CreateVacancyMaritalStatus>
        <div class="sep"> </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['set']);
const props = defineProps(['providers']);

const state =  reactive({
    providers: {
        hh: props.providers.hh.is_connected ?? false,
        superjob: props.providers.superjob.is_connected ?? false,
        isValid: true
    },
    name: "",
    specializations: [],
    areas: [],
    salary: {},
    contacts: [],
    employment: null,
    education: null,
    gender: null,
    marital_status: null,
});
const updateState = (prop, value) => {
    console.log(prop, value);
    state[prop] = value;
}

</script>

<style scoped>

</style>