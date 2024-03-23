<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Отрасль компании({{ industries?.length }})</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>
    <div class="filter-box-body">
      <div class="check-block-list">
        <div
          v-for="item in firstItems"
          :key="item.title"
          class="check-block"
          @click="toggleSelect(item.id)"
        >
          <div class="checkbox">
            <input type="checkbox" :id="item.id" :checked="item.is_checked" />
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
        v-if="isModalOpen"
        :is-open="isModalOpen"
        @toggle="toggleModal"
        name="industries"
        :items="industryItems"
      />

      <button class="more-filters" @click="toggleModal">Выбрать</button>
    </div>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { storeToRefs } from "pinia";
import { useField } from "vee-validate";

const emit = defineEmits(["onFormChange"]);
const props = defineProps(["name", "isOpen"]);

const {
  value: industry_ids,
  setValue,
  errorMessage,
} = useField(() => props.name);

const vacancyStore = useVacancyStore();

const { getIndustries } = vacancyStore;
const { industries } = storeToRefs(vacancyStore);

const isModalOpen = ref(false);
const selectedIndustries = ref(industry_ids.value);
const firstItems = ref([]);

watch(
  () => selectedIndustries.value,
  (newValues) => {
    setValue(newValues);
  },
);

const toggleModal = () => (isModalOpen.value = !isModalOpen.value);
const toggleSelect = (id) => {
  const selectedItemIds = [...industry_ids.value];
  const dynItems = [...firstItems.value].map((item) => {
    if (item.id === id) {
      item.is_checked = !item.is_checked;
      if (item.is_checked && !selectedItemIds.includes(id)) {
        selectedItemIds.push(item.id);
      } else {
        const index = selectedItemIds.indexOf(item.id);
        if (index !== -1) {
          selectedItemIds.splice(index, 1);
        }
      }
    }
    return item;
  });

  setValue(selectedItemIds);
  firstItems.value = dynItems;
};

const industryItems = ref([]);
const prepare = (newItems, oldItems) => {
  industryItems.value = newItems;
  if (!newItems || newItems.length < 1) return;

  for (let i = 0; i < 5; i++) {
    let item = newItems[i];
    let is_checked = false;
    if (industry_ids.value.includes(item.id)) {
      is_checked = true;
    }
    firstItems.value.push({
      id: item.id,
      title: item.title,
      is_checked,
    });
  }
};
watch(() => vacancyStore.industries_formatted_for_filter, prepare);

const filterClass = ref(true);
await getIndustries();
onMounted(() => {
  setTimeout(async () => {
    if (vacancyStore.industries_formatted_for_filter.length > 0) {
      prepare(vacancyStore.industries_formatted_for_filter);
    }
  }, 100);
});
</script>

<style scoped>
.check-block label {
  white-space: pre-wrap;
}

.check-block {
}
</style>
