<template>
    <div class="row position-relative">
      <span class="position-absolute absoluted_icon" @click="deleteItem">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
      </span>
        <div class="col-12">
            <div class="c2 w-100">
                <div class="input-wrapper">
                    <SelectWithSearch :placeholder="'Выберите язык'" :options="languageOptions" v-model.number="state.language_id.val"></SelectWithSearch>

                    <div class="text-danger d-block" v-if="errors.language_id">
                        {{ errors.language_id }}
                    </div>
                </div>
                <div class="input-wrapper">
                    <CustomSelect :label="'Уровен'" :options="languageLevelOptions" v-model.number="state.level_id.val"></CustomSelect>

                    <div class="text-danger d-block" v-if="errors.level_id">
                        {{ errors.level_id }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {useDictionaryStore} from "~/store/dictionary";

const dictionaryStore = useDictionaryStore();

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
    language_id: {
        required: true,
        default: null
    },
    level_id: {
        required: true,
        default: null
    },
    errors: {
        required: true,
        default: {}
    },
});
const state = reactive({
    id: {
        val: props.id,
        isValid: true,
    },
    language_id: {
        val: props.language_id,
        isValid: true,
    },
    level_id: {
        val: props.level_id,
        isValid: true,
    },
});

const isNew = ref(props.isNew);

const languageOptions = computed(() => {
    return dictionaryStore.foreign_languages.map((item) => ({name: item.name, value: item.id}));
})
const languageLevelOptions = computed(() => {
    return dictionaryStore.language_levels.map((item) => ({name: item.name, value: item.id}));
})

const save = () => {
    emit('update', props.id, useFormData(state));
}

watch(() => state.language_id.val, save);
watch(() => state.level_id.val, save);
const deleteItem = (id = null) => {
    emit('delete', props.id);
}

onMounted(() => {
    state['id'].val = props.id;
    state['language_id'].val = props.language_id;
    state['level_id'].val = props.level_id;
    if (props.id){
        isNew.value = false;
    }
})

</script>

<style scoped>

.absoluted_icon{
    position: absolute;
    right: -2rem;
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