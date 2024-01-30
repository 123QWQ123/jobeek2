<template>

  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Тип вакансии({{ isChanged }})</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <div class="input-row">
          <label>Тип вакансии:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="vacancyTypeOptions" v-model="state.type_id.val" :label="'Выберите'" @focusin="() => errors.type_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.type_id">
              Вам нужно выбрать тип ваканции!
            </div>
          </div>
        </div>

        <div class="input-row" v-if="isAnonymous">
          <label>название компании для анонимных вакансий:</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.custom_employer_name.val"  @focusin="() => errors.custom_employer_name = ''"/>
            <div class="text-danger d-block" v-if="errors.custom_employer_name">
              Вам нужно ввести название для анонимных ваканций!
            </div>
          </div>
        </div>


        <div class="input-row" v-if="isDirect">
          <label>URL отклика для прямых вакансий:</label>
          <div class="input-wrapper mt-2">
            <input v-model="state.response_url.val" @focusin="() => errors.response_url = ''" />
            <div class="text-danger d-block" v-if="errors.response_url">
              Вам нужно ввести URL для прямых ваканций!
            </div>
          </div>
        </div>


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
const vacancyID = computed(() => route.query.vacancy_id);
const {updateVacancy, updateDraft, getMyVacancy, getMyDraft} = vacancyStore;

const {employer} = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);


const state = reactive({
    type_id: {
        val:  null,
        isValid: true
    },
    custom_employer_name: {
        val:  null,
        isValid: true
    },
    response_url: {
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
      state.type_id.val = newData.type_id;
      state.custom_employer_name.val = newData.custom_employer_name;
      state.response_url.val = newData.response_url;
    }
})
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newVacancy){
        sectionData.value = {
          type_id: newVacancy.type?.id,
          custom_employer_name: newVacancy.type?.custom_employer_name,
          response_url: newVacancy.type?.response_url,
        };
    }
})

const isAnonymous = computed(() => {
  if (props.providers.hh){
    return state.type_id.val?.toString() === "48";
  }
  return false;
});
const isDirect = computed(() => {
  if (props.providers.hh){
    return state.type_id.val?.toString() === "49";
  }
  return false;
});

const dictionaryStore = useDictionaryStore();
const {getVacancyTypes} = dictionaryStore;
onMounted(() => {
  setTimeout(async() => {
    await getVacancyTypes();
  }, 500)
})
const vacancyTypeOptions = computed(() => {
  return dictionaryStore.vacancy_types.map((item) => ({name: item.name, value: item.id}));
});


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
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const jsonData = useFormData(state);
        jsonData.action = 'UpdateType';
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
        return (myVacancy.type && myVacancy.type.id);
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