<template>
    <div class="step">
<!--        {{state}}-->
        <!--                        <p class="text-center mb-4">первый этап</p>-->
<!--        <CreateVacancyProvidersIntegration-->
<!--            :is_valid="state.providers.is_valid"-->
<!--            :hh="state.providers.val.hh"-->
<!--            :superjob="state.providers.val.superjob"-->
<!--            @set="updateState"-->
<!--        />-->

<!--        <div class="sep"> </div>-->
        <CreateVacancyName :is_valid="state.name.is_valid" @set="updateState"></CreateVacancyName>
        <div class="sep"> </div>
        <CreateVacancyFields :is_valid="state.specializations.is_valid" @set="updateState"></CreateVacancyFields>
        <div class="sep"> </div>
        <CreateVacancyAreas :is_valid="state.areas.is_valid" @set="updateState"></CreateVacancyAreas>
        <div class="sep"> </div>
        <CreateVacancyJobSalary :is_valid="state.salary.is_valid" @set="updateState" ref="jobSalary"></CreateVacancyJobSalary>
        <div class="sep"></div>
        <CreateVacancyContacts ref="contacts" :is_valid="state.contacts.is_valid" @set="updateState"></CreateVacancyContacts>
        <div class="sep"></div>
        <CreateVacancyJobEmployment :is_valid="state.employment.is_valid" @set="updateState"></CreateVacancyJobEmployment>
        <div class="sep"> </div>
        <CreateVacancyEducation :is_valid="state.education.is_valid" @set="updateState"></CreateVacancyEducation>
        <div class="sep"> </div>
        <CreateVacancyGender :is_valid="state.education.is_valid" @set="updateState"></CreateVacancyGender>
        <div class="sep"> </div>
        <CreateVacancyMaritalStatus :is_valid="state.education.is_valid" @set="updateState"></CreateVacancyMaritalStatus>
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
        check: (prop, value, state) => {
            console.log(value.hh, value.superjob);
            if (value.hh === true || value.superjob === true) return true;
            else return false;
        },
        is_required: true,
        min: 1
    },
    name: {
        val: "",
        type: 'string',
        check: (prop, value, state) => {
            console.log(prop, value, state);
            console.log(value.length);
            return value.length >= state[prop].min;
        },
        is_valid: true,
        is_required: true,
        min: 1
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
        is_required: true,
        component: jobSalary,
        check: (prop, value, state) => {
            return state[prop].component.validate();
        }
    },
    contacts: {
        val: {},
        type: 'object',
        is_valid: true,
        is_required: true,
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
        is_valid: true,
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
    state[prop].val = value;
    reset(prop);
}

const reset = (name) => {
    console.log(name);
    state[name].is_valid = true;
}

const validate = () => {

    let filtered_keys = Object.keys(state).filter((item) => {
        const type = state[item].type;
        const value = state[item].val;
        const is_required = state[item].is_required;
        const min = state[item].min ?? 0;
        const check = state[item].check;
        if (item === 'is_checked'){
            return false;
        }
        if (is_required){
            if (type === typeof value){
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
                        if (!value || value.length < min)
                            is_valid = false;
                    }
                }
                if (check){
                    if (check(item, value, state)) return true;
                    else return false;
                } else return is_valid;
            }
            else{
                return false;
            }
        }
        return true;
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