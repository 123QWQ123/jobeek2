<template>
      <div class="input-row">
        <label>Список метро:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <MultiSelectWithSearch :options="metroOptions" v-model="metros" :label="'Выберите город'" @input="updateInput" @focusin="() => errors.metro = ''"></MultiSelectWithSearch>
          <div class="text-danger d-block" v-if="errors.metro">
            Вам нужно выбрать метро!
          </div>
        </div>
      </div>
</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const props = defineProps({
  modelValue: {
    required: true,
    default: [],
  },
  errors: {
    required: false,
    default: {}
  }
});
const errors = computed(() => props.errors);
import {useProfileStore} from "~/store/profile";
import {useRuntimeConfig} from "#app";
import {useDictionaryStore} from "~/store/dictionary";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);
const {updateVacancy, updateDraft, getMyVacancy, getMyDraft} = vacancyStore;

const {employer} = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const metros = ref([]);

const {searchMetro} = useDictionaryStore();
const selectedOptions = ref([]);
const metroOptions = ref([]);


const updateInput = async (newValue = '') => {
  if (newValue.length > 2){
    const items = await searchMetro({search: newValue}) ?? [];
    let newOptions = items.filter(item => item.cityId).map(item => ({value: item.cityId, name: `${item.city_name}, ${item.region_name}, ${item.country_name}` }));
    // newOptions = [...new Map(newOptions.map(item =>  [item[key], item])).values()];
    metroOptions.value = newOptions.concat(selectedOptions.value);
  }
}


</script>

<style>

.from-to-block{

}

</style>