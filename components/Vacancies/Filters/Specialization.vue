<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong
        >Профессиональные роли({{
          vacancyStore.professional_roles_formatted_for_filter?.length
        }})</strong
      >
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

      <VacanciesFiltersSpecializationModal
        title="Специализации"
        :selected_ids="professional_role_ids"
        :is-open="isModalOpen"
        @close="toggleModal"
        name="industries"
        :items="vacancyStore.professional_roles_formatted_for_filter"
      />

      <button class="more-filters" @click="toggleModal">Выбрать</button>
    </div>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import useQueryParams from "~/composables/useQueryParams.js";

const emit = defineEmits(["onFormChange"]);
const props = defineProps(["name", "isOpen"]);

const vacancyStore = useVacancyStore();
const { updateQueryParam, getQueryParam } = useQueryParams();

const { getProfessionalRoles } = vacancyStore;

const professional_role_ids = ref(getQueryParam("professional_roles") ?? []);
watch(
  () => getQueryParam("professional_roles") ?? [],
  (newValues, oldValues) => {
    if (JSON.stringify(newValues) !== JSON.stringify(oldValues)) {
      professional_role_ids.value = newValues;
      prepare(vacancyStore.regions_formatted);
    }
  },
);
const isModalOpen = ref(true);
const firstItems = ref([]);

const toggleModal = () => (isModalOpen.value = !isModalOpen.value);
const toggleSelect = (id) => {
  let selected_ids = [...professional_role_ids.value];
  const dynItems = [...firstItems.value].map((item) => {
    if (item.id === id) {
      item.is_checked = !item.is_checked;
      if (item.is_checked && !selected_ids.includes(id)) {
        selected_ids.push(item.id);
      } else {
        const index = selected_ids.indexOf(item.id);
        if (index !== -1) {
          selected_ids.splice(index, 1);
        }
      }
    }
    return item;
  });

  selected_ids = selected_ids.length === 0 ? undefined : selected_ids;

  updateQueryParam(
    "professional_roles",
    JSON.stringify(Array.from(new Set(selected_ids))),
  );
  firstItems.value = dynItems;
};

const industryItems = ref([]);
const prepare = (newItems, oldItems) => {
  industryItems.value = newItems;
  if (!newItems || newItems.length < 1) return;
  for (let i = 0; i < 5; i++) {
    let item = newItems[i];
    let is_checked = false;
    if (professional_role_ids.value.includes(item.id)) {
      is_checked = true;
    }
    firstItems.value.push({
      id: item.id,
      title: item.title,
      is_checked,
    });
  }
};
watch(() => vacancyStore.professional_roles_formatted_for_filter, prepare);

const filterClass = ref(true);
await getProfessionalRoles();
onMounted(() => {
  setTimeout(async () => {
    if (vacancyStore.professional_roles_formatted_for_filter.length > 0) {
      prepare(vacancyStore.professional_roles_formatted_for_filter);
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
