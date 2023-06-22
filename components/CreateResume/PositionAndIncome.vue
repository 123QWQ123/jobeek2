<template>
  <div class="w-box w-box--main w-box-position" @mouseleave="save">
    <div class="w-box-head">
      <h3 class="title">Должность и доход</h3>
      <span class="arrow" :class="{up: isCollapsed}" @click="isCollapsed = !isCollapsed"></span>
    </div>
    <div class="w-box-body" :class="{collapse: isCollapsed}">
      <div class="input-row">
        <label >Какую должность вы хотите занимать? <b>*</b></label>
        <div class="input-wrapper">
          <input type="text" placeholder="Укажите должность" id="title" v-model="state.title.val">
        </div>
      </div>
        <CreateResumeSalary v-model="state.salary.val"/>
      <div class="input-row">
        <label>Занятость <b>*</b></label>
        <div class="input-wrapper">
            <CustomSelect :options="employmentOptions" v-model="state.employment_id.val"  />
        </div>
      </div>

    </div>


    <transition>
      <span v-if="isSaved" class="p-3 d-inline-flex justify-content-center align-items-center" style="color:#0c0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="me-2">
              <path fill="#0c0" d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959 7v-2h-8v2h8zm0-24v2h-8v-2h8zm2 0h1c2.762 0 5 2.239 5 5v1h-2v-1c0-1.654-1.346-3-3-3h-1v-2zm6 16h-2v-8h2v8zm-18 8h-1c-2.762 0-5-2.239-5-5v-1h2v1c0 1.654 1.346 3 3 3h1v2zm18-6v1c0 2.761-2.238 5-5 5h-1v-2h1c1.654 0 3-1.346 3-3v-1h2zm-24-12v-1c0-2.761 2.238-5 5-5h1v2h-1c-1.654 0-3 1.346-3 3v1h-2zm0 2h2v8h-2v-8z"/>
          </svg>
          Сохранен
      </span>
    </transition>

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

const {errors, handleErrorResponse} = useFormValidation();
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
            handleErrorResponse(resData.data);
        }

        isSaved.value = true;
        isChanged.value = false;
        setTimeout(() => {
            isSaved.value = false;
        }, 3000);

        await getResume(draftID.value);
    }
}

</script>

<style scoped>

</style>