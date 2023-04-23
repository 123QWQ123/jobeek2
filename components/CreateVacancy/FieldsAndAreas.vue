<template>
  <div class="input-row">
    <label for="industry">Отрасль</label>
    <div class="input-wrapper">
        <MultiSelectWithSearch v-model="myAreaSearch" :options="industryOptions" @input="onFieldChange" @select="onFieldSelect" />
    </div>
  </div>
  <div class="input-row">
    <label for="locations">Города, области, страны</label>
    <div class="input-wrapper">
<!--      <SelectWithSearch v-model="myAreaSearch" :options="areaOptions" @input="onAreaChange" />-->
      <MultiSelectWithSearch v-model="myAreaSearch" :options="areaOptions" @input="onAreaChange" @select="onAreaSelect" />
<!--        <Select2 v-model="selectedAreas" :options="areaOptions" :settings="{multiple: true, ajax: ajaxConfig}" />-->

    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";
import CustomSelect from "../UI/CustomSelect";
import SelectWithSearch from "../UI/SelectWithSearch";
import {useRuntimeConfig} from "nuxt/app";

const onFieldChange = (event) => {
  console.log(event);
  // console.log("myChangeEvent: ", event);
}

const vacancyStore = useVacancyStore();

const {getIndustries, industries, countries, getAreas, cities, areas} = vacancyStore;

onMounted(async() => {
  await getIndustries();
})

// await getAreas();
// await getCountries();
// await getRegions();

const industryOptions = ref([]);
watch(
    () => vacancyStore.industries,
    (newValues) => {
      industryOptions.value = newValues.map(item => {
        return {value: item.id, name: item.title};
      });
    }
);

const areaOptions = ref([]);
watch(
    () => vacancyStore.areas,
    (newValues) => {
      areaOptions.value = newValues.map(item => {
        return {value: item.city_id, name: item?.c_name + ',' + item?.r_name + ',' + item?.city_name};
      });
    }
);

const selectedIndustries = ref([]);
const selectedAreas = ref([]);
const myAreaSearch = ref("");

const onAreaChange = (text) => {
  if (text.length >= 2){
    getAreas({search: text});
  }
}
const onFieldSelect = (item) => {
    console.log(item);
}
const onAreaSelect = (item) => {
    console.log(item);
}

</script>

<style>

</style>