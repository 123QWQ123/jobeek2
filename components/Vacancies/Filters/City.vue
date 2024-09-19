<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Города({{ total }})</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>
    <div v-if="isMore" class="filter-box-body">
      <div class="search_area">
        <input
          type="search"
          v-model="search"
          @keyup.prevent="onSearch"
          @input="onSearch"
        />
      </div>
      <span class="fw-bold is_header mb-2">Выбранные города</span>
      <div
        class="check-block-list with_scroll mt-2"
        :class="{ 'all-visible': isMore }"
      >
        <VacanciesCheckbox
          class="check-block"
          v-for="item in selectedItems"
          :checked="true"
          :class="{ is_header: item.is_header }"
          @change="toggleRegion(item.value)"
          :name="`selected_city_${item.value}`"
          :key="`selected_city_${item.value}`"
          :label="item.name"
        />
      </div>
      <div
        class="check-block-list with_scroll mt-3"
        :class="{ 'all-visible': isMore }"
      >
        <VacanciesCheckbox
          class="check-block"
          v-for="item in groupedFilterItems"
          :checked="item.is_checked"
          :class="{ is_header: item.is_header }"
          @change="toggleRegion(item.value)"
          :name="`unselected_city_${item.value}`"
          :label="item.name"
          :is_header="item.is_header"
          :key="`unselected_city_${item.value}`"
        />
      </div>
      <button
        class="more-filters"
        data-default-text="Еще 25"
        data-hide-text="Скрыть"
        @click="toggleMore"
      >
        Скрыть
      </button>
    </div>
    <div v-else class="filter-box-body">
      <div class="check-block-list" v-if="selectedItems.length">
        <VacanciesCheckbox
          class="check-block"
          v-for="item in selectedItems"
          :checked="true"
          @change="toggleRegion(item.value)"
          :name="`selected_city_${item.value}`"
          :label="item.name"
          :key="`selected_city_${item.value}`"
        />
      </div>

      <div
        v-else
        class="check-block-list with_scroll"
        :class="{ 'all-visible': isMore }"
      >
        <VacanciesCheckbox
          class="check-block"
          v-for="item in firstXSelectedItems"
          :checked="false"
          @change="toggleRegion(item.value)"
          :name="`city_${item.value}`"
          :label="item.name"
          :key="`city_${item.value}`"
        />
      </div>
      <button
        class="more-filters"
        :data-default-text="`Еще ${total}`"
        data-hide-text="Показат"
        @click="toggleMore"
        v-if="total > 0"
      >
        Еще {{ total }}
      </button>
    </div>
  </div>
</template>

<script setup>
import useSort from "~/composables/useSort";
import { useVacancyStore } from "~/store/vacancy";
import useQueryParams from "~/composables/useQueryParams.js";

const emit = defineEmits(["onFormChange"]);
const props = defineProps(["name", "isOpen"]);

const { updateQueryParam, getQueryParam } = useQueryParams();
const cities = ref(getQueryParam("cities") ?? []);
const regions = ref(getQueryParam("regions") ?? []);

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
watch(
  () => getQueryParam("cities") ?? [],
  (newValues, oldValues) => {
    if (JSON.stringify(newValues) !== JSON.stringify(oldValues)) {
      cities.value = newValues;
      prepare(vacancyStore.cities_formatted);
    }
  },
);
const vacancyStore = useVacancyStore();

const search = ref("");

const total = computed(() => {
  if (vacancyStore.cities_formatted.length > 5) {
    return vacancyStore.cities_formatted.length - 5;
  } else {
    return 0;
  }
});
const filterClass = ref(true);
const isMore = ref(false);
const groupedFilterItems = ref([]);
const selectedItems = ref([]);

const firstXSelectedItems = computed(() => {
  return vacancyStore.cities_formatted.slice(0, 5);
});

const toggleMore = () => (isMore.value = !isMore.value);
const onSearch = (e) => {
  const search = e.target.value;
  let items = [];
  if (search !== "") {
    items = vacancyStore.cities_formatted.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  } else {
    items = vacancyStore.cities_formatted.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  groupedFilterItems.value = items;
  prepare(items);
};

const { values, toFront } = useVacancySearchParams();
const toggleRegion = (id) => {
  let selected_ids = [...cities.value];

  if (!selected_ids.includes(id)) {
    selected_ids.push(id);
  } else {
    selected_ids = selected_ids.filter((item) => item !== id);
  }
  selected_ids = selected_ids.length === 0 ? undefined : selected_ids;
  updateQueryParam("cities", selected_ids);
};

const { sort } = useSort();
const prepare = (items) => {
  let filterItems = items;
  let selected_ids = [...cities.value];
  if (filterItems.length < 1) {
    groupedFilterItems.value = [];
    return;
  }

  selectedItems.value = [...filterItems].filter((item) => {
    return selected_ids.includes(item.value);
  });

  filterItems = filterItems.filter(
    (item) => !selected_ids.includes(item.value),
  );
  filterItems = sort(filterItems, { by: "alpha" });

  groupedFilterItems.value = [];
  filterItems.map((item, key) => {
    const firstLetter = item.name.charAt(0);
    if (key === 0) {
      groupedFilterItems.value.push({
        value: firstLetter,
        name: firstLetter,
        is_header: true,
      });
    } else {
      let prevFirstLetter;
      if (filterItems[key - 1] !== undefined) {
        prevFirstLetter = filterItems[key - 1].name.charAt(0);
      }
      if (firstLetter !== prevFirstLetter) {
        groupedFilterItems.value.push({
          value: firstLetter,
          name: firstLetter,
          is_header: true,
        });
      }
    }

    groupedFilterItems.value.push({
      value: item.value,
      name: item.name,
      is_header: false,
    });
  });
};

const { getCities } = vacancyStore;
watch(() => vacancyStore.cities_formatted, prepare);
onMounted(async () => {
  await getCities({ region_ids: regions.value });
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
