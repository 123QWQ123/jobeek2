<template>
  <div class="add-row input-row">
    <div class="add-row-select">
        <CustomSelect :options="contactOptions" v-model="contacts"></CustomSelect>
    </div>
    <div class="input-wrapper">
      <input type="text" placeholder="">
      <button class="delete-row" type="button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.9951 4.99512L5.00586 18.9843" stroke="#78757E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.0009 18.9928L5 4.98901" stroke="#78757E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
  <button class="button-accent" type="button">Добавить контакты или соцсети</button>
</template>

<script setup>
import {useContactOptions} from "~/composables/useContactOptions";

const contactOptions = useContactOptions();
const contacts = ref([]);
</script>

<style scoped>

</style>