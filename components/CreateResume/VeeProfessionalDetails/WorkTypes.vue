<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";

const { work_types_formatted } = useDictionaryStore();
</script>

<template>
  <VeeMultiSelectWithSearch
    name="work_types"
    sort_by="none"
    :options="work_types_formatted"
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
