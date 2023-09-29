<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Контакты</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <div class="input-row" >
          <label>имя:</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.name.val"  @focusin="onFocusInput('name')"/>
            <div class="text-danger d-block" v-if="errors.contacts?.name">
<!--              Вам нужно ввести имя!-->
              {{errors.contacts?.name}}
            </div>
          </div>
        </div>

        <div class="input-row" >
          <label>Email:</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.email.val"  @focusin="onFocusInput('email')"/>
            <div class="text-danger d-block" v-if="errors.contacts?.email">
<!--              Вам нужно ввести email!-->
              {{errors.contacts?.email}}
            </div>
          </div>
        </div>

        <div class="input-row" >
          <label>Название компании:</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.company_name.val"  @focusin="onFocusInput('company_name')"/>
            <div class="text-danger d-block" v-if="errors.contacts?.company_name">
<!--              Вам нужно ввести название компании!-->
              {{errors.contacts?.company_name}}
            </div>
          </div>
        </div>

        <div class="input-row" >
          <label>Адрес сайта:</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.company_url.val"  @focusin="onFocusInput('company_url')"/>
            <div class="text-danger d-block" v-if="errors.contacts?.company_url">
<!--              Вам нужно ввести URL!-->
              {{errors.contacts?.company_url}}
            </div>
          </div>
        </div>
        <div class="input-row" >
          <label>Лого URL:</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.company_logo.val"  @focusin="onFocusInput('company_logo')"/>
            <div class="text-danger d-block" v-if="errors.contacts?.company_logo">
<!--              Вам нужно ввести company_logo!-->
              {{errors.contacts?.company_logo}}
            </div>
          </div>
        </div>

        <div class="input-row" >
          <label>О компании:</label>
          <div class="input-wrapper mt-2">
            <textarea class="form-control" v-model="state.company_description.val"
                      @focusin="() => errors.company_description = ''" > </textarea>
            <div class="text-danger d-block" v-if="errors.company_description">
<!--              Вам нужно ввести о компании!-->
              {{ errors.contacts?.company_description }}
            </div>
          </div>
        </div>

        <br/>
        <CreateVacancyContactsPhones v-if="my_vacancy" v-model="state.phones.val" :errors="phonesErrors"/>

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
import CreateVacancy from "~/pages/create-vacancy.vue";
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
  name: {
        val:  null,
        isValid: true
    },
    email: {
        val:  null,
        isValid: true
    },
    company_name: {
        val:  "",
        isValid: true
    },
    company_url: {
        val:  "",
        isValid: true
    },
    company_logo: {
        val:  "",
        isValid: true
    },
    company_description: {
        val:  "",
        isValid: true
    },
    phones: {
        val:  {
          phone: null,
          phone_comment: null,
          additional_phone: null,
          additional_phone_comment: null,
        },
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
      state.name.val = newData.name;
      state.email.val = newData.email;
      state.company_name.val = newData.company_name;
      state.company_url.val = newData.company_url;
      state.company_logo.val = newData.company_logo;
      state.company_description.val = newData.company_description;
      state.phones.val = newData.phones;
    }
})
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newVacancy){
        sectionData.value = {
          name: newVacancy.contacts?.name,
          email: newVacancy.contacts?.email,
          company_name: newVacancy.contacts?.company_name,
          company_url: newVacancy.contacts?.company_url,
          company_logo: newVacancy.contacts?.company_logo,
          company_description: newVacancy.contacts?.company_description,
          phones: newVacancy.contacts.phones,
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
// await searchAddresses();

const onAddressSearch  = async(newString) => {
  console.log(newString);
}
const {errors, handleErrorResponse} = useFormValidation();
const phonesErrors = computed(() => {
  if (errors.value.contacts?.phones){
    return errors.value.contacts.phones;
  }
  return {};
});
const onFocusInput = (key) => {
  if (errors.value.contacts instanceof Object){
    errors.value.contacts[key] = '';
  }
}
// Object.assign(errors, {contacts: {}});
const save = async () => {
    if (isChanged.value){
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const jsonData = {contacts: useFormData(state)};

        jsonData.action = 'UpdateContacts';
        resData = await updateVacancy(draftID.value, jsonData);
        console.log(resData);
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