<template>
        <div class="row position-relative ps-4">

            <span class="position-absolute absoluted_icon" @click="deleteItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
            <div class="input-row">
                <div class="add-row-select">
                    <CustomSelect :options="contactOptions" v-model="state.type.val"></CustomSelect>

                </div>
                <div class="input-wrapper col-12">

                    <input type="text" placeholder="" v-model="state.value.val">
                    <div class="text-danger d-block" v-if="errors.value">
                      {{errors.value}}
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
import {useContactOptions} from "~/composables/useContactOptions";

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
    type: {
        required: true,
        default: null
    },
    value: {
        required: true,
        default: null
    },
    errors: {
        required: true,
        default: {}
    },
});

const contactOptions = useContactOptions();

const contacts = ref([]);


const errors = ref(props.errors);
watch(() => props.errors, (newErrors) => {
    errors.value = newErrors;
});

const dictionaryStore = useDictionaryStore();

const isNew = ref(props.isNew);

const deleteItem = (id = null) => {
    emit('delete', props.id);
}

onMounted(() => {
    if (props.index){
        isNew.value = false;
    }
});

const state = reactive({
    type: {
        val: props.type,
        isValid: null,
    },
    value: {
        val: props.value,
        isValid: null,
    },
});
const save = () => {
    emit('update', props.id, {type: state.type.val, value: state.value.val, id: props.id});
}
// watch(() => useWatchStateValues(state), save);
watch(() => state.type.val, save);
watch(() => state.value.val,save);
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