<template>
  <div class="education_item">
    <CreateResumeEducationItem
        v-if="selectedEducations.length"
        class="mb-2"
        v-for="(item, index) in selectedLanguages" :item="item"
        :key="item.id"
        :id="item.id"
        :profession="item.profession"
        :institute="item.institute"
        :faculty="item.faculty"
        :form="item.form"
        :start_year="item.start_year"
        :end_year="item.end_year"
        @update="updateItem"
        @delete="deleteItem" />

    <button type="button" class="btn btn-primary" v-if="selectedLanguages.length === 0" @click="reset">Добавить</button>
    <button type="button" class="btn btn-primary" v-if="selectedLanguages.length !== 0" @click="create">Добавить еще</button>
  </div>
</template>

<script setup>


import {useDictionaryStore} from "~/store/dictionary";
import { v4 as uuidv4 } from "uuid";
const emit  = defineEmits(['set']);
import {storeToRefs} from "pinia";
const dictionaryStore = useDictionaryStore();
const {getEducations} = dictionaryStore;
const {educations} = storeToRefs(dictionaryStore);
await getEducations();

const currentItem = ref(0);


const resetObject = {
  "id": 0,
  "profession": null,
  "institute": null,
  "faculty": null,
  "form": null,
  "start_year": null,
  "end_year": null,
};
const selectedLanguages = ref([]);

const reset = () => {
  resetObject.id = uuidv4();
  selectedLanguages.value = [ resetObject ];
}
const create = () => {
  const newItems = selectedLanguages.value;
  resetObject.id = uuidv4();
  newItems.push(resetObject);
  currentItem.value = newItems.length - 1;
  selectedLanguages.value = newItems;
}


const updateItem = (id, newItem) => {
  const newItems = selectedLanguages.value.map(item => {
    if (item.id === id){
      return newItem;
    }
    return item;
  });
  selectedLanguages.value = newItems;
}
const deleteItem = (deleteItem) => {
  const newItems = selectedLanguages.value.filter((item) => item.id !== deleteItem);
  selectedLanguages.value = newItems;
}



onMounted(() => {
  reset();
})
</script>

<style scoped>

.education_item{
  margin-bottom: 2.5rem;
}
</style>