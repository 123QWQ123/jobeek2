<template>
  <div class="education_item">
          <CreateResumeEducationItem
                  v-if="selectedEducations.length"
                  class="mb-2"
                  :selected-educations="selectedEducations"
                  v-for="(item, index) in selectedEducations" :item="item"
                  :index="index"
                  :key="index"
                  :options="educationLevelOptions"
                  :year-options="yearOptions"
                  @update="updateItem"
                  @delete="deleteItem" />

          <button type="button" class="btn btn-primary" v-if="selectedEducations.length === 0" @click="reset">Добавить</button>
          <button type="button" class="btn btn-primary" v-if="selectedEducations.length !== 0" @click="create">Добавить еще</button>
  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit  = defineEmits(['set']);
import {storeToRefs} from "pinia";
import {useYearOptions} from "~/composables/useYearOptions";
const dictionaryStore = useDictionaryStore();
const {getEducations} = dictionaryStore;
const {educations} = storeToRefs(dictionaryStore);
await getEducations();

const educationLevelOptions = computed(() => {
    return dictionaryStore.educations.map((item) => ({name: item.name, value: item.id}));
})

const yearOptions = ref(useYearOptions());
const currentItem = ref(0);
const resetObject = {
    "id": 0,
    "profession": null,
    "institute": null,
    "id_institute": null,
    "faculty": null,
    "form": null,
    "start_year": null,
    "end_year": null,
};
const selectedEducations = ref([resetObject]);

const reset = () => {
    selectedEducations.value = [resetObject];
}
const create = () => {
    const newItems = selectedEducations.value;
    newItems.push({
        "id": newItems.length,
        ...resetObject
    });
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
    const newItems = selectedEducations.value.filter(item => item.id !== deleteItem);
    selectedEducations.value = newItems;
}

watch(selectedEducations, (newValues) => {
    emit('set', 'educations', newValues);
});

</script>

<style scoped>

.education_item{
    margin-bottom: 2.5rem;
}
</style>