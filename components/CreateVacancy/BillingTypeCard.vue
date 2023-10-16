<template>

  <div v-if="isHidden" class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Биллинг({{ isChanged }})</h3>
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
            <CustomSelect :options="vacancyBillingTypeOptions" v-model="state.billing_type_id.val" :label="'Выберите'" @focusin="() => errors.billing_type_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.billing_type_id">
              Вам нужно выбрать тип биллинг!
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
const isCollapsed = ref(false);
const isUpdated = ref(false);

const providers = computed(() => props.providers)
const isHidden = ref(props.providers.hh ?? false);
watch(() => props.providers, (newProviders) => {
    isHidden.value = newProviders.hh;
})

const state = reactive({
  billing_type_id: {
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
      state.billing_type_id.val = newData.billing_type_id;
    }
})
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newVacancy){
        sectionData.value = {
          billing_type_id: newVacancy.billing_type?.id,
        };
    }
})


const dictionaryStore = useDictionaryStore();
const {getVacancyBillingTypes} = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getVacancyBillingTypes();
  }, 500)
})
const vacancyBillingTypeOptions = computed(() => {
  return dictionaryStore.vacancy_billing_types.map((item) => ({name: item.name, value: item.id}));
});


const {errors, handleErrorResponse} = useFormValidation();
const save = async (is_from_parent = false) => {

  if (isChanged.value){
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const jsonData = useFormData(state);
        jsonData.action = 'UpdateBillingType';
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