<template>
    <div class="right">
        <CreateVacancyContactsPhonesItem
            v-if="selectedPhones.length"
            class="mb-2"
            v-for="item in selectedPhones" :item="item"
            :phone="item.phone"
            :comment="item.comment"
            @add="addItem"
            @update="updateItem"
            @delete="deleteItem" />

        <button class="btn btn-primary" v-else @click="reset">Добавить</button>
    </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getForeignLanguages, getLanguageLevels} = vacancyStore;
const {foreign_languages, language_levels} = storeToRefs(vacancyStore);


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

const selectedPhones = ref([ { "id": null, "level": null } ]);

const reset = () => {
    selectedPhones.value = [ { "id": null, "level": null } ];
}
const addItem = (newItem) => {
    console.log(newItem);
    const newItems = selectedPhones.value.filter(item => item.id !== null);
    newItems.push(newItem);
    newItems.push({
        id: null,
        level: null
    });
    selectedPhones.value = newItems;
}


const updateItem = (id, newItem) => {
    console.log(newItem);
    // const newItems = selectedLanguages.value;
    const newItems = selectedPhones.value.map(item => {
        if (item.id === id){
            return newItem;
        }
        return item;
    });
    selectedPhones.value = newItems;
}
const deleteItem = (deleteItem) => {
    const newItems = selectedPhones.value.filter(item => item.id !== deleteItem);
    selectedPhones.value = newItems;
}
</script>

<style scoped>

</style>