<template>
  <div class="input-row">
    <label for="industry">Отрасль</label>
    <div class="input-wrapper">
        <MultiSelectWithSearch :options="industryOptions"
                               @input="onFieldChange" v-model="fields"
                               @update:modelValue="emit('set', 'specializations', fields)"
        />
    </div>
  </div>
  <div class="input-row">
    <label for="locations">Города, области, страны()</label>
    <div class="input-wrapper">
      <MultiSelectWithSearch v-model="areas" :options="areaOptions"
                             @input="onAreaChange"
                             @update:modelValue="emit('set', 'areas', areas)"/>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";

const emit = defineEmits(['set'])

const fields = reactive([]);
const areas = reactive([]);
const fieldText = ref("");
const onFieldChange = (text) => {
  fieldText.value = text;
  industries.value = vacancyStore.industries;
}

const vacancyStore = useVacancyStore();

const {getIndustries, countries, getAreas} = vacancyStore;

const industries = ref();
onMounted(async() => {
  await getIndustries();
  industries.value = vacancyStore.industries;
})

const industryOptions = ref([]);
watch(
    () => industries.value,
    (newValues) => {
      industryOptions.value = newValues
          .filter(item => item.title.includes(fieldText.value))
          .map(item => {
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

const onAreaChange = (text) => {
  if (text.length >= 2){
    getAreas({search: text});
  }
}

</script>

<style>

</style>