<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Города ({{ filteredItems.length }})</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="Toggle" />
    </div>

    <div v-if="filterClass" class="filter-box-body">
      <div class="search_area">
        <input type="search" v-model="search" placeholder="Поиск города" />
      </div>

      <span class="fw-bold is_header mb-2">Выбранные города</span>
      <div class="check-block-list with_scroll mt-2">
        <VacanciesCheckbox
          v-for="item in selectedItems"
          :key="item.value"
          :checked="true"
          :class="{ is_header: item.is_header }"
          :name="`selected_city_${item.value}`"
          :label="item.name"
          @change="toggleCity(item.value)"
        />
      </div>

      <div class="check-block-list with_scroll mt-3">
        <div v-bind="containerProps" style="height: 300px">
          <div v-bind="wrapperProps">
            <VacanciesCheckbox
              v-for="(item, index) in list"
              :key="item.data.value + '_' + index"
              :checked="item.data.is_checked"
              :class="{ is_header: item.data.is_header }"
              :name="`unselected_city_${index}`"
              :label="item.data.name"
              @change="toggleCity(item.data.value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useSort from "~/composables/useSort";
import { useVirtualList } from "@vueuse/core";
import { useVacancyStore } from "~/store/vacancy";
import useQueryParams from "~/composables/useQueryParams.js";
import { computed, ref, watch } from "vue";

const vacancyStore = useVacancyStore();
const { getCities } = vacancyStore;

const { updateQueryParam, getQueryParam } = useQueryParams();
const cities = ref(getQueryParam("cities") ?? []);
const regions = ref(getQueryParam("regions") ?? []);

const search = ref("");
const filterClass = ref(true);

const { sortBubbleBySearch } = useSort();

const selectedItems = computed(() =>
  vacancyStore.cities_formatted.filter((item) =>
    cities.value.includes(item.value),
  ),
);

const filteredItems = computed(() => {
  const query = search.value.toLowerCase();
  const availableItems = vacancyStore.cities_formatted.filter(
    (item) => !cities.value.includes(item.value),
  );

  // Filtering items based on search query
  let searchFiltered = availableItems;
  if (query) {
    searchFiltered = availableItems.filter((city) =>
      city.name.toLowerCase().includes(query),
    );

    return sortBubbleBySearch(searchFiltered, query);
  } else {
    // Grouping items by first letter
    let groupedItems = [];
    availableItems.forEach((item, index) => {
      const firstLetter = item.name[0];
      const prevItem = searchFiltered[index - 1];
      if (index === 0 || firstLetter !== prevItem.name[0]) {
        groupedItems.push({
          value: firstLetter,
          name: firstLetter,
          is_header: true,
        });
      }
      groupedItems.push(item);
    });
    return groupedItems;
  }
});

const { list, containerProps, wrapperProps } = useVirtualList(filteredItems, {
  itemHeight: 25,
});
const toggleCity = (id) => {
  const index = cities.value.indexOf(id);
  if (index > -1) {
    cities.value.splice(index, 1);
  } else {
    cities.value.push(id);
  }
  updateQueryParam("cities", cities.value.length ? cities.value : undefined);
};

watch(regions, () => {
  getCities();
});

useAsyncData("cities", async () => await getCities());
</script>

<style scoped>
/* Ensure checkboxes have proper spacing */
.check-block label {
  white-space: pre-wrap;
}

/* Scrollable container for long lists */
.with_scroll {
  max-height: 300px;
  overflow: auto;
}

/* Header-specific styling within list items */
.is_header .l-wrap label {
  font-weight: bold;
}

.is_header input,
.is_header .radio-mask {
  display: none;
}

div.check-block-list.with_scroll > div {
  display: flex;
}

/* Search input styling */
input[type="search"] {
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #cbcbcb;
  padding: 0.1rem 0.3rem;
}
</style>
