<template>


    <div class="text-danger d-block p-4" v-if="errors?.message">
      {{ errors.message }}
    </div>
    <div class="education_item">
        <CreateResumeSocialNetworksItem
                class="mb-2"
                v-for="(item, index) in selectedContacts" :item="item"
                :key="item.id"
                :id="item.id"
                :type="item.type"
                :value="item.value"
                :errors="item.errors"
                @update="updateItem"
                @delete="deleteItem" />

        <button type="button" class="btn btn-primary" v-if="selectedContacts.length === 0" @click="reset">Добавить</button>
        <button type="button" class="btn btn-primary" v-if="selectedContacts.length !== 0" @click="create">Добавить еще</button>
    </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";
import { v4 as uuidv4 } from "uuid";
const emit  = defineEmits(['update:modelValue']);
const props  = defineProps({
    modelValue: {
        required: true,
    },
    errors: {
        required: true,
        default: null
    }
});
import {storeToRefs} from "pinia";
const dictionaryStore = useDictionaryStore();
const {getEducations} = dictionaryStore;
const {educations} = storeToRefs(dictionaryStore);
await getEducations();


const resetObject = {
    type: 'phone',
    value: "",
    errors: {},
};
const selectedContacts = ref( props.modelValue ?? []);
watch(() => selectedContacts.value, (newSelectedItems) => {
    emit('update:modelValue', newSelectedItems);
})

const errors = ref(props.errors ?? null);
watch(() => props.modelValue, (newData) => {
    selectedContacts.value = newData ?? [];
});
watch(() => props.errors, (newData) => {
    errors.value = newData;
    const newItems = selectedContacts.value;
    if (newData instanceof Array){
      selectedContacts.value.map((item, index) => {

        newData.map((error, errorIndex) => {
          if (errorIndex === index){
            if (!newItems[index]){
              newItems[index] = {};
            }
            if (!newItems[index].errors){
              newItems[index].errors = {};
            }
            Object.keys(error).map((errorKey) => {
              newItems[index].errors[errorKey] = error[errorKey];
            });
          }
        })
      })
      errors.value = newItems;
    }
})
const reset = () => {
    resetObject.id = uuidv4();
    selectedContacts.value = [ resetObject ];
}
const create = () => {
    const newItems = [...selectedContacts.value];
    resetObject.id = uuidv4();
    newItems.push(resetObject);
    selectedContacts.value = newItems;
}


const updateItem = (id, newItem) => {
    const newItems = selectedContacts.value.map(item => {
        if (item.id === id){
            return newItem;
        }
        return item;
    });
    selectedContacts.value = newItems;
}
const deleteItem = (deleteItem) => {
    const newItems = selectedContacts.value.filter((item) => item.id !== deleteItem);
    selectedContacts.value = newItems;
}


onMounted(() => {
    if (!props.modelValue.length){
        reset();
    }
})
</script>

<style scoped>

.education_item{
    margin-bottom: 2.5rem;
}
</style>