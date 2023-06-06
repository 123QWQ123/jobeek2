<template>
  <div class="input-row">

    <div class="left">
        <label for="lenguage">Владение иностранными языками</label>
    </div>


    <div class="right">
        <CreateVacancyForeignLanguagesSelectedItem
                v-if="selectedLanguages.length"
                class="mb-2"
                :languages="languageOptions"
                :language-levels="languageLevelOptions"
                :selected-languages="selectedLanguages"
                v-for="item in selectedLanguages" :item="item"
                :id="item.id"
                :level="item.level"
                @update="updateItem"
                @delete="deleteItem" />
        <button type="button" class="btn btn-primary" v-else-if="selectedLanguages.length === 0" @click="reset">Добавить</button>
        <button type="button" class="btn btn-primary" v-if="selectedLanguages.length !== 0" @click="create">Добавить еще</button>

    </div>

  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit  = defineEmits(['set']);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const dictionaryStore = useDictionaryStore();
const {getForeignLanguages, getLanguageLevels} = dictionaryStore;
const {foreign_languages, language_levels} = storeToRefs(dictionaryStore);
await getForeignLanguages();
await getLanguageLevels();

const languageOptions = computed(() => {
    const newItems = foreign_languages.value;
    newItems.unshift({id: null, name: "Выберите"});
    return newItems.map(item => ({value: item.id, name: item.name}));
});
const languageLevelOptions = computed(() => {
    const newItems = language_levels.value;
    newItems.unshift({id: null, name: "Выберите"});
    return newItems.map(item => ({value: item.id, name: item.name}));
});

const currentLanguage = ref(0);

const selectedLanguages = ref([ { "id": null, "level": null } ]);

const reset = () => {
    selectedLanguages.value = [ { "id": null, "level": null } ];
}
const create = () => {
    const newItems = selectedLanguages.value;
    newItems.push({
        id: null,
        level: null
    });
    currentLanguage.value = newItems.length - 1;
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
    const newItems = selectedLanguages.value.filter(item => item.id !== deleteItem);
    selectedLanguages.value = newItems;
}

watch(selectedLanguages, (newValues) => {
    emit('set', 'languages', newValues);
})
</script>

<style scoped>

</style>