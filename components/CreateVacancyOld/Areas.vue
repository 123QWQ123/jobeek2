<template>
  <div class="input-row">
    <label for="locations">Города, области, страны()</label>
    <div class="input-wrapper">
      <MultiSelectWithSearch v-model="areas" :options="areaOptions"
                             @input="onAreaChange"
                             @update:modelValue="emit('set', 'areas', areas)"/>
        <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">
            Выберите город
        </div>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";

const emit = defineEmits(['set'])
const props = defineProps(['is_valid']);
const isValid = computed(() => props.is_valid);

const areas = reactive([]);

const vacancyStore = useVacancyStore();
const {getIndustries, countries, getAreas} = vacancyStore;

const industries = ref();

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