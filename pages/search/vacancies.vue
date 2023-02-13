<script setup>
import {useVacancyStore} from "../../store/vacancy";

definePageMeta({
  layout: 'main'
});

</script>
<template>
  <div>
    <VacanciesForm></VacanciesForm>
    <VacanciesResults></VacanciesResults>
  </div>
</template>