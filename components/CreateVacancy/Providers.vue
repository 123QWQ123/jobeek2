<template>
  <div class="carryover-box">
    {{selectedProviders}}
    <div class="carryover-box-label">Есть вакансии на hh или SuperJob? Просто перенесите его!</div>


    <div class="import-grid">
      <div class="import-box" :class="{'import-is-complete': isHHSelected, 'disabled': !isHHEnabled, 'is-connected': isHHEnabled}" @click="toggle('hh')">
        <div class="import-box-dvnld">
          <div class="logo">
            <img src="~/assets/img/logos/hh.svg" alt="#">
            <div class="check">
              <img src="~/assets/img/svg/complete.svg" alt="#">
            </div>
          </div><span>Опубликовать на HeadHunters.ru</span>
        </div>
        <div class="import-complete">
          <div class="logo logo-fake"></div>
            <span>Опубликовать на HeadHunters.ru</span>
          <button class="close" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9951 4.99512L5.00586 18.9843" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.0009 18.9928L5 4.98901" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="import-box" :class="{'import-is-complete': isSuperjobSelected, 'disabled': !isSuperjobEnabled, 'is-connected': isSuperjobEnabled}" @click="toggle('superjob')">
        <div class="import-box-dvnld">
          <div class="logo"> <img src="~/assets/img/logos/sb.svg" alt="#">
            <div class="check"> <img src="~/assets/img/svg/complete.svg" alt="#"></div>
          </div><span>Опубликовать на Superjob.ru    </span>
        </div>
        <div class="import-complete">
          <div class="logo logo-fake"> </div><span>Опубликовать на Superjob.ru</span>
          <button class="close" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9951 4.99512L5.00586 18.9843" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.0009 18.9928L5 4.98901" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  {{enabledProviders}}
</template>

<script setup>

// To DO default by connected_providers

import {useDictionaryStore} from "~/store/dictionary";
import {useVacancyStore} from "~/store/vacancy";
import {useFormData} from "~/composables/useFormData";
import {toast} from "vue3-toastify";
const emit  = defineEmits(['update:modelValue']);
const props  = defineProps({
    modelValue: {
        required: false,
      default: {}
    }
});
const dictionaryStore = useDictionaryStore();

const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);

const vacancyStore = useVacancyStore();
const {getConnectedEmployerProviders, getEmployerProvidersAuthEndpoints, getMyVacancy} = vacancyStore;
await getConnectedEmployerProviders();


// watch(vacancyProviders.value, (newValues) => {
//   console.log(newValues);
//   const providersNewValues = {...resetObject};
//
//   if (newValues.includes('hh')){
//     providersNewValues.hh = true;
//   }else{
//     providersNewValues.superjob = false;
//   }
//   if (newValues.includes('superjob')){
//     providersNewValues.superjob = true;
//   }else{
//     providersNewValues.superjob = false;
//   }
//   console.log(providersNewValues);
//   selectedProviders.value = providersNewValues;
// });

const enabledProviders = ref(vacancyStore.providers);
const isHHEnabled = computed(() => enabledProviders.value.hh);
const isSuperjobEnabled = computed(() => enabledProviders.value.superjob);


const resetObject = {
    superjob: false,
    hh: false,
};
const vacancyProviders = computed(() => {
  let selectedProvidersValue = [];
  if (!vacancyStore.my_vacancy){
    return resetObject;
  }
  const providersNewValues = {...resetObject};

  if (!vacancyStore.my_vacancy.hasOwnProperty('providers')){
    return providersNewValues;
  }
  if (vacancyStore.my_vacancy.providers.length > 0){
    selectedProvidersValue = vacancyStore.my_vacancy.providers.map(item => item.name);
  }
  // return selectedProvidersValue;

  if (selectedProvidersValue.includes('hh')){
    providersNewValues.hh = true;
  }else{
    providersNewValues.superjob = false;
  }
  if (selectedProvidersValue.includes('superjob')){
    providersNewValues.superjob = true;
  }else{
    providersNewValues.superjob = false;
  }
  return providersNewValues;
});

watch(() => vacancyProviders.value, (newValue) => {
  selectedProviders.value = newValue;
})
const selectedProviders = ref( props.modelValue ?? resetObject);
watch(() => selectedProviders.value, (newSelectedItems) => {
    emit('update:modelValue', newSelectedItems);
})

const errors = computed(() => props.errors);
const isHHSelected = computed(() => selectedProviders.value.hh);
const isSuperjobSelected = computed(() => selectedProviders.value.superjob);
const reset = () => {
    selectedProviders.value = resetObject;
}

onMounted(() => {
  // console.log(vacancyProviders.value);
})
const {updateVacancy, updateDraft} = vacancyStore;
// const providers = ref(resetObject);
const toggle = async (provider) => {
  if (!selectedProviders.value[provider]){
    if (enabledProviders.value[provider] === false){
        const providerParams = new URLSearchParams();
        providerParams.set('providers[]', provider);
        const resData = await getEmployerProvidersAuthEndpoints(providerParams, route.fullPath.replace(route.fullPath.substring(0, 1), ""));
        if (resData.hasOwnProperty(provider)){
          openProviderAuthUrl(resData[provider]);
        }else{
          alert(resData.message);
        }
        return;
    }
  }

  selectedProviders.value[provider] = !selectedProviders.value[provider];

  const providerParams = [];
  if (selectedProviders.value.hh){
    providerParams.push('hh');
  }
  if (selectedProviders.value.superjob){
    providerParams.push('superjob');
  }

  const data = {
    providers: providerParams
  };
  data.action = 'UpdateProviders';
  let resData = {};
  console.log(draftID.value, vacancyID.value);
  if (draftID.value){
    resData = await updateDraft(draftID.value, data);

    if (resData.status !== 'success'){
      toast.info(resData.message, {autoClose: 3000});
    }

    await getMyVacancy(draftID.value);
  }else{
    // selectedProviders.value = {...resetObject, [provider] : }
    // resData = await updateVacancy(vacancyID.value, data);

    // if (resData.status !== 'success'){
    //   toast.info(resData.message, {autoClose: 3000});
    // }
  }
}
const openProviderAuthUrl = (url) => {
  window.open(url);
}
</script>

<style scoped>
.import-box{
    cursor: pointer;
}
.is-connected .import-box-dvnld .logo .check{
  display: block;
}
.import-box.disabled{
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgb(0 0 0 / 4%);
  border-radius: 12px;
}
.import-box.disabled .import-box-dvnld{
  border: 1px dashed #8c8c8c;
  color: #8c8c8c;
}

.import-box.disabled .import-box-dvnld .logo{
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}
.import-box.disabled .import-box-dvnld span{
  color: #8c8c8c;
}

</style>