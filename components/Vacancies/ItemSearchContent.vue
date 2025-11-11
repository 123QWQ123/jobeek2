<template>
  <div v-if="data" class="has-sidebar has-sidebar--v3">
    <div class="content">
      <div class="vacancy-single">
        <div class="vacancy-single-head">
          <h1 class="title">{{ data.name }}</h1>
          <div class="adress">
            <span>{{ data.address?.raw ?? data.city?.name }}</span>
          </div>
          <div class="requirements">
            {{ data.experience?.name ? data.experience.name + "," : "" }}
            {{ data.education?.name ? data.education.name + "," : "" }}
            {{ data.schedule?.name ? data.schedule.name + "," : "" }}
            {{ data.work_type.name }},
            {{ moment(data.published_date).format("YYYY.MM.DD") }}
          </div>
          <div class="salary" v-if="data.salary_to && data.salary_from">
            {{ salary_from }} — {{ salary_to }} {{ data.currency }}/месяц
          </div>
          <div class="salary" v-else-if="data.salary_from">
            от {{ salary_from }} {{ data.currency }}/месяц
          </div>
          <div class="salary" v-else-if="data.salary_to">
            {{ salary_to }} {{ data.currency }}./месяц
          </div>
        </div>
        <div class="vacancy-single-body" v-html="data.description"></div>
      </div>
    </div>
    <aside class="sidebar">
      <VacanciesSingleContentSidebar :data="data" />
    </aside>
  </div>
</template>

<script setup>
import moment from "moment";
import { useVacancyStore } from "~/store/vacancy";
import { ref } from "vue";

const props = defineProps({
  data: {
    required: true,
  },
});
const { data } = storeToRefs(props);
const { $format_number } = useNuxtApp();
const salary_from = ref($format_number(data.value.salary_from));
const salary_to = ref($format_number(data.value.salary_to));
</script>

<style scoped></style>
