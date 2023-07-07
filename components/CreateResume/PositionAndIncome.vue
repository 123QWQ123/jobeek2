<template>
  <div class="w-box w-box--main w-box-position" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Должность и доход</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>
    </div>
    <div class="w-box-body" :class="{collapse: isCollapsed}">
      <div class="input-row">
        <label >Какую должность вы хотите занимать? <b>*</b></label>
        <div class="input-wrapper">
          <input type="text" placeholder="Укажите должность" id="title" v-model="state.title.val" @focusin="() => errors.title = ''">

          <div class="text-danger d-block" v-if="errors.title">
              {{ errors.title }}
          </div>
        </div>
      </div>
      <CreateResumeSalary v-model="state.salary.val" @clear-error="clearInputError" :errors="errors"/>

      <div class="input-row">
        <label>Занятость <b>*</b></label>
        <div class="input-wrapper">
            <CustomSelect :options="employmentOptions" v-model="state.employment_id.val" @focusin="() => errors.employment_id = ''" />

            <div class="text-danger d-block" v-if="errors.employment_id">
                {{ errors.employment_id }}
            </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>

import {useDictionaryStore} from "~/store/dictionary";
import {useResumeStore} from "~/store/resume";
import useFormValidation from "~/composables/useFormValidation";
import {useWatchStateValues} from "~/composables/useWatchStateValues";

const dictionaryStore = useDictionaryStore();

const {getWorkTypes} = dictionaryStore;
await getWorkTypes();
const employmentOptions = computed(() => {
    return dictionaryStore.work_types.map(item => ({name: item.name,value: item.id}));
});
const resumeStore = useResumeStore();

const route = useRoute();
const draftID = computed(() => route.query.draft_id);

const {resume} = resumeStore;

const isSaved = ref(false);
const isChanged = ref(false);
const isCollapsed = ref(true);

const {getResume} = resumeStore;

const state = ref({
    title: {
        val: resume.title,
        isValid: true,
    },
    salary: {
        val: {
            amount: resume.salary_from,
            currency: resume.salary_currency
        },
        isValid: true
    },
    employment_id: {
        val: resume.employment_id,
        isValid: true,
    },
    isFormValid: true,
    isNew: true,
    isLoading: false,
    error: null,
    success: null,
});

watch(() => useWatchStateValues(state.value), () => isChanged.value = true);

const {updateResume} = resumeStore;

const {errors, handleErrorResponse, clearInputError} = useFormValidation();
const save = async () => {
    if (isChanged.value){
        const jsonData = {
            salary_currency: state.value.salary.val.currency,
            title: state.value.title.val,
            salary_from: state.value.salary.val.amount,
            employment_id: state.value.employment_id.val,
            form_data: 'PROFESSION_DETAILS_DATA'
        }
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";

        const resData = await updateResume(draftID.value, jsonData);

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }

        isChanged.value = false;
        isSaved.value = false;


    }
}

const isCompleted = computed(() => {
    return resume.title && resume.salary_from && resume.salary_currency && resume.salary_from && resume.employment_id;
});
</script>

<style scoped>

</style>