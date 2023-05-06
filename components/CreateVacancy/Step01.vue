<template>
    <div class="step">
        {{state}}
        <!--                        <p class="text-center mb-4">первый этап</p>-->
        <CreateVacancyProvidersIntegration :hh="state.providers.hh" :superjob="state.providers.superjob" @set="updateState"></CreateVacancyProvidersIntegration>

        <div class="sep"> </div>
        <CreateVacancyName :is_valid="state.name.is_valid" @set="updateState"></CreateVacancyName>
        <div class="sep"> </div>
        <CreateVacancyFields :is_valid="state.specializations.is_valid" @set="updateState"></CreateVacancyFields>
        <div class="sep"> </div>
        <CreateVacancyAreas :is_valid="state.areas.is_valid" @set="updateState"></CreateVacancyAreas>
        <div class="sep"> </div>
        <CreateVacancyJobSalary :is_valid="state.salary.is_valid" @set="updateState" ref="jobSalary"></CreateVacancyJobSalary>
        <div class="sep"></div>
        <CreateVacancyContacts ref="contacts" @set="updateState"></CreateVacancyContacts>
        <div class="sep"></div>
        <CreateVacancyJobEmploymentAndEducation @set="updateState"></CreateVacancyJobEmploymentAndEducation>
        <div class="sep"> </div>
        <CreateVacancyGender @set="updateState"></CreateVacancyGender>
        <div class="sep"> </div>
        <CreateVacancyMaritalStatus @set="updateState"></CreateVacancyMaritalStatus>
        <div class="sep"> </div>

        <div class="w-box-foot">
            <div class="form-footer d-flex">
                <button type="button" id="nextBtn" @click="onSubmit">Далее</button>
            </div>
        </div>
    </div>

</template>

<script setup>
const emit = defineEmits(['set', 'next']);
const props = defineProps(['providers']);

const jobSalary = ref();
const contacts = ref();
const state =  reactive({
    providers: {
        val: {
            hh: props.providers.hh.is_connected ?? false,
            superjob: props.providers.superjob.is_connected ?? false,
        },
        type: 'object',
        is_valid: true,
        is_required: true,
        min: 1
    },
    name: {
        val: "",
        type: 'string',
        check: (prop, value, state) => {
            console.log(prop, value, state);
        },
        is_valid: true,
        is_required: true,
        min: 1,
    },
    specializations: {
        val: [],
        type: 'array',
        is_valid: true,
        is_required: false,
    },
    areas: {
        val: [],
        type: 'array',
        is_valid: true,
        is_required: false
    },
    salary: {
        val: {},
        type: 'object',
        is_valid: false,
        is_required: false,
        component: jobSalary,
        check: (prop, value, state) => {
            return state[prop].component.validate();
        }
    },
    contacts: {
        val: {},
        type: 'object',
        is_valid: true,
        is_required: false,
        component: contacts,
        check: (prop, value, state) => {
            return state[prop].component.validate();
        }
    },
    employment: {
        val: null,
        type: 'number',
        is_valid: true,
        is_required: false
    },
    education: {
        val: null,
        type: 'number',
        is_valid: false,
        is_required: false
    },
    gender: {
        val: null,
        type: 'number',
        is_valid: true,
        is_required: false
    },
    marital_status: {
        val: null,
        type: 'number',
        is_valid: true,
        is_required: false
    },
    is_checked: true,
});
const updateState = (prop, value) => {
    console.log(prop, value);
    state[prop].val = value;
}

const validate = () => {

    let filtered_keys = Object.keys(state).filter((item) => {
        const type = state[item].type;
        const value = state[item].val;
        const is_required = state[item].is_required;
        const min = state[item].min ?? 0;
        const check = state[item].check;
        console.log(check);
        if (item === 'is_checked'){
            return false;
        }
        console.log(item, type, typeof value)
        if (type === typeof value || is_required){
            let is_valid = true;
            if (type === 'array'){
                if (is_required){
                    if (value.length  < 1 || min > value.length)
                        is_valid = false;
                }
            }
            if (type === 'string'){
                if (is_required)
                {
                    if (is_required && value.length >= min)
                        is_valid = false;
                    else is_valid = false;
                }
            }
            if (type === 'object'){
                if (is_valid && check && check(item, value, state)) return true;
                else return false;
            }

            console.log(is_valid);

            if (is_valid && check && check(item, value, state)) return true;
            else return false;

        }
        return false;
    });


    console.log(filtered_keys);
    Object.keys(state).map(item => {
        if (item !== 'is_checked'){
            state[item].is_valid = filtered_keys.includes(item);
        }
        return item;
    });
}


const onSubmit = () => {
    validate();

    console.log(state);

    state.is_checked = true;
    // emit('next')
}
</script>

<style scoped>

</style>