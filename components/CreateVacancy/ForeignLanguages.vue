<template>
  <div class="input-row">
    <label for="lenguage">Владение иностранными языками</label>

      <CreateVacancyForeignLanguagesSelectedItem
              :languages="languageOptions"
              :language-levels="languageLevelOptions"
              :selected-languages="selectedLanguages"
              v-for="item in selectedLanguages" :item="item"
              @click="addItem" @delete="deleteItem" />

  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
import CreateVacancy from "~/pages/create-vacancy.vue";
const vacancyStore = useVacancyStore();
const {getForeignLanguages, getLanguageLevels} = vacancyStore;
const {foreign_languages, language_levels} = storeToRefs(vacancyStore);
await getForeignLanguages();
await getLanguageLevels();

const languageOptions = computed(() => foreign_languages.value.map(item => ({value: item.id, name: item.name})));
const languageLevelOptions = computed(() => language_levels.value.map(item => ({value: item.id, name: item.name})));

const selectedLanguages = ref([0]);

const addItem = (newItem) => {

}
const deleteItem = (deleteItem) => {

}
</script>

<style scoped>

</style>