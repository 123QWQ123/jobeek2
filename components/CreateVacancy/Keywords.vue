<template>
  <div class="input-row">
    <label for="name">Название</label>
    <div class="input-wrapper">
      <input type="text" id="name" v-model="keywords" @change="onKeywordsChange">
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set'])
import {useVacancyStore} from "../../store/vacancy";
import CustomSelect from "../UI/CustomSelect";
import SelectWithSearch from "../UI/SelectWithSearch";

const vacancyStore = useVacancyStore();

const {getIndustries, industries, countries, getAreas, cities} = vacancyStore;

const keywords = ref();

const onKeywordsChange = (newValue) => {
  console.log(newValue);
  emit('set', 'name', keywords.value);

}
onMounted(async() => {
  await getIndustries();
});

</script>

<style>


</style>