<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";

const { resume_work_type } = storeToRefs(useDictionaryStore());
</script>

<template>
  <VeeMultiSelectWithSearch
    name="work_types"
    sort_by="none"
    :options="resume_work_type.map((item) => ({ name: item.name, value: item.id }))"
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
