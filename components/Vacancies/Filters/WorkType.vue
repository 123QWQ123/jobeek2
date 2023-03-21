<template>
  <div class="filter-box" :class="{'open': employmentTypeFilterClass}">
    <div class="filter-box-handle" @click="employmentTypeFilterClass = !employmentTypeFilterClass">
      <strong>Тип занятости</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#"></div>
    <div class="filter-box-body">
      <div class="check-block" v-for="item in work_types" :key="item.id">
        <div class="checkbox">
          <input type="checkbox" id="t1" >
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <div class="l-wrap">
          <label for="t1">{{ item.name }}</label>
          <!--              <span class="count">1 200</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";

const vacancyStore = useVacancyStore();

const {getWorkTypes} = vacancyStore;

const work_types = computed(() => vacancyStore.work_types);

const employmentTypeFilterClass = ref(true);

onMounted(() => {
  getWorkTypes();
});


</script>

<style>
.check-block label{
  white-space: pre-wrap;
}
</style>