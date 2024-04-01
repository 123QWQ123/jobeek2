<template>
  <div class="filter-box" :class="{ open: regionFilterClass }">
    <div
      class="filter-box-handle"
      @click="regionFilterClass = !regionFilterClass"
    >
      <strong>Регионы({{ total }})</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>
    {{}}
    <div v-if="isMore" class="filter-box-body">
      <div class="search_area">
        <input
          type="search"
          v-model="search"
          @keyup.prevent="onSearch"
          @input="onSearch"
        />
      </div>
      <span class="fw-bold is_header mb-2">Выбранные регионы</span>
      <div
        class="check-block-list with_scroll mt-2"
        :class="{ 'all-visible': isMore }"
        v-if="selectedRegionItems.length > 0"
      >
        <div
          class="check-block"
          v-for="item in selectedRegionItems"
          :key="`selected_region_${item.value}`"
        >
          <div class="checkbox">
            <input
              type="checkbox"
              :checked="true"
              :name="`region_${item.value}`"
              @change="toggleRegion(item.value)"
            />
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label :for="`region_${item.id}`">{{ item.name }}</label>
          </div>
        </div>
      </div>
      <div
        class="check-block-list with_scroll mt-3"
        :class="{ 'all-visible': isMore }"
      >
        <div
          class="check-block"
          v-for="item in groupedFilterItems"
          :key="`region_${item.value}`"
          :class="{ is_header: item.is_header }"
        >
          <div class="checkbox" v-if="!item.is_header">
            <input
              type="checkbox"
              :checked="item.is_checked"
              @change="toggleRegion(item.value)"
            />
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label>{{ item.name }}</label>
          </div>
        </div>
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
      <div class="check-block-list" v-if="selectedRegionItems.length">
        <div
          class="check-block"
          v-for="item in selectedRegionItems"
          :key="`selected_region_${item.value}`"
          @click.prevent="toggleRegion(item.value)"
        >
          <div class="checkbox" v-if="!item.is_header">
            <input type="checkbox" :checked="true" />
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap" v-if="!item.is_header">
            <label>{{ item.name }}</label>
          </div>
        </div>
      </div>
      <div
        v-else
        class="check-block-list with_scroll"
        :class="{ 'all-visible': isMore }"
      >
        <div
          class="check-block"
          v-for="item in firstXSelectedItems"
          :key="`region_${item.value}`"
        >
          <div class="checkbox">
            <input
              type="checkbox"
              :name="`region_${item.value}`"
              @change="toggleRegion(item.value)"
            />
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label :for="`region_${item.id}`">{{ item.name }}</label>
          </div>
        </div>
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
const props = defineProps(["name", "isOpen", "selectedCountry"]);
const { selectedCountry } = props;
const { updateQueryParam, getQueryParam } = useQueryParams();
const countries = ref(getQueryParam("countries") ?? [1]);

watch(
  () => getQueryParam("countries") ?? [1], // default country is 1
  async (newValues) => {
    countries.value = newValues;
    await getRegions({ country_ids: countries.value });
    prepare(vacancyStore.regions_formatted);
  },
);

const regions = ref(getQueryParam("regions") ?? []);

watch(
  () => getQueryParam("regions") ?? [],
  (newValues) => {
    regions.value = newValues;
    prepare(vacancyStore.regions_formatted);
  },
);
const vacancyStore = useVacancyStore();

const search = ref("");

const total = computed(() => {
  if (vacancyStore.regions.length > 5) {
    return vacancyStore.regions.length - 5;
  } else {
    return 0;
  }
});
const regionFilterClass = ref(true);
const isMore = ref(false);
const groupedFilterItems = ref([]);
const selectedRegionItems = ref([]);

const firstXSelectedItems = computed(() => {
  return vacancyStore.regions_formatted.slice(0, 5);
});

const toggleMore = () => (isMore.value = !isMore.value);
const onSearch = (e) => {
  const search = e.target.value;
  let items = [...groupedFilterItems.value];
  if (search !== "") {
    items = items.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  } else {
    items = items.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  groupedFilterItems.value = items;
  prepare(items);
};

const toggleRegion = (id) => {
  let selected_ids = [...regions.value];

  if (!selected_ids.includes(id)) {
    selected_ids.push(id);
  } else {
    selected_ids = selected_ids.filter((item) => item !== id);
  }
  selected_ids = selected_ids.length === 0 ? undefined : selected_ids;
  updateQueryParam("regions", selected_ids);
};

const isLoading = ref(false);
const { clearVacancies } = vacancyStore;
const router = useRouter();

const { sort } = useSort();
const prepare = (items) => {
  let filterItems = items;
  let selected_ids = [...regions.value];
  console.log(selected_ids);

  if (filterItems.length < 1) {
    groupedFilterItems.value = [];
    return;
  }

  selectedRegionItems.value = [...filterItems].filter((item) => {
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

const { getRegions } = vacancyStore;
watch(() => vacancyStore.regions_formatted, prepare);
onMounted(async () => {
  await getRegions({ country_ids: countries.value });
  //   appliedCountry.value = selectedCountry;
  // } else {
  //   prepare(null, vacancyStore.regions);
  // }
  // if (selectedItems.value.length > 0) {
  //   isMore.value = true;
  // }
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
