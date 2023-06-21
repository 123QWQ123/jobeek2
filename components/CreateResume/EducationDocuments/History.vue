<template>
  <div class="education_item">
          <CreateResumeEducationDocumentsItem
                  v-if="selectedEducations.length"
                  class="mb-2"
                  v-for="(item, index) in selectedEducations" :item="item"
                  :key="item.id"
                  :id="item.id"
                  :title="item.title"
                  :organization="item.organization"
                  :certificate_url="item.url"
                  :end_year="item.end_year"
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
const props  = defineProps(['modelValue']);
import {storeToRefs} from "pinia";
const dictionaryStore = useDictionaryStore();
const {getEducations} = dictionaryStore;
const {educations} = storeToRefs(dictionaryStore);
await getEducations();

const resetObject = {
    "title": null,
    "organization": null,
    "url": null,
    "end_year": null,
};
const selectedEducations = ref( props.modelValue ?? []);
watch(() => selectedEducations.value, (newSelectedEducations) => {
  emit('update:modelValue', newSelectedEducations);
})
const reset = () => {
    resetObject.id = uuidv4();
    selectedEducations.value = [ resetObject ];
}
const create = () => {
    const newItems = selectedEducations.value;
    resetObject.id = uuidv4();
    newItems.push(resetObject);
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