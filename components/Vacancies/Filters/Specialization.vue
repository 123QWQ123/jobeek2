<template>
  <div class="filter-box" :class="{'open': specializationFilterClass}">
    <div class="filter-box-handle" @click="specializationFilterClass = !specializationFilterClass">
      <strong>Специализации</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#"></div>
    <div class="filter-box-body">
      <div class="check-block-list">
        <div v-for="item in specializations" :key="item.title" class="check-block">
          <div class="checkbox">
            <input type="checkbox" id="s1" checked>
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label for="s1">{{ item.title }}</label>
          </div>
        </div>
      </div>
      <!--          <button class="more-filters" data-default-text="Еще 25"-->
      <!--                  data-hide-text="Скрыть">-->
      <!--            Еще 25-->
      <!--          </button>-->
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";

const vacancyStore = useVacancyStore();

const {getSpecializations} = vacancyStore;

const specializations = computed(() => vacancyStore.specializations)

const specializationFilterClass = ref(true);

onMounted(() => {
  getSpecializations();
});


</script>

<style>
.check-block label{
  white-space: pre-wrap;
}
</style>