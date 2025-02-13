<template>
  <div class="filter-box" :class="{ open: filterClass }">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Опыт работы</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#" />
    </div>

    <div class="filter-box-body">
      <div class="check-block-list">
        <VacanciesCheckbox
          v-for="item in filterItems"
          :key="item.id"
          class="check-block"
          :checked="isChecked(item.id)"
          :name="`experience_${item.id}`"
          @change="toggle(item.id)"
          :label="item.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import useQueryParams from "~/composables/useQueryParams.js";
import { computed, ref, watch } from "vue";

const dictionaryStore = useDictionaryStore();
const filterClass = ref(true);

const { getQueryParam, updateQueryParam } = useQueryParams();
const experiences = ref(getQueryParam("experiences") ?? []);

const isChecked = computed(() => (id) => experiences.value.includes(id));

const toggle = (id) => {
  const index = experiences.value.indexOf(id);
  if (index > -1) {
    experiences.value.splice(index, 1);
  } else {
    experiences.value.push(id);
  }
  updateQueryParam(
    "experiences",
    experiences.value.length ? experiences.value : undefined,
  );
};

const { sort } = useSort();

const preparedItems = computed(() => {
  return sort(dictionaryStore.experiences, { by: "alpha" }) || [];
});

const filterItems = computed(() => preparedItems.value);

const { data: experiencesData } = useAsyncData("getExperiences", () =>
  dictionaryStore.getExperiences(),
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
