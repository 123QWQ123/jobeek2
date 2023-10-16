<template>

  <div v-if="isHidden" class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Языки({{ isChanged }})</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <SharedComponentsForeignLanguagesWrapper v-if="my_vacancy" v-model="state.languages.val" :errors="errors.languages ?? []" />

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
import {useDictionaryStore} from "~/store/dictionary";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const {updateVacancy, getMyVacancy} = vacancyStore;

const {employer} = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isHidden = ref(false);
const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);


const state = reactive({
    languages: {
        val: vacancyStore.my_vacancy?.languages?.map(item => ({language_id: item.language.id, level_id: item.level.id})) ?? [],
        isValid: true
    },
    isFormValid: true,
    isNew: true,
    isLoading: false,
    error: null,
    success: null,
});

watch(() => useWatchStateValues(state, true, true),   (newState, oldState) => {
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
      state.languages.val = newData.languages ?? [];
    }
})
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newVacancy){
        sectionData.value = {
          languages: newVacancy.languages?.map(item => ({language_id: item.language.id, level_id: item.level.id})),
        };
    }
})

const dictionaryStore = useDictionaryStore();

const {errors, handleErrorResponse} = useFormValidation();
const save = async (is_from_parent = false) => {

  if (isChanged.value){
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const jsonData = useFormData(state);
        jsonData.action = 'UpdateLanguages';
        resData = await updateVacancy(draftID.value, jsonData);
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

  else{
    return true;
  }
}

const isCompleted = computed(() => {
    const myVacancy = my_vacancy.value;
    if (myVacancy && !isCollapsed.value){
        return (myVacancy.key_skills.length > 0);
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