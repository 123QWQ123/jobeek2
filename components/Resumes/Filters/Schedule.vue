<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>График работы</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>

    <div class="filter-box-body">
      <div class="check-block-list" :class="{ 'all-visible': isMore }">
        <VacanciesCheckbox
          v-for="item in filterItems"
          :key="item.id"
          class="check-block"
          :checked="isChecked(item.id)"
          @change="toggle(item.id)"
          :name="`schedule_${item.id}`"
          :label="item.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import useQueryParams from "~/composables/useQueryParams.js";
import { computed, ref } from "vue";

const dictionaryStore = useDictionaryStore();
const filterClass = ref(true);
const isMore = ref(true);

const { getQueryParam, updateQueryParam } = useQueryParams();
const schedules = ref(getQueryParam("schedules") ?? []);

const isChecked = computed(() => (id) => schedules.value.includes(id));

const toggle = (id) => {
  const index = schedules.value.indexOf(id);
  if (index > -1) {
    schedules.value.splice(index, 1);
  } else {
    schedules.value.push(id);
  }
  updateQueryParam(
    "schedules",
    schedules.value.length ? schedules.value : undefined,
  );
};

const { sort } = useSort();

const preparedItems = computed(() => {
  const sortedItems = sort(dictionaryStore.schedules, { by: "alpha" }) || [];
  return sortedItems;
});

const filterItems = computed(() => preparedItems.value);

const { data: schedulesData } = useAsyncData("getSchedules", () =>
  dictionaryStore.getSchedules(),
);
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
