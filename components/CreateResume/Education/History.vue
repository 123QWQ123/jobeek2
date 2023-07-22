<template>
  <div class="education_item">
          <CreateResumeEducationItem
                  v-if="selectedEducations.length"
                  class="mb-2"
                  v-for="(item, index) in selectedEducations" :item="item"
                  :key="item.id"
                  :id="item.id"
                  :profession="item.profession"
                  :institute="item.institute"
                  :faculty="item.faculty"
                  :form="item.form"
                  :start_year="item.start_year"
                  :end_year="item.end_year"
                  :errors="item.errors"
                  @update="updateItem"
                  @delete="deleteItem" />

          <button type="button" class="btn btn-primary" v-if="selectedEducations.length === 0" @click="reset">Добавить</button>
          <button type="button" class="btn btn-primary" v-if="selectedEducations.length !== 0" @click="create">Добавить еще</button>
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

const currentItem = ref(0);


const resetObject = {
    id: 0,
    profession: null,
    institute: null,
    faculty: null,
    form: null,
    start_year: null,
    end_year: null,
    errors: {},
};

const selectedEducations = ref(props.modelValue ?? []);
watch(() => selectedEducations.value, (newData) => {
    console.log(newData);
  emit('update:modelValue', newData);
})
const errors = ref(props.errors ?? []);
watch(() => props.errors, (newData) => {
    const newItems = selectedEducations.value;
    selectedEducations.value.map((item, index) => {
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
})
const reset = () => {
    resetObject.id = uuidv4();
    selectedEducations.value = [ resetObject ];
}
const create = () => {
    const newItems = selectedEducations.value;
    resetObject.id = uuidv4();
    newItems.push(resetObject);
    currentItem.value = newItems.length - 1;
    selectedEducations.value = newItems;
}


const updateItem = (id, newItem) => {
    const newItems = selectedEducations.value.map(item => {
        if (item.id === id){
            return newItem;
        }
        return item;
    });
    selectedEducations.value = newItems;
}
const deleteItem = (deleteItem) => {
    const newItems = selectedEducations.value.filter((item) => item.id !== deleteItem);
    selectedEducations.value = newItems;
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