<template>
  <div class="filter-box" :class="{'open': filterClass}">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Специализации</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#"></div>
    <div class="filter-box-body">
      <div class="check-block-list">


        <div v-for="item in firstItems" :key="item.name" class="check-block">
          <div class="checkbox">
            <input type="checkbox" :id="item.name"  :checked="item.is_checked" >
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label for="s1">{{ item.name }}</label>
          </div>
        </div>

      </div>

      <VacanciesFiltersSpecializationModal v-if="isModalOpen" :is-open="isModalOpen" @toggle="toggleModal" v-model="selectedSpecs" :items="specializations"/>

      <button class="more-filters" @click="toggleModal" >
        Выбрать
      </button>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";
import {storeToRefs} from "pinia";

const vacancyStore = useVacancyStore();

const {getSpecializations} = vacancyStore;
const {specializations} = storeToRefs(vacancyStore)

const isModalOpen = ref(false);
const selectedSpecs = ref({
  items: [],
  children:[]
});

const toggleModal = () => isModalOpen.value = !isModalOpen.value;

const firstItems = ref([]);
watch(
    () => vacancyStore.specializations,
    (newValues) => {

      if (!newValues || newValues.length  < 1){
        return;
      }
      for (let i = 0; i < 5; i++){
        let item = newValues[i];
        firstItems.value.push({
          id: item.id,
          name: item.title,
          is_checked: false
        });
      }
})



const filterClass = ref(true);

onMounted(() => {
  getSpecializations();
});


</script>

<style>
.check-block label{
  white-space: pre-wrap;
}

.check-block{
}
</style>