<template>
    <div class="row position-relative empty-area">
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

const emit = defineEmits(['delete', 'update', 'update:modelValue'])
const props = defineProps({
    isNew: {
        required: false,
        default: false
    },
    index: {
        required: true,
        default: null
    },
    options: {
        required: true,
        default: null
    },
    yearOptions: {
        required: true,
        default: null
    },
});

const dictionaryStore = useDictionaryStore();

const items = ref(props.modelValue);
const isNew = ref(props.isNew);
const selectedItem = ref(props.id);

watch(() => selectedItem.value, (newSelectedItem) => {
    emit('update', props.id, {...state, id: newSelectedItem});
});

const deleteItem = (id = null) => {
    emit('delete', selectedItem.value);
}

onMounted(() => {
    if (props.id){
        isNew.value = false;
    }
});

const educationLevelOptions = computed(() => {
    return dictionaryStore.educations.map((item) => ({name: item.name, value: item.id}));
})

const state = ref({
    profession: {
        val: "",
        isValid: null,
    },
    institute: {
        val: "",
        isValid: null,
    },
    id_institute: {
        val: "",
        isValid: null,
    },
    faculty: {
        val: "",
        isValid: null,
    },
    form: {
        val: 54,
        isValid: null,
    },
    start_year: {
        val: "",
        isValid: null,
    },
    end_year: {
        val: "",
        isValid: null,
    },
});
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