<template>
  <div class="education_item">
          <CreateResumeEducationDocumentsItem
                  v-if="selectedEducationDocs.length"
                  class="mb-2"
                  v-for="(item, index) in selectedEducationDocs" :item="item"
                  :key="item.id"
                  :id="item.id"
                  :title="item.title"
                  :organization="item.organization"
                  :url="item.url"
                  :end_year="item.end_year"
                  :errors="item.errors"
                  @update="updateItem"
                  @delete="deleteItem" />

          <button type="button" class="btn btn-primary" v-if="selectedEducationDocs.length === 0" @click="reset">Добавить</button>
          <button type="button" class="btn btn-primary" v-if="selectedEducationDocs.length !== 0" @click="create">Добавить еще</button>
  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";
import { v4 as uuidv4 } from "uuid";
const emit  = defineEmits(['update:modelValue']);
const props  = defineProps(['modelValue', 'errors']);
import {storeToRefs} from "pinia";
const dictionaryStore = useDictionaryStore();
const {getEducations} = dictionaryStore;
const {educations} = storeToRefs(dictionaryStore);
await getEducations();

const resetObject = {
    title: null,
    organization: null,
    url: null,
    end_year: null,
    errors: {},

};
const selectedEducationDocs = ref( props.modelValue ?? []);
watch(() => selectedEducationDocs.value, (newSelectedEducations) => {
    emit('update:modelValue', newSelectedEducations);
})

const errors = ref(props.errors ?? []);
watch(() => props.errors, (newData) => {
    const newItems = selectedEducationDocs.value;
    console.log(newData);
    selectedEducationDocs.value.map((item, index) => {
        newData?.map((error, errorIndex) => {
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
    console.log(newItems);
    errors.value = newItems;
})
const reset = () => {
    resetObject.id = uuidv4();
    selectedEducationDocs.value = [ resetObject ];
}
const create = () => {
    const newItems = selectedEducationDocs.value;
    resetObject.id = uuidv4();
    newItems.push(resetObject);
    selectedEducationDocs.value = newItems;
}


const updateItem = (id, newItem) => {
    console.log(id, newItem);
    const newItems = selectedEducationDocs.value.map(item => {
        if (item.id === id){
            return newItem;
        }
        return item;
    });
    selectedEducationDocs.value = newItems;
}
const deleteItem = (deleteItem) => {
    const newItems = selectedEducationDocs.value.filter((item) => item.id !== deleteItem);
    selectedEducationDocs.value = newItems;
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