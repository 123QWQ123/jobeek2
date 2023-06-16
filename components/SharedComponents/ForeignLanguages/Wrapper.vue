<template>

    <div class="w-box-body">
        <div class="" >
            <div class="" v-if="selectedItems.length">
                <CreateResumeForeignLanguagesItem
                    class="w-100 mb-2"
                    :selected-items="selectedItems"
                    v-for="item in selectedItems" :item="item"
                    :key="item.id"
                    :id="item.id"
                    :language_id="item.language_id"
                    :language_level="item.language_level"
                    @update="updateItem"
                    @delete="deleteItem" />
            </div>
            <button type="button" class="btn btn-primary mt-2" v-else-if="selectedItems.length === 0" @click="reset">Добавить</button>
            <button type="button" class="btn btn-primary mt-2" v-if="selectedItems.length !== 0" @click="create">Добавить еще</button>
        </div>
    </div>

</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit  = defineEmits(['set']);
const props  = defineProps({
    modelValue: {
        required: true,
       default: []
    }
});
import {storeToRefs} from "pinia";
import {v4 as uuidv4} from "uuid";

const dictionaryStore = useDictionaryStore();
const {getForeignLanguages, getLanguageLevels} = dictionaryStore;
const {foreign_languages, language_levels} = storeToRefs(dictionaryStore);
await getForeignLanguages();
await getLanguageLevels();


const resetObject = {
    "language_id": null,
    "language_level": null,
};
const selectedItems = ref([]);

const reset = () => {
    resetObject.id = uuidv4();
    selectedItems.value = [ resetObject ];
}
const create = () => {
    const newItems = selectedItems.value;
    resetObject.id = uuidv4();
    newItems.push(resetObject);
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


onMounted(() => {
    reset();
})
</script>

<style scoped>

</style>