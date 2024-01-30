<template>
  <div class="education_item">
    <CreateResumeWorkExperienceItem
      v-if="selectedItems.length"
      class="mb-2"
      v-for="(item, index) in selectedItems"
      :item="item"
      :key="item.id"
      :id="item.id"
      :profession="item.profession"
      :responsibilities="item.responsibilities"
      :company="item.company"
      :company_scope="item.company_scope"
      :company_url="item.company_url"
      :achievements="item.achievements"
      :city_id="item.city_id"
      :city_name="item.city_name"
      :industries="item.industries"
      :start_month="item.start_month"
      :start_year="item.start_year"
      :end_month="item.end_month"
      :end_year="item.end_year"
      :until_today="item.until_today"
      :errors="item.errors"
      @update="updateItem"
      @delete="deleteItem"
    />

    <button
      type="button"
      class="btn btn-primary"
      v-if="selectedItems.length === 0"
      @click="reset"
    >
      Добавить
    </button>
    <button
      type="button"
      class="btn btn-primary"
      v-if="selectedItems.length !== 0"
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
  profession: null,
  company: null,
  company_url: null,
  industry: null,
  city_id: null,
  city_name: null,
  start_month: null,
  end_month: null,
  start_year: null,
  end_year: null,
  responsibilities: null,
  achievements: null,
  company_scope: null,
  errors: {},
};
const selectedItems = ref(props.modelValue ?? []);
const errors = ref(props.errors ?? []);
watch(
  () => props.errors,
  (newData) => {
    const newItems = selectedItems.value;
    selectedItems.value.map((item, index) => {
      if (newData.experience) {
        newData.experience?.map((error, errorIndex) => {
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
      }
    });
    errors.value = newItems;
  }
);
const reset = () => {
  resetObject.id = uuidv4();
  selectedItems.value = [{ ...resetObject }];
};
const create = () => {
  const newItems = selectedItems.value;
  resetObject.id = uuidv4();
  newItems.push(resetObject);
  currentItem.value = newItems.length - 1;
  selectedItems.value = newItems;
};

const updateItem = (id, newItem) => {
  const newItems = selectedItems.value.map((item) => {
    if (item.id === id) {
      return newItem;
    }
    return item;
  });
  selectedItems.value = newItems;
};
const deleteItem = (deleteItem) => {
  const newItems = selectedItems.value.filter((item) => item.id !== deleteItem);
  selectedItems.value = newItems;
};

watch(
  () => selectedItems.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  }
);

onMounted(() => {
  if (props.modelValue.length === 0) {
    reset();
  }
});
</script>

<style scoped>
.education_item {
  margin-bottom: 2.5rem;
}
</style>
