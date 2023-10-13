<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Сфера деятельности?({{isChanged}})</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <div class="input-row">
          <label>Список деятелности:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <MultiSelectWithSearch :options="profRoleOptions" v-model="state.professional_roles.val" :label="'Выберите сферу'" @input="updateInput" @focusin="() => errors.professional_roles = ''"></MultiSelectWithSearch>

            <div class="text-danger d-block" v-if="errors.professional_roles">
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
const isCollapsed = ref(true);
const isUpdated = ref(false);


const state = reactive({
  professional_roles: {
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
        if (newData['professional_roles'].length > 0){
          selectedOptions.value = newData['professional_roles'].map((item) => ({value: item.id, name: `${item.name}` }));
          const newOptions = profRoleOptions.value;
          profRoleOptions.value = newOptions.concat(selectedOptions.value);
          state['professional_roles'].val = newData['professional_roles'].map((item) => item.id);
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
          professional_roles: newVacancy.professional_roles,
        };
    }
})

const {searchProfessionalRoles} = profileStore;
const selectedOptions = ref([]);
const profRoleOptions = ref([]);


const updateInput = async (newValue = '') => {
  if (newValue.length > 2){
    const items = await searchProfessionalRoles({search: newValue}) ?? [];
    console.log(items);
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    // newOptions = [...new Map(newOptions.map(item =>  [item[key], item])).values()];
    profRoleOptions.value = newOptions.concat(selectedOptions.value);

  }
}

const {errors, handleErrorResponse} = useFormValidation();
const save = async (is_from_parent = false) => {

  if (isChanged.value){
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const jsonData = useFormData(state);
        jsonData.action = 'UpdateProfessionalRoles';
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
}

const isCompleted = computed(() => {
    const myVacancy = my_vacancy.value;
    if (myVacancy && !isCollapsed.value){
        return (myVacancy.professional_roles.length > 0);
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