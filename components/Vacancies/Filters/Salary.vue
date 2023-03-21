<template>
  <div class="filter-box" :class="{'open': salaryFilterClass}">
    <div class="filter-box-handle" @click="salaryFilterClass = !salaryFilterClass">
      <strong>Зарплата</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#">
    </div>
    <div class="filter-box-body">
      <div class="check-block-list all-visible">

        <div v-for="item in salaryOptions"  class="check-block">
          <div class="checkbox">
            <input type="radio" :id="item.value" name="salary">
            <div class="radio-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <div class="l-wrap">
            <label :for="item.value" >{{item.name}} ₽</label>
            <!--                <span class="count">200</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useSalaryOptions} from "../../../composables/useSalaryOptions";
import {useVacancyStore} from "../../../store/vacancy";
const vacancyStore = useVacancyStore();
const salaryOptions = useSalaryOptions();

const {getVacancies} = vacancyStore;

const salaryFilterClass = ref(true);

</script>

<style scoped>

</style>