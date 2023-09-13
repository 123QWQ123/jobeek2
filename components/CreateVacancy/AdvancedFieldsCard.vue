<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Детали вакансии</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <div class="input-row">
          <label>Список Адресов компании:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workTypeOptions" v-model="state.work_type_id.val" :label="'Выберите'"  @focusin="() => errors.work_type_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.work_type_id">
              Вам нужно выбрать тип ваканции!
            </div>
          </div>
        </div>

        <div class="input-row" >
          <label>Адрес:</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.name.val"  @focusin="() => errors.name = ''"/>
            <div class="text-danger d-block" v-if="errors.name">
              Вам нужно ввести название!
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="description">Описание:</label>
          <div class="input-wrapper">
            <RichEditor  v-model="state.description.val"/>
            <div class="text-danger d-block" v-if="errors.description">
              {{errors.description}}
            </div>
          </div>
        </div>

        <div class="input-row" >
          <label>Принимать старше 14 лет:</label>
          <div class="input-wrapper mt-2">

            <div class="check-block mt-2">
              <div class="checkbox">
                <input type="checkbox" id="accept_kids" v-model.boolean="state.accept_kids.val" @focusin="() => errors.accept_kids = ''">
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="accept_kids" class="fs-14">Соискатель старше 14 лет.
                Указание, что вакансия доступна для соискателей старше 14 лет</label>
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


const state = reactive({
  name: {
    val:  null,
    isValid: true
  },
  description: {
    val:  "",
    isValid: true
  },
  accept_kids: {
    val:  false,
    isValid: true
  },
  work_type_id: {
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
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
  if (isUpdated.value){
    isUpdated.value = false;
    return;
  }
  if (newVacancy){
    console.log(newVacancy.description);
    sectionData.value = {
      name: newVacancy.name,
      description: newVacancy.description,
      accept_kids: newVacancy.accept_kids,
      work_type_id: newVacancy.work_type_id,
    };
  }
})

watch(() => sectionData.value, (newData, oldData) => {
  const diffData =  useDiff(newData, oldData);
  if (Object.keys(diffData).length){
    console.log(newData.description);
    state.name.val = newData.name;
    state.description.val = newData.description;
    state.accept_kids.val = newData.accept_kids;
    state.work_type_id.val = newData.work_type_id;
  }
})

const dictionaryStore = useDictionaryStore();
const {getWorkTypes} = dictionaryStore;
await getWorkTypes();
const workTypeOptions = computed(() => {
  return dictionaryStore.work_types.map((item) => ({name: item.name, value: item.id}));
});

const {searchAddresses} = dictionaryStore;
await searchAddresses();

const onAddressSearch  = async(newString) => {
  console.log(newString);
}
const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
  if (isChanged.value){
    state.isLoading = true;
    // validate();
    errors.value = {};
    state.errorMessage = "";
    let resData = {};
    const jsonData = {address: useFormData(state)};

    jsonData.action = 'UpdateAddress';
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
    return (myVacancy.address && myVacancy.address.address);
  }
  return false;
});

</script>

<style>

.from-to-block{

}

</style>