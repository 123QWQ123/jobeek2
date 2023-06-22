<template>

    <div class="w-box-body">
        <div class="" >
            <div class="" v-if="selectedItems.length">
                <CreateResumeForeignLanguagesItem
                    class="w-100 mb-2"
                    v-for="item in selectedItems" :item="item"
                    :key="item.id"
                    :id="item.id"
                    :language_id="item.language_id"
                    :level="item.level"
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

const emit  = defineEmits(['update:modelValue']);
const props  = defineProps({
    modelValue: {
        required: true,
       default: []
    }
});
import {v4 as uuidv4} from "uuid";

const dictionaryStore = useDictionaryStore();
const {getForeignLanguages, getLanguageLevels} = dictionaryStore;
await getForeignLanguages();
await getLanguageLevels();

const resetObject = {
    "language_id": null,
    "level": null,
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

watch(() => selectedItems.value, (newData) => {
  emit('update:modelValue', selectedItems.value);
})

onMounted(() => {
    if (selectedItems.value.length === 0){
        reset();
    }else{
        selectedItems.value = selectedItems.value.map(item => {
            item.id = uuidv4();
            return item;
        });
    }
})
</script>

<style scoped>

</style>