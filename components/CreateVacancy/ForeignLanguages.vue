<template>
  {{selectedLanguages}}

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
                  @add="addItem"
                  @update="updateItem"
                  @delete="deleteItem" />
          <button class="btn btn-primary" v-else @click="reset">Добавить</button>
      </div>

  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getForeignLanguages, getLanguageLevels} = vacancyStore;
const {foreign_languages, language_levels} = storeToRefs(vacancyStore);
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

const selectedLanguages = ref([ { "id": null, "level": null } ]);

const reset = () => {
    selectedLanguages.value = [ { "id": null, "level": null } ];
}
const addItem = (newItem) => {
    console.log(newItem);
    const newItems = selectedLanguages.value.filter(item => item.id !== null);
    newItems.push(newItem);
    newItems.push({
        id: null,
        level: null
    });
    selectedLanguages.value = newItems;
}


const updateItem = (id, newItem) => {
    console.log(newItem);
    // const newItems = selectedLanguages.value;
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
</script>

<style scoped>

</style>