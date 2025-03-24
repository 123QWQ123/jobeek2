<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit  = defineEmits(['update:modelValue']);
const props  = defineProps({
    modelValue: {
        required: true,
       default: []
    },
    errors: {
        default: []
    }
});
import {v4 as uuidv4} from "uuid";
import {useWatchStateValues} from "~/composables/useWatchStateValues";

const dictionaryStore = useDictionaryStore();
const {getForeignLanguages, getLanguageLevels} = dictionaryStore;
onMounted(() => {
  setTimeout(async() => {
    await getForeignLanguages();
    await getLanguageLevels();
  })
})


let items = [];
if (props.modelValue && props.modelValue.length){
  items = props.modelValue.map((item) => {
    return {
    ...item, id: uuidv4(),
    };
  });
}
const selectedItems = ref(items);
const errors = ref(props.errors ?? []);
const resetObject = {
    "language_id": null,
    "level_id": null,
    "errors": {},
};

watch(() => props.errors, (newData) => {
    const newItems = selectedItems.value;
    selectedItems.value.map((item, index) => {
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
    errors.value = newItems;
})

const reset = () => {
    resetObject.id = uuidv4();
    selectedItems.value = [ {...resetObject} ];
}
const create = () => {
    const newItems = selectedItems.value;
    resetObject.id = uuidv4();
    newItems.push(resetObject);
    selectedItems.value = newItems;
}


const updateItem = (id, newItem) => {
  const oldItems = [...selectedItems.value];
    const newItems = oldItems.map(item => {
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

watch(() => useWatchStateValues(selectedItems.value, true, true), (newData) => {
  emit('update:modelValue', selectedItems.value);
})

onMounted(() => {
    if (selectedItems.value.length === 0){
        reset();
    }
})
</script>

<style scoped>
.language_margin{
  margin-bottom: 1rem;
}
@media (max-width: 768px){
  .language_margin{
    margin-bottom: 2rem;
  }
}
</style>

<template>
<div class="" >
  <div class="" v-if="selectedItems.length">
    <CreateResumeForeignLanguagesItem
        class="w-100 language_margin"
        v-for="item in selectedItems" :item="item"
        :key="item.id"
        :id="item.id"
        :language_id="item.language_id"
        :level_id="item.level_id"
        :errors="item.errors"
        @update="updateItem"
        @delete="deleteItem" />
  </div>
  <button type="button" class="btn btn-primary mt-2 btn-sm" v-else-if="selectedItems.length === 0" @click="reset">Добавить</button>
  <button type="button" class="btn btn-primary mt-2 btn-sm" v-if="selectedItems.length !== 0" @click="create">Добавить еще</button>
</div>
</template>
