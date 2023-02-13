<template>
  <aside class="aside">
    <button class="close-aside">
      <svg xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px"
           y="0px" width="20" height="20" viewBox="0 0 122.878 122.88"
           enable-background="new 0 0 122.878 122.88" xml:space="preserve">
                                    <g>
                                        <path
                                            d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                                    </g>
                                </svg>
    </button>
    <div class="filter-container">
      <div class="filter-head"> <strong>Фильтры</strong>
        <button class="clear-all">Очистить все</button>
      </div>
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
                <label for="zp">{{item.name}}</label>
<!--                <span class="count">1 200</span>-->
              </div>
            </div>
          </div>
<!--          <button class="more-filters" data-default-text="Еще 25"-->
<!--                  data-hide-text="Скрыть">Еще 25 </button>-->
        </div>
      </div>
      <div class="filter-box" :class="{'open': salaryFilterClass}">
        <div class="filter-box-handle" @click="salaryFilterClass = !salaryFilterClass">
          <strong>Зарплата</strong>
          <img src="~/assets/img/svg/Arrow-Down.svg" alt="#">
        </div>
        <div class="filter-box-body">
          <div class="check-block-list">
            <div class="check-block">
              <div class="checkbox">
                <input type="radio" id="zp" name="salary" checked>
                <div class="radio-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <div class="l-wrap">
                <label for="zp">С указанной зп</label><span class="count">1
                                                        200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="radio" id="21k" name="salary">
                <div class="radio-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <div class="l-wrap">
                <label for="21k">От 20 000 ₽</label><span class="count">200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="radio" id="20k" name="salary">
                <div class="radio-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <div class="l-wrap">
                <label for="20k">От 20 000 ₽</label><span class="count">200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div class="filter-box" :class="{'open': employmentTypeFilterClass}">
        <div class="filter-box-handle" @click="employmentTypeFilterClass = !employmentTypeFilterClass">
          <strong>Тип занятости</strong>
          <img src="~/assets/img/svg/Arrow-Down.svg" alt="#"></div>
        <div class="filter-box-body">
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="t1" checked>
              <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
            </div>
            <div class="l-wrap">
              <label for="t1">Полная занятость</label>
<!--              <span class="count">1 200</span>-->
            </div>
          </div>
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="t2" checked>
              <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
            </div>
            <div class="l-wrap">
              <label for="t1">Частичная занятость </label>
<!--              <span class="count">1 200</span>-->
            </div>
          </div>
          <div class="check-block">
            <div class="checkbox">
<<<<<<< HEAD
              <input type="checkbox" id="t3" checked>
=======
              <input type="checkbox" checked>
>>>>>>> main
              <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
            </div>
            <div class="l-wrap">
              <label for="t1">Стажировка </label>
<!--              <span class="count">1 200</span>-->
            </div>
          </div>
<<<<<<< HEAD
=======
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" checked>
              <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
            </div>
            <div class="l-wrap">
              <label for="t1">Удаленная</label>
<!--              <span class="count">1 200</span>-->
            </div>
          </div>
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" checked>
              <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
            </div>
            <div class="l-wrap">
              <label for="t1">В офис</label>
<!--              <span class="count">1 200</span>-->
            </div>
          </div>
>>>>>>> main
        </div>
      </div>
      <div class="filter-box">
        <div class="filter-box-handle"> <strong>Дополнительные параметры</strong><img
            src="~/assets/img/svg/Arrow-Down.svg" alt="#"></div>
        <div class="filter-box-body">
          <div class="check-block-list">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="t3" checked>
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#">
                </div>
              </div>
              <div class="l-wrap">
                <label for="t3">Тип 1</label><span class="count">1 200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="t4">
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#">
                </div>
              </div>
              <div class="l-wrap">
                <label for="t4">Тип 2</label><span class="count">200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";

const vacancyStore = useVacancyStore();

const {getSpecializations, getRegions} = vacancyStore;
await getRegions();
await getSpecializations();
const regions = computed(() => vacancyStore.regions)
const specializations = computed(() => vacancyStore.specializations)

const regionFilterClass = ref(true);
const salaryFilterClass = ref(true);
const specializationFilterClass = ref(true);
const employmentTypeFilterClass = ref(true);

</script>

<style scoped>

</style>