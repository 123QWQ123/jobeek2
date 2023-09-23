<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Адрес</h3>
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
            <CustomSelect :options="addressOptions" v-model="state.address_id.val" :label="'Выберите'"  @focusin="() => errors.address_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.address_id">
              Вам нужно выбрать тип ваканции!
            </div>
            <div class="text-danger d-block" v-if="addressErrorMessage">
              {{addressErrorMessage}}
            </div>
          </div>
        </div>

        <div class="input-row" >
          <label>Адрес:</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.address.val"  @focusin="() => errors.address = ''"/>
            <div class="text-danger d-block" v-if="errors.address">
              Вам нужно ввести адрес!
            </div>
          </div>
        </div>

        <div class="input-row" >
          <label>Метро:</label>
          <div class="input-wrapper mt-2">

            <div class="check-block mt-2">
              <div class="checkbox">
                <input type="checkbox" id="show_metro_only" v-model.boolean="state.show_metro_only.val" @focusin="() => errors.show_metro_only = ''">
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="show_metro_only" class="fs-14">показывать только метро для указанного адреса</label>
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
import Swal from "sweetalert2";
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
    address: {
        val:  null,
        isValid: true
    },
    address_id: {
        val:  null,
        isValid: true
    },
    show_metro_only: {
        val:  false,
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
      state.address_id.val = newData.address_id;
      state.address.val = newData.address;
      state.show_metro_only.val = newData.show_metro_only;
    }
})
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newVacancy){
        sectionData.value = {
          address: newVacancy.address?.address,
          address_id: newVacancy.address?.address_id,
          show_metro_only: newVacancy.address?.show_metro_only,
        };
    }
})

const dictionaryStore = useDictionaryStore();
const {getVacancyTypes} = dictionaryStore;
await getVacancyTypes();
const addressOptions = computed(() => {
  return dictionaryStore.addresses.map((item) => ({name: item.raw, value: item.id}));
});

const {searchAddresses} = dictionaryStore;
const addressErrorMessage = ref(null);
const resData = await searchAddresses();
if (resData.hasOwnProperty('message')){
  addressErrorMessage.value = resData.message;
}

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
    if (myVacancy && !isCollapsed.value){
        return (myVacancy.address && myVacancy.address.address);
    }
    return false;
});

</script>

<style>

.from-to-block{

}

</style>