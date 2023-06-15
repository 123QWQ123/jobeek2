<template>
    <div class="row position-relative empty-area" @focusout="save">
      <span class="position-absolute absoluted_icon" @click="deleteItem">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
      </span>
        <div class="col-12">
            <div class="row">
                <div class="input-row">
                    <label for="position">Уровен образование<b>*</b></label>
                    <div class="input-wrapper">
                        <CustomSelect :options="educationLevelOptions" v-model="state.form.val" />
                    </div>
                </div>

                <div class="input-row">
                    <label for="position">Название специальность<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите специальность" required v-model="state.profession.val">
                    </div>
                </div>

                <div class="input-row">
                    <label for="position">Название заведения<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите заведения" required v-model="state.institute.val">
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Факультет<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите факультет" required v-model="state.faculty.val">
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Даты<b>*</b></label>
                    <div class="input-wrapper">

                        <div class="c2">
                            <div>
                                <CustomSelect :options="yearOptions" v-model="state.start_year.val" :label="'Начало'" />
                            </div>
                            <div>
                                <CustomSelect :options="yearOptions" v-model="state.end_year.val" :label="'Окончание'" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>

import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['delete', 'update'])
const props = defineProps({
    isNew: {
        required: false,
        default: false
    },
    id: {
        required: true,
        default: null
    },
    profession: {
        required: true,
        default: null
    },
    institute: {
        required: true,
        default: null
    },
    faculty: {
        required: true,
        default: null
    },
    form: {
        required: true,
        default: null
    },
    start_year: {
        required: true,
        default: null
    },
    end_year: {
        required: true,
        default: null
    },
});

const dictionaryStore = useDictionaryStore();

const isNew = ref(props.isNew);

watch(() => props, () => {
    state['id'] = props.id;
    state['profession'] = props.profession;
    state['institute'] = props.institute;
    state['faculty'] = props.faculty;
    state['form'] = props.form;
    state['start_year'] = props.start_year;
    state['end_year'] = props.end_year;
})
const deleteItem = (id = null) => {
    emit('delete', props.id);
}

onMounted(() => {
    if (props.index){
        isNew.value = false;
    }
});

const state = reactive({
    id: {
        val: props.id,
        isValid: null,
    },
    profession: {
        val: props.profession,
        isValid: null,
    },
    institute: {
        val: props.institute,
        isValid: null,
    },
    faculty: {
        val: props.faculty,
        isValid: null,
    },
    form: {
        val: props.form,
        isValid: null,
    },
    start_year: {
        val: props.start_year,
        isValid: null,
    },
    end_year: {
        val: props.end_year,
        isValid: null,
    },
});


const educationLevelOptions = computed(() => {
    return dictionaryStore.educations.map((item) => ({name: item.name, value: item.id}));
})
const yearOptions = computed(() => useYearOptions())
const save = () => {
    emit('update', props.id, useFormData(state));
}

</script>

<style scoped>

.absoluted_icon{
    position: absolute;
    left: -.5rem;
    top: 0.5rem;
    font-size: 1rem;
    z-index: 1;
    cursor: pointer;
    max-width: 3rem;
}
.absoluted_icon svg{
    width: 24px;
    height: 24px;
}
</style>