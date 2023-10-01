<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Зарплата</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <CreateVacancySalary :providers="props.providers" v-if="my_vacancy" v-model="state.salary.val" :errors="errors.salary"/>

      </div>
    </transition>

  </div>


</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";
const props = defineProps({
  title: {
    default: "-",
    required: false,
  },
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

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

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const state = reactive({
    salary: {
        val:  null,
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
      state.salary.val = newData.salary;
    }
})
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newVacancy){
        sectionData.value = {
          salary: {...newVacancy.salary, period: newVacancy.salary.period?.id},
        };
    }
})

const dictionaryStore = useDictionaryStore();

const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
    if (isChanged.value){
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const jsonData = useFormData(state);
        jsonData.action = 'UpdateSalary';
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
    if (myVacancy && myVacancy.salary){
        return (myVacancy.salary.period && myVacancy.salary.currency);
    }
    return false;
});

</script>

<style>

.from-to-block{

}

</style>