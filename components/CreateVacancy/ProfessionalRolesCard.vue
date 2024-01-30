<template>

  <div class="w-box" v-click-outside="save" @click="isFocused = true">

    <div class="w-box-head">
      <h3 class="title">Сфера деятельности?({{isChanged}})</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <CreateVacancyProfessionalRoles v-if="my_vacancy" v-model="state.professional_roles.val" />

        <div class="text-danger d-block" v-if="errors.professional_roles">
          Вам нужно выбрать деятелность для публикации!
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
const vacancyID = computed(() => route.query.vacancy_id);
const {updateVacancy, updateDraft, getMyVacancy, getMyDraft} = vacancyStore;

const {employer} = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
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

watch(() => state.professional_roles.val, () => {
  isChanged.value = true;
})

const sectionData = ref({});
watch(() => sectionData.value, (newData, oldData) => {
    const diffData =  useDiff(newData, oldData);
    if (Object.keys(diffData).length){
        if (newData['professional_roles'].length > 0){
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

const {errors, handleErrorResponse} = useFormValidation();
const isFocused = ref(false);
const save = async (is_from_parent = false) => {
  if (is_from_parent === true){
    isFocused.value = true;
  }
  if (!isFocused.value){
    return true;
  }

  if (vacancyID.value) return;
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
  return true;
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