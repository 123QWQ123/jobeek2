<template>

  <div class="has-sidebar has-sidebar--v3">
    <div class="content">
      <div class="vacancy-single">
        HH
        <div class="vacancy-single-head">
          <h1 class="title">Продавец-консультант и рабоник зала</h1>
          <div class="adress"> <span>{{ item.address }}</span>
            <button class="on-map"> <img src="~/assets/img/svg/cil_map.svg" alt="#">Показать на карте</button>
          </div>
          <div class="requirements">{{item.experience && item.experience + ","}}  {{item.education && item.education + ','}} {{item.work_type}}</div>
          <div class="salary">{{ vueNumberFormat(item.salary_from, {}) }} — {{ vueNumberFormat(item.salary_to, {}) }} руб./месяц     </div>
        </div>
        <div class="vacancy-single-body">
          {{item.description}}
        </div>
        <div class="vacancy-single-footer">
          <button class="btn button-accent button-accent--ts-bigger">Откликнуться</button>
        </div>
      </div>
    </div>
    <aside class="sidebar">
      <div class="company-col sticky-item">
        <div class="company-logo"><img :src="item.logo" alt="#"></div>
        <h3 class="title">{{ item.company }}</h3>
        <p>Клиент SuperJob с {{moment(item.published_date * 1000).format("YYYY")}} года</p>
        <p>Более 5000 сотрудников</p>
<!--        <p>«Перекрёсток» предлагает покупателям только лучшее, потому что у нас сильная команда активных и целеустремлённых сотрудников!      </p>-->
        <div class="count">123 вакансии</div>
        <div class="grade-box-container">
          <div class="title">Оценки сотрудников</div>
          <div class="grade-box">
            <div class="grade-box-circle">
              <svg class="progress" data-complete="0.75" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                <circle cx="16" cy="16" r="15.9155" class="progress-bar__background"></circle>
                <circle cx="16" cy="16" r="15.9155" class="progress-bar__progress js-progress-bar" style="stroke-dashoffset: 25px;"></circle>
              </svg>
              <span>7.5</span>
            </div>
            <div class="grade-box-text">
              <strong>Хорошо</strong>
              <a href="#">12 отзывов</a>
            </div>
          </div>
          <span class="txt">55% рекомендуют компанию</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import moment from "moment";
const {item} = defineProps({
  item: {
    required: true
  }
});

console.log(item);
</script>

<style scoped>

</style>