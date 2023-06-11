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
                    <label for="position">Название<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите" v-model="state.title.val">
                    </div>
                </div>

                <div class="input-row">
                    <label for="position">Организация, проводившая обучение<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите заведения" v-model="state.organization.val">
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Ссылка на электронный сертификат<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите факультет" v-model="state.certificate_url.val">
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Год окончания<b>*</b></label>
                    <div class="input-wrapper">
                        <div>
                            <CustomSelect :options="useYearOptions()" v-model="state.end_year.val" :label="'Выбрать'" />
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
    title: {
        required: true,
        default: null
    },
    organization: {
        required: true,
        default: null
    },
    certificate_url: {
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
    state['title'] = props.title;
    state['organization'] = props.organization;
    state['certificate_url'] = props.certificate_url;
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
    title: {
        val: props.title,
        isValid: null,
    },
    organization: {
        val: props.organization,
        isValid: null,
    },
    certificate_url: {
        val: props.certificate_url,
        isValid: null,
    },
    end_year: {
        val: props.end_year,
        isValid: null,
    },
});


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