<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";

const { resume_work_type_formatted } = storeToRefs(useDictionaryStore());
</script>

<template>
  <VeeMultiSelectWithSearch
    name="work_types"
    sort_by="none"
    :options="resume_work_type_formatted"
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
