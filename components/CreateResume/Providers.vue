<template>
  <div class="carryover-box">
    <div class="carryover-box-label">Есть резюме на hh или SuperJob? Просто перенесите его!</div>

    <div class="import-grid">
      <div class="import-box" :class="{'import-is-complete': isHHEnabled}" @click="toggle('hh')">
        <div class="import-box-dvnld">
<!--          <input type="file">-->
          <div class="logo"> <img src="~/assets/img/logos/hh.svg" alt="#">
            <div class="check"> <img src="~/assets/img/svg/complete.svg" alt="#"></div>
          </div><span>Опубликовать на HeadHunters.ru</span>
        </div>
        <div class="import-complete">
          <div class="logo logo-fake"></div>
            <span>Опубликовать на Superjob.ru</span>
          <button class="close" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9951 4.99512L5.00586 18.9843" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.0009 18.9928L5 4.98901" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="import-box" :class="{'import-is-complete': isSuperjobEnabled}" @click="toggle('superjob')">
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

import {useDictionaryStore} from "~/store/dictionary";
const emit  = defineEmits(['update:modelValue']);
const props  = defineProps({
    modelValue: {
        required: true,
    }
});
const dictionaryStore = useDictionaryStore();

const resetObject = {
    superjob: false,
    hh: false,
};
const selectedProviders = ref( props.modelValue ?? resetObject);
watch(() => selectedProviders.value, (newSelectedItems) => {
    emit('update:modelValue', newSelectedItems);
})
const errors = computed(() => props.errors);
const isHHEnabled = computed(() => selectedProviders.value.hh);
const isSuperjobEnabled = computed(() => selectedProviders.value.superjob);
const reset = () => {
    selectedProviders.value = resetObject;
}

const toggle = (provider) => {
    selectedProviders.value[provider] = !selectedProviders.value[provider];
}

</script>

<style scoped>
.import-box{
    cursor: pointer;
}
</style>