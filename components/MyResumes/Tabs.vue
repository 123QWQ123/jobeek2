<template>
  <ul class="nav nav-tabs" id="myTab" role="tablist">

    <li class="nav-item" role="presentation">
      <NuxtLink class="nav-link" id="active-tab" type="button" to="/my-vacancies/active" role="tab">Активные</NuxtLink>
    </li>
    <li class="nav-item" role="presentation">
      <NuxtLink class="nav-link active" id="home-tab" type="button" to="/my-vacancies/" role="tab"></NuxtLink>
    </li>
    <li class="nav-item" role="presentation">
      <NuxtLink class="nav-link active" id="home-tab" type="button" to="/my-vacancies/" role="tab">Все</NuxtLink>
    </li>
    <li class="nav-item" role="presentation">
      <NuxtLink class="nav-link" id="archived-tab" type="button" to="/my-vacancies/active" role="tab">В архиве</NuxtLink>
    </li>
    <div class="nav-item ms-auto d-flex justify-content-end" role="presentation">

      <div class="option-group selector-group">
        <div class="option">
          <div class="custom-check-wrap">
            <div class="theme-checker theme-checker--blue">
              <input type="checkbox" id="hh" />
              <div class="theme-checker-ui">
                <div class="circle"></div>
              </div>
            </div>
            <label for="hh"
            ><img
                src="~/assets/img/logos/hhmini.svg"
                alt="#"
            /><span>Hh.ru</span></label
            >
          </div>
        </div>
        <div class="option">
          <div class="custom-check-wrap">
            <div class="theme-checker theme-checker--blue">
              <input type="checkbox" id="sj" checked />
              <div class="theme-checker-ui">
                <div class="circle"></div>
              </div>
            </div>
            <label for="sj"
            ><img src="~/assets/img/logos/sj.svg" alt="#" /><span
            >Superjob.ru
                          </span></label
            >
          </div>
        </div>
      </div>

    </div>
  </ul>
</template>

<script setup>

import Swal from "sweetalert2";

useHead({
    title: "Jobeek - Мои резюме"
})
import {useVacancyStore} from "../../store/vacancy";
import {storeToRefs} from "pinia";
import PageLoader from "~/components/UI/PageLoader.vue";
import {useMyVacancyForm} from "~/composables/useMyVacancyForm";
import CustomSelect from "~/components/UI/CustomSelect.vue";
import {useMyVacancySortingOptions} from "~/composables/useMyVacancySortingOptions";
import {useMyVacancyPerPageOptions} from "~/composables/useMyVacancyPerPageOptions";



const listStyles = {
    'left': 'unset',
    'right': 0,
    'width': 'auto !important'
}
</script>

<style scoped>

</style>