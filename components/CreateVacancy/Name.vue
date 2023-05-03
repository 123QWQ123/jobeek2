<template>
  <div class="input-row">
    <label for="name">Название</label>
    <div class="input-wrapper">
      <input type="text" id="name" v-model="keywords" @change="onUpdate">
    </div>
  </div>
</template>

<script setup>
import {useVacancyStore} from "../../store/vacancy";
const emit = defineEmits(['set'])
const keywords = ref();
const onUpdate = (newValue) => {
    emit('set', 'name', keywords.value);
}

const vacancyStore = useVacancyStore();
const {getIndustries, industries} = vacancyStore;

onMounted(async() => {
  await getIndustries();
});

</script>

<style>


</style>