<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Подработка</strong>
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
          :name="`work_type_${item.id}`"
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
const partTimes = ref(getQueryParam("part_times") ?? []);

const isChecked = computed(() => (id) => partTimes.value.includes(id));

const toggle = (id) => {
  // Use more efficient toggle logic with splice
  const index = partTimes.value.indexOf(id);
  if (index > -1) {
    partTimes.value.splice(index, 1);
  } else {
    partTimes.value.push(id);
  }

  updateQueryParam(
    "part_times",
    partTimes.value.length ? partTimes.value : undefined,
  );
};

const { sort } = useSort();

const prepareFilterItems = computed(() => {
  return sort(dictionaryStore.part_times, { by: "alpha" }) || [];
});

const filterItems = computed(() => {
  return prepareFilterItems.value.map((item) => ({
    ...item,
  }));
});

// Simplify data fetching. No need for prepare since we use computed properties
const { data: partTimesData } = useAsyncData("getPartTimes", () => {
  return dictionaryStore.getPartTimes();
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
