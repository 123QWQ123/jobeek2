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
                    <label for="position">Должность<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите специальность" required v-model="state.profession.val">
                    </div>
                </div>

                <div class="input-row">
                    <label for="position">Название компании<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите заведения" required v-model="state.company.val">
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Ссылка на сайт компании<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите факультет" required v-model="state.company_url.val">
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Даты<b>*</b></label>
                    <div class="input-wrapper">

                        <div class="c2">
                            <div>
                                <CustomSelect :options="yearOptions" v-model="state.start_year.val" :label="'Начало года'" />
                            </div>
                            <div>
                                <CustomSelect :options="monthOptions" v-model="state.start_month.val" :label="'Начало месяца '" />
                            </div>
                        </div>
                        <div class="c2 mt-2">
                            <div>
                                <CustomSelect :options="yearOptions" v-model="state.start_year.val" :label="'Окончание года'" />
                            </div>
                            <div>
                                <CustomSelect :options="monthOptions" v-model="state.start_month.val" :label="'Окончание месяца '" />
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
    company: {
        required: true,
        default: null
    },
    company_url: {
        required: true,
        default: null
    },
    type: {
        required: true,
        default: null
    },
    start_month: {
        required: true,
        default: null
    },
    end_month: {
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
    company: {
        val: props.company,
        isValid: null,
    },
    company_url: {
        val: props.company_url,
        isValid: null,
    },
    type: {
        val: props.type,
        isValid: null,
    },
    start_month: {
        val: props.start_month,
        isValid: null,
    },
    end_month: {
        val: props.end_month,
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

const yearOptions = computed(() => useYearOptions())
const monthOptions = computed(() => useMonthOptions())
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