<template>
  <div class="education_item">
          <CreateResumeWorkExperienceItem
                  v-if="selectedItems.length"
                  class="mb-2"
                  v-for="(item, index) in selectedItems" :item="item"
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
                  :responsibilities="item.responsibilities"
                  :achievements="item.achievements"
                  :industry="item.industry"
                  :until_today="!!item.until_today"
                  @update="updateItem"
                  @delete="deleteItem" />

          <button type="button" class="btn btn-primary" v-if="selectedItems.length === 0" @click="reset">Добавить</button>
          <button type="button" class="btn btn-primary" v-if="selectedItems.length !== 0" @click="create">Добавить еще</button>
  </div>
</template>

<script setup>


import {useDictionaryStore} from "~/store/dictionary";
import { v4 as uuidv4 } from "uuid";
const emit  = defineEmits(['update:modelValue']);
const props  = defineProps(['modelValue']);
const dictionaryStore = useDictionaryStore();

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
    "responsibilities": null,
    "achievements": null,
};
const selectedItems = ref(props.modelValue ?? []);

const reset = () => {
    resetObject.id = uuidv4();
  selectedItems.value = [ resetObject ];
}
const create = () => {
    const newItems = selectedItems.value;
    resetObject.id = uuidv4();
    newItems.push(resetObject);
    currentItem.value = newItems.length - 1;
  selectedItems.value = newItems;
}


const updateItem = (id, newItem) => {
    const newItems = selectedItems.value.map(item => {
        if (item.id === id){
            return newItem;
        }
        return item;
    });
    selectedItems.value = newItems;
}
const deleteItem = (deleteItem) => {
    const newItems = selectedItems.value.filter((item) => item.id !== deleteItem);
  selectedItems.value = newItems;
}

watch(() => selectedItems.value, (newValue) => emit('update:modelValue', newValue));

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