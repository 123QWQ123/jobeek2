<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";

const dictionaryStore = useDictionaryStore();

const { getWorkTypes, getHHWorkTypes, getSuperjobWorkTypes } = dictionaryStore;
// todo посмотреть насколько актуальный этот весь код
const hhWorkTypes = ref([]);
const superjobWorkTypes = ref([]);

watch(
  () => dictionaryStore.hh_work_types,
  () => {
    hhWorkTypes.value = dictionaryStore.hh_work_types.map((item) => item.id);
  },
);
watch(
  () => dictionaryStore.superjob_work_types,
  () => {
    superjobWorkTypes.value = dictionaryStore.superjob_work_types.map(
      (item) => item.id,
    );
  },
);
const updateHHWorkTypes = async (newValue = "") => {
  let items;
  items = await getHHWorkTypes();
  items = items.filter((item) => item.parent_id !== 0);
  hhWorkTypes.value = items.map((item) => item.id);
};
const updateSuperjobWorkTypes = async (newValue = "") => {
  let items;
  items = await getSuperjobWorkTypes();
  superjobWorkTypes.value = items.map((item) => item.id);
};

onMounted(() => {
  getWorkTypes();
  updateHHWorkTypes();
  updateSuperjobWorkTypes();
});
</script>

<template>
  <VeeMultiSelectWithSearch
    name="work_types"
    sort_by="none"
    :options="dictionaryStore.work_types_formatted"
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
