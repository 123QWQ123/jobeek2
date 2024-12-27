<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <!-- Filter section header with toggle functionality -->
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Города ({{ total }})</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="Toggle" />
    </div>

    <div v-if="isMore" class="filter-box-body">
      <!-- Search bar -->
      <div class="search_area">
        <input
          type="search"
          v-model="search"
          @input="onSearch"
          placeholder="Search cities"
        />
      </div>

      <!-- Selected cities -->
      <span class="fw-bold is_header mb-2">Выбранные города</span>
      <div class="check-block-list with_scroll mt-2">
        <VacanciesCheckbox
          v-for="item in selectedItems"
          :key="`selected_city_${item.value}`"
          :checked="true"
          :class="{ is_header: item.is_header }"
          :name="`selected_city_${item.value}`"
          :label="item.name"
          @change="toggleCity(item.value)"
        />
      </div>

      <!-- Cities available for selection -->
      <div class="check-block-list with_scroll mt-3">
        <VacanciesCheckbox
          v-for="item in groupedFilterItems"
          :key="`unselected_city_${item.value}`"
          :checked="item.is_checked"
          :class="{ is_header: item.is_header }"
          :name="`unselected_city_${item.value}`"
          :label="item.name"
          @change="toggleCity(item.value)"
        />
      </div>

      <!-- More toggle button -->
      <button class="more-filters" @click="toggleMore">
        {{ isMore ? "Скрыть" : `Еще ${total}` }}
      </button>
    </div>

    <!-- Simplified view if isMore is false -->
    <div v-else class="filter-box-body">
      <div class="check-block-list" v-if="selectedItems.length">
        <VacanciesCheckbox
          v-for="item in selectedItems"
          :key="`selected_city_${item.value}`"
          :checked="true"
          :name="`selected_city_${item.value}`"
          :label="item.name"
          @change="toggleCity(item.value)"
        />
      </div>
      <div v-else class="check-block-list with_scroll">
        <VacanciesCheckbox
          class="check-block"
          v-for="item in firstXSelectedItems"
          :key="`city_${item.value}`"
          :checked="false"
          :name="`city_${item.value}`"
          :label="item.name"
          @change="toggleCity(item.value)"
        />
      </div>
      <button class="more-filters" v-if="total > 0" @click="toggleMore">
        {{ isMore ? "Скрыть" : `Еще ${total}` }}
      </button>
    </div>
  </div>
</template>

<script setup>
// Import dependencies
import useSort from "~/composables/useSort";
import { useVacancyStore } from "~/store/vacancy";
import useQueryParams from "~/composables/useQueryParams.js";

// Define props and emit events
const props = defineProps(["name", "isOpen"]);
const emit = defineEmits(["onFormChange"]);

const vacancyStore = useVacancyStore();
const { getCities } = vacancyStore;

// Initialize query parameters
const { updateQueryParam, getQueryParam } = useQueryParams();
const cities = ref(getQueryParam("cities"));
const regions = ref(getQueryParam("regions"));

// Reactive variables and states
const search = ref("");
const filterClass = ref(true);
const isMore = ref(false);
const groupedFilterItems = ref(vacancyStore.cities_formatted);

// Computed properties for selected and pre-selected items
const selectedItems = computed(() =>
  vacancyStore.cities_formatted.filter(({ value }) => {
    return cities.value?.includes(value);
  }),
);
const firstXSelectedItems = computed(() =>
  vacancyStore.cities_formatted.slice(0, 5),
);
const total = computed(() =>
  vacancyStore.cities_formatted.length > 5
    ? vacancyStore.cities_formatted.length - 5
    : 0,
);

// Fetch cities data using async data loading
useAsyncData(
  "cities",
  async () => await getCities({ region_ids: getQueryParam("regions") }),
);

// Watch for region changes and update state accordingly
watch(
  () => getQueryParam("regions") ?? [],
  (newValues, oldValues) => {
    if (JSON.stringify(newValues) !== JSON.stringify(oldValues)) {
      regions.value = newValues;
      getCities({ region_ids: regions.value });
      prepare(vacancyStore.cities_formatted);
    }
  },
);

// Toggles the "More" filter visibility
const toggleMore = () => {
  isMore.value = !isMore.value;
};

// Add or remove city from the selection
const toggleCity = (id) => {
  let selected = cities.value || [];

  if (selected.includes(id)) {
    selected = selected.filter((item) => item !== id);
  } else {
    selected.push(id);
  }

  cities.value = selected.length ? selected : undefined;
  prepare(vacancyStore.cities_formatted);
  updateQueryParam("cities", selected);
};

// Filter cities based on search input
const onSearch = (e) => {
  const query = e.target.value.toLowerCase();
  groupedFilterItems.value = vacancyStore.cities_formatted.filter((city) =>
    city.name.toLowerCase().includes(query),
  );
  prepare(groupedFilterItems.value);
};

// Prepare data for display (grouping by alphabet and sorting)
const { sort } = useSort();
const prepare = (items) => {
  if (!items.length) {
    groupedFilterItems.value = [];
    return;
  }

  const selectedIds = cities.value || [];
  const filteredItems = items
    .filter((item) => !selectedIds.includes(item.value))
    .sort((a, b) => a.name.localeCompare(b.name));

  groupedFilterItems.value = [];
  filteredItems.forEach((item, index) => {
    const firstLetter = item.name[0];
    const previousItem = filteredItems[index - 1];

    // Add alphabetical headers
    if (!previousItem || firstLetter !== previousItem.name[0]) {
      groupedFilterItems.value.push({
        value: firstLetter,
        name: firstLetter,
        is_header: true,
      });
    }
    groupedFilterItems.value.push(item);
  });
};

prepare(vacancyStore.cities_formatted);
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
