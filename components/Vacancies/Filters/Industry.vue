<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Отрасль компании({{ industries?.length }})</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>
    <div class="filter-box-body">
      <div class="check-block-list">
        <div v-for="item in firstItems" :key="item.title" class="check-block">
          <div class="checkbox">
            <input
              type="checkbox"
              :id="item.id"
              :checked="item.is_checked"
              @change="toggleSelect($event, item.id)"
            />
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label :for="item.id">{{ item.title }}</label>
          </div>
        </div>
      </div>

      <LazyVacanciesFiltersIndustryModal
        :title="'Отрасль компании'"
        :is-open="isModalOpen"
        @close="toggleModal"
        name="industries"
        :items="items"
      />

      <button class="more-filters" @click="toggleModal">Выбрать</button>
    </div>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { storeToRefs } from "pinia";
import useQueryParams from "~/composables/useQueryParams.js";

const emit = defineEmits(["onFormChange"]);
const props = defineProps(["name", "isOpen"]);

const vacancyStore = useVacancyStore();
const { updateQueryParam, getQueryParam } = useQueryParams();
let items = vacancyStore.industries_formatted_for_filter;

const { getIndustries } = vacancyStore;
const { industries } = storeToRefs(vacancyStore);

const industry_ids = ref(getQueryParam("industries") ?? []);
watch(
  () => getQueryParam("industries"),
  (newValues, oldValues) => {
    if (JSON.stringify(newValues) !== JSON.stringify(oldValues)) {
      industry_ids.value = newValues;
      items = getCheckedItems(items, newValues);

      prepare(items);
    }
  },
);
const isModalOpen = ref(false);
const firstItems = ref([]);

const toggleModal = () => (isModalOpen.value = !isModalOpen.value);
const toggleSelect = (event, id) => {
  let checked = event.target.checked;
  let selected_ids = [...industry_ids.value];
  const dynItems = [...firstItems.value].map((item) => {
    if (item.id === id) {
      item.is_checked = checked;
      if (checked && !selected_ids.includes(id)) {
        selected_ids.push(item.id);
        selected_ids.push(...item.items.map((sub) => sub.id));
      } else if (!checked) {
        selected_ids = selected_ids.filter((selected_id) => {
          if (selected_id === item.id) {
            return false;
          }
          return !item.items.some((sub_item) => sub_item.id === selected_id);
        });
      }
    }
    return item;
  });

  selected_ids = selected_ids.length === 0 ? undefined : selected_ids;

  updateQueryParam(
    "industries",
    JSON.stringify(Array.from(new Set(selected_ids))),
  );
  firstItems.value = dynItems;
};

const prepare = (newItems, oldItems) => {
  if (!newItems || newItems.length < 1) return;
  let arr = [];
  for (let i = 0; i < 5; i++) {
    let item = newItems[i];
    let is_checked = false;
    if (industry_ids.value && industry_ids.value.includes(item.id)) {
      is_checked = true;
    }
    arr.push({
      id: item.id,
      title: item.title,
      is_checked,
      items: item.items,
    });
  }
  firstItems.value = arr;
};

const getCheckedItems = (items, ids_from_url) => {
  return items.map((item) => {
    if (ids_from_url && ids_from_url.includes(item.id)) {
      item.checked = true;
      item.items = item.items.map((sub_item) => {
        sub_item.checked = true;
        return sub_item;
      });
    } else {
      if (item.items.length > 0) {
        item.items = item.items.map((sub_item) => {
          if (ids_from_url && ids_from_url.includes(sub_item.id)) {
            sub_item.checked = true;
          }
          return sub_item;
        });
      }
    }
    return item;
  });
};

const filterClass = ref(true);
await getIndustries();
onMounted(() => {
  if (vacancyStore.industries_formatted_for_filter.length > 0) {
    prepare(vacancyStore.industries_formatted_for_filter);
  }
});
</script>

<style scoped>
.check-block label {
  white-space: pre-wrap;
}

.check-block {
}
</style>
