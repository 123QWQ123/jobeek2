<template>
  <div class="filter-box" :class="{'open': regionFilterClass}">
    <div class="filter-box-handle" @click="regionFilterClass = !regionFilterClass">
      <strong>Регион</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#">
    </div>
    <div class="filter-box-body">
      <div class="check-block-list">
        <div class="check-block" v-for="item in regions">
          <div class="checkbox">
            <input type="radio" id="region" name="region" checked>
            <div class="radio-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <div class="l-wrap">
            <label>{{item.name}}</label>
            <!--                <span class="count">1 200</span>-->
          </div>
        </div>
      </div>
      <button class="more-filters" data-default-text="Еще 25"
              data-hide-text="Скрыть">Еще 25 </button>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";

const vacancyStore = useVacancyStore();

const {getRegions} = vacancyStore;

const regions = computed(() => vacancyStore.regions)

const regionFilterClass = ref(true);

onMounted(() => {
  getRegions();
});


</script>

<style scoped>

</style>