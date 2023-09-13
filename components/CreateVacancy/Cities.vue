<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Где публиковать?</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <div class="input-row">
          <label>Список городов:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <MultiSelectWithSearch :options="cityOptions" v-model="state.cities.val" :label="'Выберите город'" @input="updateCityInput" @focusin="() => errors.cities = ''"></MultiSelectWithSearch>

            <div class="text-danger d-block" v-if="errors.cities">
              Вам нужно выбрать город для публикации!
            </div>

          </div>

        </div>
      </div>
    </transition>

  </div>


</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const props = defineProps(['title']);

import {useProfileStore} from "~/store/profile";
import {useFormData} from "~/composables/useFormData";
import {useRuntimeConfig} from "#app";
import useFormValidation from "~/composables/useFormValidation";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
import {useDiff} from "~/composables/useDiff";
import {v4 as uuidv4} from "uuid";
import {useCreateFormData} from "~/composables/useCreateFormData";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const {updateVacancy, getMyVacancy} = vacancyStore;

const {employer} = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);


const state = reactive({
    cities: {
        val:  [],
        isValid: true
    },
    isFormValid: true,
    isNew: true,
    isLoading: false,
    error: null,
    success: null,
});

watch(() => useWatchStateValues(state, true, true),   (newState, oldState) => {
    console.log('city update');
    if (!isFirst.value){
        isChanged.value = true;
    }else{
        isFirst.value = false;
    }
});

const sectionData = ref({});
watch(() => sectionData.value, (newData, oldData) => {
    const diffData =  useDiff(newData, oldData);
    if (Object.keys(diffData).length){
        if (newData['cities'].length > 0){
          selectedOptions.value = newData['cities'].map((item) => ({name: item.name, value: item.id}));
          const newOptions = cityOptions.value;
          cityOptions.value = newOptions.concat(selectedOptions.value);
          state['cities'].val = newData['cities'].map((item) => item.id);
        }
    }
})
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newVacancy){
        sectionData.value = {
            cities: newVacancy.cities,
        };
    }
})

const {searchCities} = profileStore;
const selectedOptions = ref([]);
const cityOptions = ref([]);


const updateCityInput = async (newValue = '') => {
  if (newValue.length > 2){
    const items = await searchCities({search: newValue}) ?? [];
    let newOptions = items.filter(item => item.cityId).map(item => ({value: item.cityId, name: `${item.city_name}, ${item.region_name}, ${item.country_name}` }));
    cityOptions.value = newOptions.concat(selectedOptions.value);
  }
}


const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
    if (isChanged.value){
        state.isLoading = true;
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const jsonData = useFormData(state);
        jsonData.action = 'UpdateCities';
        resData = await updateVacancy(draftID.value, jsonData);
        isUpdated.value = true;
        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }
        isChanged.value = false;
        isSaved.value = false;
        isUpdated.value = false;
    }
}

const isCompleted = computed(() => {
    const myVacancy = my_vacancy.value;
    if (myVacancy){
        return (myVacancy.first_name && myVacancy.last_name && myVacancy.id && myVacancy.birth_date && myVacancy.city_id && myVacancy.phone && myVacancy.phone_time_start && myVacancy.phone_time_end && myVacancy.email);
    }
    return false;
});

</script>

<style>

.from-to-block{

}

</style>