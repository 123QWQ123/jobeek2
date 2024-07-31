<template>
  <div class="input-row" @focusin="errors.social_networks = {}">
    <label>Социалные сети</label>

    <div class="input-wrapper mt-2">
      <div class="social_network_form">
        <CreateResumeSocialNetworksItem
          class="mb-2"
          v-for="(item, index) in selectedSocialNetworks"
          :item="item"
          :key="item.key"
          :errors="item.errors"
          @update="updateItem"
          @delete="deleteItem"
        />

        <button
          type="button"
          class="btn btn-primary"
          v-if="selectedSocialNetworks.length === 0"
          @click="reset"
        >
          Добавить
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-if="selectedSocialNetworks.length !== 0"
          @click="create"
        >
          Добавить еще
        </button>
      </div>
    </div>
    <div class="text-danger d-block" v-if="errors.social_networks?.message">
      {{ errors.social_networks?.message }}
    </div>
  </div>
</template>

<script setup>
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

const resetObject = {
  key: uuidv4(),
  url: null,
  errors: {},
};
const selectedSocialNetworks = ref(props.modelValue ?? []);
watch(
  () => selectedSocialNetworks.value,
  (newSelectedItems) => {
    if (newSelectedItems.length) {
      emit("update:modelValue", newSelectedItems);
    }
  },
);

const errors = ref(props.errors ?? {});
// watch(
//   () => props.modelValue,
//   (newData) => {
//     selectedSocialNetworks.value = newData ?? [];
//   }
// );

watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  },
);
watch(
  () => errors.value,
  (newErrors) => {
    const newItems = selectedSocialNetworks.value;
    if (newErrors.hasOwnProperty("social_networks")) {
      selectedSocialNetworks.value.map((item, index) => {
        Object.values(newErrors.social_networks).map((error, errorIndex) => {
          if (errorIndex === index) {
            if (!newItems[index]) {
              newItems[index] = {};
            }
            if (!newItems[index].errors) {
              newItems[index].errors = {};
            }
            newItems[index].errors.message = error;
          }
        });
      });
      selectedSocialNetworks.value = newItems;
    }
  },
);
const source = ref("foo");

const reset = () => {
  resetObject.key = uuidv4();
  selectedSocialNetworks.value = [{ ...resetObject }];
};
const create = () => {
  const key = uuidv4();
  const newItems = [...selectedSocialNetworks.value];
  if (newItems.length >= 10) {
    errors.value.social_networks = { message: "Вы не можете большн 10" };
    return;
  }
  resetObject.key = key;
  newItems.push({ ...resetObject });
  selectedSocialNetworks.value = newItems;
};

const updateItem = (key, newItem) => {
  const newItems = selectedSocialNetworks.value.map((item) => {
    if (item.key === key) {
      return newItem;
    }
    return item;
  });
  selectedSocialNetworks.value = newItems;
};
const deleteItem = (deleteItem) => {
  const newItems = selectedSocialNetworks.value.filter(
    (item) => item.key !== deleteItem,
  );
  selectedSocialNetworks.value = newItems;
};

onMounted(() => {
  // if (!props.modelValue.length) {
  //   reset();
  // }
});
</script>

<style scoped>
.education_item {
  margin-bottom: 2.5rem;
}
</style>
