<template>
  <div class="education_item">
          <CreateResumeWorkExperienceItem
                  v-if="selectedEducations.length"
                  class="mb-2"
                  v-for="(item, index) in selectedEducations" :item="item"
                  :key="item.id"
                  :id="item.id"
                  :profession="item.profession"
                  :company="item.company"
                  :company_url="item.company_url"
                  :type="item.type"
                  :start_month="item.start_month"
                  :start_year="item.start_year"
                  :end_month="item.end_month"
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
const emit  = defineEmits(['set']);
import {storeToRefs} from "pinia";
const dictionaryStore = useDictionaryStore();
const {getEducations} = dictionaryStore;
const {educations} = storeToRefs(dictionaryStore);
await getEducations();

const currentItem = ref(0);


const resetObject = {
    "profession": null,
    "company": null,
    "company_url": null,
    "industry": null,
    "town_id": null,
    "type": null,
    "start_month": null,
    "end_month": null,
    "start_year": null,
    "end_year": null,
};
const selectedEducations = ref([]);

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
    reset();
})
</script>

<style scoped>

.education_item{
    margin-bottom: 2.5rem;
}
</style>