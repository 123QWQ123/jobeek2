<template>
  <div class="carryover-box">
    <div class="carryover-box-label">Есть вакансии на hh или SuperJob? Просто перенесите его!</div>

    {{enabledProviders}}
    {{selectedProviders}}
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
      <div class="import-box" :class="{'import-is-complete': isSuperjobSelected, 'disabled': !isSuperjobEnabled, 'is-connected': isHHEnabled}" @click="toggle('superjob')">
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
</template>

<script setup>

// To DO default by connected_providers

import {useDictionaryStore} from "~/store/dictionary";
import {useVacancyStore} from "~/store/vacancy";
const emit  = defineEmits(['update:modelValue']);
const props  = defineProps({
    modelValue: {
        required: false,
      default: {}
    }
});
const dictionaryStore = useDictionaryStore();

const vacancyStore = useVacancyStore();
const {getConnectedEmployerProviders, getEmployerProvidersAuthEndpoints} = vacancyStore;
await getConnectedEmployerProviders();

const enabledProviders = ref(vacancyStore.providers);
const isHHEnabled = computed(() => enabledProviders.value.hh);
const isSuperjobEnabled = computed(() => enabledProviders.value.superjob);


const resetObject = {
    superjob: false,
    hh: false,
};
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
const route = useRoute();
// const providers = ref(resetObject);
const toggle = async (provider) => {
  if (!selectedProviders.value[provider]){
    console.log(provider);
    if (enabledProviders.value[provider] === false){
        const providerParams = new URLSearchParams();
        providerParams.set('providers[]', provider);
        const resData = await getEmployerProvidersAuthEndpoints(providerParams, route.fullPath);
        if (resData.hasOwnProperty(provider)){
          openProviderAuthUrl(resData[provider]);
        }else{
          alert(resData.message);
        }
        return;
    }

  }

  selectedProviders.value[provider] = !selectedProviders.value[provider];
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