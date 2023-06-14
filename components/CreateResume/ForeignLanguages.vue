<template>
    <div class="w-box">
        <div class="w-box-head">
            <h3 class="title">Владение иностранными языками</h3>
        </div>
        <div class="w-box-body">
            <div class="empty-area" v-if="isShown" >
                <div class="ps-3 w-100">
                    <CreateResumeForeignLanguagesSelectedItem
                            v-if="selectedLanguages.length"
                            class="w-100 mb-2"
                            :languages="languageOptions"
                            :language-levels="languageLevelOptions"
                            :selected-languages="selectedLanguages"
                            v-for="item in selectedLanguages" :item="item"
                            :key="item.id"
                            :id="item.id"
                            :level="item.level"
                            @update="updateItem"
                            @delete="deleteItem" />

                    <button type="button" class="btn btn-primary mt-2" v-else-if="selectedLanguages.length === 0" @click="reset">Добавить</button>
                    <button type="button" class="btn btn-primary mt-2" v-if="selectedLanguages.length !== 0" @click="create">Добавить еще</button>
                </div>
            </div>
            <div class="empty-area" v-else>

                <span>Здесь вы можете указать релевантный опыт в сфере которую вы выбарли</span>
                <button class="add" type="button" @click="add">Добавить</button>
            </div>
        </div>

    </div>

</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const isShown = ref(false);

const emit  = defineEmits(['set']);
import {storeToRefs} from "pinia";

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


const hasChanged = ref(false);

const add  = () => {
    isShown.value = !isShown.value;
    hasChanged.value = true;
}

const updateState = (name, value) => {
    console.log(name, value);
    emit('set', name, value);
};
</script>

<style scoped>

</style>