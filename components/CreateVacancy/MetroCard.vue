<template>

  <div class="w-box" v-if="isHidden" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Метро</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <div class="input-row">
          <label>Список метро:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <MultiSelectWithSearch :options="metroOptions" v-model="state.metro.val" :label="'Выберите'" @input="updateInput" @focusin="() => errors.metro = ''"></MultiSelectWithSearch>

            <div class="text-danger d-block" v-if="errors.metro">
              Вам нужно выбрать metro для публикации!
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>


</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const props = defineProps(['title', 'providers']);

import {useProfileStore} from "~/store/profile";
import {useFormData} from "~/composables/useFormData";
import {useRuntimeConfig} from "#app";
import useFormValidation from "~/composables/useFormValidation";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
import {useDiff} from "~/composables/useDiff";
import {v4 as uuidv4} from "uuid";
import {useCreateFormData} from "~/composables/useCreateFormData";
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

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);
const isHidden = ref(props.providers.superjob ?? false);
watch(props.providers, (newProviders) => {
  isHidden.value = newProviders.superjob;
})


const state = reactive({
    metro: {
        val:  vacancyStore.my_vacancy?.metro?.map((item) => item.id) ?? [],
        isValid: true
    },
    isFormValid: true,
    isNew: true,
    isLoading: false,
    error: null,
    success: null,
});

watch(() => useWatchStateValues(state, true, true),   (newState, oldState) => {
  console.log('update')
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
        if (newData['metro'].length > 0){
          selectedOptions.value = newData['metro'].map((item) => ({name: item.name, value: item.id}));
          const newOptions = metroOptions.value;
          metroOptions.value = newOptions.concat(selectedOptions.value);
          state['metro'].val = newData['metro'].map((item) => item.id);
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
          metro: newVacancy.metro,
        };
    }
})

onMounted(() => {
  updateInput("tes");
  if (vacancyStore.my_vacancy){
    sectionData.value = {
      metro: vacancyStore.my_vacancy.metro,
    };
  }
})

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


const {errors, handleErrorResponse} = useFormValidation();
const isFocused = ref(false);
const save = async (is_from_parent = false) => {
  if (is_from_parent === true){
    isFocused.value = true;
  }
  if (!isFocused.value){
    return true;
  }

  if (isChanged.value){
        state.isLoading = true;
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const jsonData = useFormData(state);
        jsonData.action = 'UpdateMetro';
        if (draftID.value){
          resData = await updateDraft(draftID.value, jsonData);
        }else{
          resData = await updateVacancy(vacancyID.value, jsonData);
        }
        isUpdated.value = true;
        if (resData.status !== 'success'){
          return handleErrorResponse(resData.data);
        }

        isChanged.value = false;
        isSaved.value = false;
        isUpdated.value = false;
        if (is_from_parent)
        {
          return new Promise((resolve, reject) => {
            resolve(true);
          });
        }
  }

  return true;
}

const isCompleted = computed(() => {
    const myVacancy = my_vacancy.value;

    if (myVacancy && !isCollapsed.value){
        return (myVacancy.first_name && myVacancy.last_name && myVacancy.id && myVacancy.birth_date && myVacancy.city_id && myVacancy.phone && myVacancy.phone_time_start && myVacancy.phone_time_end && myVacancy.email);
    }
    return false;
});

defineExpose({
  save
})
</script>

<style>

.from-to-block{

}

</style>