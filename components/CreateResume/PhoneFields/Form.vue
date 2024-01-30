<template>
  <div class="input-row" @focusin="errors.phones = {}">
    <label>Телефоны</label>

    <div class="input-wrapper mt-2">
      <div class="phone_network_form">
        <CreateResumePhoneFieldsItem
          class="mb-2"
          v-for="(item, index) in selectedPhones"
          :item="item"
          :key="item.key"
          :errors="item.errors"
          @update="updateItem"
          @delete="deleteItem"
        />

        <button
          type="button"
          class="btn btn-primary"
          v-if="selectedPhones.length === 0"
          @click="reset"
        >
          Добавить
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-if="selectedPhones.length !== 0"
          @click="create"
        >
          Добавить еще
        </button>
      </div>
    </div>

    <div class="text-danger d-block" v-if="errors.phones?.message">
      {{ errors.phones?.message }}
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { v4 as uuidv4 } from "uuid";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    required: true,
  },
  errors: {
    required: true,
    default: null,
  },
});
const dictionaryStore = useDictionaryStore();
const { getPreferredContactTypes } = dictionaryStore;
await getPreferredContactTypes();

const resetObject = {
  key: uuidv4(),
  type_id: null,
  phone: null,
  comment: null,
  is_preferred: false,
  start_available_time_phone: null,
  end_available_time_phone: null,
  errors: {},
};
const selectedPhones = ref([...props.modelValue] ?? []);
watch(
  () => selectedPhones.value,
  (newSelectedItems) => {
    emit("update:modelValue", newSelectedItems);
  }
);

watch(
  () => props.modelValue,
  (newSelectedItems) => {
    selectedPhones.value = newSelectedItems;
  }
);

const errors = ref(props.errors ?? {});
// watch(
//   () => props.modelValue,
//   (newData) => {
//     console.log(newData);
//     selectedPhones.value = [...newData] ?? [];
//   }
// );
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  }
);
watch(
  () => errors.value,
  (newErrors) => {
    const newItems = selectedPhones.value;
    if (newErrors.hasOwnProperty("phones")) {
      selectedPhones.value.map((item, index) => {
        newErrors.phones.map((error, errorIndex) => {
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
      selectedPhones.value = newItems;
      // errors.value = newItems;
    }
  }
);
const reset = () => {
  resetObject.key = uuidv4();
  selectedPhones.value = [{ ...resetObject }];
};
const create = () => {
  const key = uuidv4();
  const newItems = [...selectedPhones.value];
  if (newItems.length >= 10) {
    errors.value.social_networks = { message: "Вы не можете большн 10" };
    return;
  }
  resetObject.key = key;
  newItems.push({ ...resetObject });
  selectedPhones.value = newItems;
};

const updateItem = (key, newItem) => {
  const newItems = selectedPhones.value.map((item) => {
    if (item.key === key) {
      return newItem;
    }
    return item;
  });
  selectedPhones.value = newItems;
};
const deleteItem = (deleteItem) => {
  const newItems = selectedPhones.value.filter(
    (item) => item.key !== deleteItem
  );
  selectedPhones.value = newItems;
};

onMounted(() => {
  // if (props.modelValue.length < 1) {
  //   reset();
  // }
});
</script>

<style scoped></style>
