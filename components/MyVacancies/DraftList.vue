<template>
  <ul class="resume-list mt-4" v-if="my_drafts.length > 0">
<!--    <MyVacanciesDraftItem v-for="item in my_drafts" :key="item.id" :item="item" />-->
    <MyVacanciesDraftItem v-for="item in my_drafts" :key="item.id" :item="item" />

  </ul>
  <div class="d-flex mt-4 pb-4 justify-content-center" v-else>
    <p>Ничего не найдено!</p>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    required: false,
    default: [],
  }
});
import {useVacancyStore} from "~/store/vacancy";

const my_drafts = computed(() => props.items);

// const vacancyStore = useVacancyStore();
// const {getMyDrafts} = vacancyStore;
// const {my_drafts, my_draft_current_page, my_draft_total} = storeToRefs(vacancyStore);

</script>

<style scoped>

.theme-checker input ~ .theme-checker-ui .circle.left{
  transform: translate(3px, -50%);
}
.theme-checker input ~ .theme-checker-ui .circle.right{
  transform: translate(30px, -50%);
}

.sort .d-select{
  background: #F5F8FA !important;
}
</style>