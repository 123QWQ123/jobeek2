<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Тип занятости</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>

    <div class="filter-box-body">
      <div class="check-block-list" :class="{ 'all-visible': isMore }">
        <div class="check-block" v-for="item in filterItems">
          <div class="checkbox">
            <input
              type="checkbox"
              :checked="item.is_checked"
              @change="toggle(item.id)"
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
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useVacancyStore } from "../../../store/vacancy";
import useSort from "~/composables/useSort";
import { useResumeForm } from "~/composables/useResumeForm.js";

const emit = defineEmits(["onFormChange"]);

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();

const filterClass = ref(true);
const isMore = ref(true);
const search = ref("");
const filterItems = ref([]);

const toggleMore = () => (isMore.value = !isMore.value);

const form = ref(useResumeForm());
const selectedFilterItems = ref(form.value.work_types);

const toggle = (id) => {
  filterItems.value.map((item, key) => {
    if (item.id === id) {
      item.is_checked = !item.is_checked;
      if (
        !selectedFilterItems.value.includes(parseInt(item.id)) &&
        item.is_checked
      ) {
        selectedFilterItems.value.push(item.id);
      } else {
        if (
          selectedFilterItems.value.includes(item.id) &&
          item.is_checked === false
        ) {
          selectedFilterItems.value = selectedFilterItems.value.filter(
            (sub) => sub !== item.id,
          );
        }
      }
      return item;
    }
    return item;
  });
  form.value.work_types = selectedFilterItems.value;
  submitSearch();
};

const isLoading = ref(false);
const { clearVacancies } = vacancyStore;
const router = useRouter();
const submitSearch = () => {
  emit("onFormChange", "work_types", selectedFilterItems.value);
};

const { sort } = useSort();

const prepare = (items, custom_items) => {
  let unsortedItems = items;
  if (!items) {
    unsortedItems = custom_items;
  }

  const sortedItems = sort(unsortedItems, { by: "alpha" });

  filterItems.value = sortedItems.map((item) => {
    item.is_checked = selectedFilterItems.value.includes(item.id);
    return item;
  });
};

watch(() => dictionaryStore.work_types, prepare);
const { getWorkTypes } = dictionaryStore;
onMounted(async () => {
  if (dictionaryStore.work_types.length === 0) {
    await getWorkTypes();
  } else {
    prepare(null, dictionaryStore.work_types);
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
