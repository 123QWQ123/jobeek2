<template>
  <div class="theme-checker-box checker-box" @click="toggleUserMode" v-if="isAuthed">
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

const isAuthed = computed(() => auth.isAuthed);
const isEmployer = computed(() => auth.isEmployer);
</script>

<style scoped>

</style>