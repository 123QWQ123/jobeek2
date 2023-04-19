<template>
  <div class="theme-checker-box checker-box right__box" @click="toggle">
    <span class="v v1 " :class="{'active' : !isEmployer}" title="Соискатель">Соискатель</span>
    <div class="theme-checker" >
      <input type="checkbox" id="employer" checked>
      <div class="theme-checker-ui">
        <div class="circle" :class="{'left': !isEmployer, 'right' : isEmployer }"> </div>
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
.right__box{
    margin-left: auto;
}
.theme-checker input ~ .theme-checker-ui .circle.left{
    transform: translate(3px, -50%);
}
.theme-checker input ~ .theme-checker-ui .circle.right{
    transform: translate(30px, -50%);
}
</style>