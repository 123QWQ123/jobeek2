<template>

  <div class="has-sidebar has-sidebar--v3">
    <div class="content">
      <div class="vacancy-single">
        <div class="vacancy-single-head">
          <h1 class="title">{{ item.name }}</h1>
          <div class="adress">
            <span>{{ item.address }}</span>
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
        <div class="count">{{ item?.open_vacancies ?? 0 }} вакансии</div>
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