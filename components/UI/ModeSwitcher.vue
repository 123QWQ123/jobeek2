<template>
  <div class="theme-checker-box checker-box" @click="toggle" v-if="isAuthed">
    <span class="v v1 " :class="{'active' : !isEmployer}" title="Соискатель">Соискатель</span>
    <div class="theme-checker" >
      <input type="checkbox" id="employer" :checked="isEmployer" >
      <div class="theme-checker-ui">
        <div class="circle"> </div>
      </div>
    </div>
    <span class="v v2" :class="{'active' : isEmployer}" title="Работодатель">Работодатель</span>
  </div>

</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { toggleUserMode } = auth;

const toggle = () => {
  let isEmployerMode = localStorage.getItem('isEmployer');
  if (isEmployerMode === String(isEmployer.value)){
    localStorage.setItem('isEmployer', !isEmployer.value);
  }
  toggleUserMode();
}

const isAuthed = computed(() => auth.isAuthed);
const isEmployer = computed(() => auth.isEmployer);

let isEmployerMode = localStorage.getItem('isEmployer');
if (isEmployerMode === null){
  localStorage.setItem('isEmployer', isEmployer.value);
}else{
  if (isEmployerMode !== String(isEmployer.value)){
    toggleUserMode();
  }
}

</script>

<style scoped>

</style>