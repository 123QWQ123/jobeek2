<template>
  <div class="input-row">
    <label>Список метро:<b>*</b></label>
    <div class="input-wrapper mt-2">
      <MultiSelectWithSearch :options="metroOptions" v-model="state.metro.val" :label="'Выберите'" @input="updateInput" @focusin="() => errors.metro = ''"></MultiSelectWithSearch>

      <div class="text-danger d-block" v-if="errors.metro">
        Вам нужно выбрать metro для публикации!
      </div>
    </div>
  </div>
</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const props = defineProps({
  modelValue: {
    required: true,
    default: []
  },
  providers: {
    required: true,
    default: {}
  },
});

import {useProfileStore} from "~/store/profile";
import {useRuntimeConfig} from "#app";
import {useDictionaryStore} from "~/store/dictionary";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const state = reactive({
    metro: {
        val:  props.modelValue ?? [],
        isValid: true
    },
    error: null,
    success: null,
});

const {searchMetro} = useDictionaryStore();
const selectedOptions = ref([]);
const metroOptions = ref([]);

const updateInput = async (newValue = '') => {
  if (newValue.length > 2){
    const ids = vacancyStore.my_vacancy?.cities.map(item => item.id);
    const items = await searchMetro({city_ids: ids}) ?? [];
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    metroOptions.value = newOptions.concat(selectedOptions.value);
  }
}


const errors = ref({})
</script>

<style>

.from-to-block{

}

</style>