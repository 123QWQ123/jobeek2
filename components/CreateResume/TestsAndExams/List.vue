<template>
  <div class="education_item">
    <CreateResumeTestsAndExamsItem
      v-if="selectedExams.length"
      class="mb-2"
      v-for="(item, index) in selectedExams"
      :item="item"
      :key="item.id"
      :id="item.id"
      :profession="item.profession"
      :organization="item.organization"
      :name="item.name"
      :year="item.year"
      :errors="item.errors"
      @update="updateItem"
      @delete="deleteItem"
    />

    <button
      type="button"
      class="btn btn-primary"
      v-if="selectedExams.length === 0"
      @click="reset"
    >
      Добавить
    </button>
    <button
      type="button"
      class="btn btn-primary"
      v-if="selectedExams.length !== 0"
      @click="create"
    >
      Добавить еще
    </button>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { v4 as uuidv4 } from "uuid";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue", "errors"]);
const dictionaryStore = useDictionaryStore();

const currentItem = ref(0);

const resetObject = {
  id: 0,
  organization: null,
  year: null,
  profession: null,
  name: null,
  errors: {},
};

const selectedExams = ref(props.modelValue ?? []);
watch(
  () => selectedExams.value,
  (newData) => {
    emit("update:modelValue", newData);
  }
);
const errors = ref(props.errors ?? []);
watch(
  () => props.errors,
  (newData) => {
    const newItems = selectedExams.value;
    if (newData.completed_test_or_exams) {
      selectedExams.value.map((item, index) => {
        newData.completed_test_or_exams.map((error, errorIndex) => {
          if (errorIndex === index) {
            if (!newItems[index]) {
              newItems[index] = {};
            }
            if (!newItems[index].errors) {
              newItems[index].errors = {};
            }
            Object.keys(error).map((errorKey) => {
              newItems[index].errors[errorKey] = error[errorKey];
            });
          }
        });
      });
    }
    errors.value = newItems;
  }
);
const reset = () => {
  resetObject.id = uuidv4();
  selectedExams.value = [{ ...resetObject }];
};
const create = () => {
  const newItems = selectedExams.value;
  resetObject.id = uuidv4();
  newItems.push(resetObject);
  currentItem.value = newItems.length - 1;
  selectedExams.value = newItems;
};

const updateItem = (id, newItem) => {
  const newItems = selectedExams.value.map((item) => {
    if (item.id === id) {
      return newItem;
    }
    return item;
  });
  selectedExams.value = newItems;
};
const deleteItem = (deleteItem) => {
  const newItems = selectedExams.value.filter((item) => item.id !== deleteItem);
  selectedExams.value = newItems;
};

onMounted(() => {
  if (!props.modelValue.length) {
    reset();
  }
});
</script>

<style scoped>
.education_item {
  margin-bottom: 2.5rem;
}
</style>
