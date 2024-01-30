<template>
  <div class="input-row">
    <label>Куда можно переехать:</label>
    <div class="input-wrapper mt-2">
      <MultiSelectWithSearch :options="cityOptions" v-model="state.move_able_cities.val" :label="'Выберите'" @input="updateCityInput" @focusin="() => errors.metro = ''"></MultiSelectWithSearch>

      <div class="text-danger d-block" v-if="errors.metro">
        Вам нужно выбрать список городов для релокации!
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
import useResumeHooks from "~/hooks/useResumeHooks";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const state = reactive({
    move_able_cities: {
        val:  props.modelValue ?? [],
        isValid: true
    },
    error: null,
    success: null,
});

const {searchCities} = profileStore;
const selectedOptions = ref([]);
const cityOptions = ref([]);

const {getCityName} = useResumeHooks();
const updateCityInput = async (newValue = '') => {
  const items = await searchCities({search: newValue}) ?? [];
  cityOptions.value = items.map(item => ({value: item.city_id, name: getCityName(item) }));
}


const errors = ref({})
</script>

<style>

.from-to-block{

}

</style>