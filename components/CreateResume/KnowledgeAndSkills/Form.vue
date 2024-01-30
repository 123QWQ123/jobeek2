<template>
  <div class="w-100">
    <div class="text-danger d-block p-4" v-if="props.message">
      {{ props.message }}
    </div>

    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div
          class="selection selected-options"
          v-if="computedSelectedSkills.length > 0"
        >
          <ul class="selected-options" id="select2--container">
            <li
              class="multi-select_selected-item"
              v-for="(item, index) in computedSelectedSkills"
              @click="setCurrent(index)"
            >
              <button
                type="button"
                class="select2-selection__choice__remove"
                @click="deleteItem(item)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <span class="select2-selection__choice__display">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <LazyCreateResumeKnowledgeAndSkillsInputWrapper
        :is-new="isNew"
        :id="currentSkillId"
        :skill="currentSkill"
        @add="addItem"
        @update="updateItem"
        @delete="deleteItem"
      />
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";

// const props = defineProps(["", "errors"]);
const props = defineProps({
  modelValue: {
    required: true,
    default: [null],
  },
  errors: {
    required: true,
    default: [],
  },
});
const emit = defineEmits(["update:modelValue"]);
const dictionaryStore = useDictionaryStore();

const selectedSkills = ref([...props.modelValue]);
// watch(
//   () => props.modelValue,
//   () => (selectedSkills.value = props.modelValue)
// );

const currentSkillId = ref(null);
const currentSkill = ref(null);

const isNew = computed(() => {
  if (currentSkill.value) {
    return false;
  }
  return true;
});
const computedSelectedSkills = computed(() => {
  return selectedSkills.value.filter((item) => item);
});
const setCurrent = (index) => {
  currentSkillId.value = index;
  currentSkill.value = selectedSkills.value[index];
};
const reset = () => {
  selectedSkills.value = [null];
};
const addItem = (newItem) => {
  const newItems = selectedSkills.value.filter((item) => item);
  newItems.push(newItem);
  newItems.push(null);
  selectedSkills.value = newItems;
};

const updateItem = (id, newItem) => {
  // const newItems = selectedLanguages.value;
  const newItems = selectedSkills.value.map((item, index) => {
    if (index === id) {
      return newItem;
    }
    return item;
  });
  selectedSkills.value = newItems;
  currentSkillId.value = null;
  currentSkill.value = null;
};
const deleteItem = (deleteItem) => {
  const newItems = selectedSkills.value.filter((item) => item !== deleteItem);
  selectedSkills.value = newItems;
};

watch(selectedSkills, (newValues) => {
  emit(
    "update:modelValue",
    newValues.filter((item) => item)
  );
});
</script>

<style scoped>
.selection {
  border-radius: 4px;
  left: 0;
}
.selected-options {
  margin-top: 0.5rem;
  flex-wrap: wrap;
  display: flex;
  padding: 0 0.1rem 0.2rem;
  gap: 0.5rem;
}

.multi-select_selected-item {
  border: 1px solid;
  border-radius: 4px;
  padding: 2px;
}
</style>
