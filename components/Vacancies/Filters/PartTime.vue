<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Подработка</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>

    <div class="filter-box-body">
      <div class="check-block-list" :class="{ 'all-visible': isMore }">
        <VacanciesCheckbox
          class="check-block"
          v-for="item in filterItems"
          :checked="item.is_checked"
          @change="toggle(item.id)"
          :name="`work_type_${item.id}`"
          :label="item.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useVacancyStore } from "~/store/vacancy";
import useQueryParams from "~/composables/useQueryParams.js";

const emit = defineEmits(["onFormChange"]);

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();

const filterClass = ref(true);
const isMore = ref(true);
const search = ref("");
const filterItems = ref([]);

const { getQueryParam, updateQueryParam } = useQueryParams();
const part_times = ref(getQueryParam("part_times") ?? []);
watch(
  () => getQueryParam("part_times") ?? [],
  (newValues) => {
    part_times.value = newValues;
  },
);

const selectedFilterItems = ref([]);

const toggle = (id) => {
  let selected_ids = [...part_times.value];

  if (!selected_ids.includes(id)) {
    selected_ids.push(id);
  } else {
    selected_ids = selected_ids.filter((item) => item !== id);
  }
  selected_ids = selected_ids.length === 0 ? undefined : selected_ids;
  updateQueryParam("part_times", selected_ids);
};

const { sort } = useSort();

const prepare = (items) => {
  let selected_ids = [...part_times.value];

  const sortedItems = sort(items, { by: "alpha" });

  if (sortedItems) {
    items = sortedItems.map((item) => ({
      ...item,
      is_checked: selected_ids.includes(item.id),
    }));
  }
  filterItems.value = items;
};

watch(() => dictionaryStore.part_times, prepare);
const { getPartTimes } = dictionaryStore;
onMounted(async () => {
  if (dictionaryStore.part_times.length === 0) {
    await getPartTimes();
  } else {
    prepare(null, dictionaryStore.part_times);
  }
});
</script>

<style scoped>
.check-block label {
  white-space: pre-wrap;
}

.with_scroll {
  max-height: 300px;
  overflow: auto;
}

.is_header .l-wrap label {
  font-weight: bold;
}

.is_header input,
.is_header .radio-mask {
  display: none;
}

input[type="search"] {
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #cbcbcb;
  padding: 0.1rem 0.3rem;
}
</style>
