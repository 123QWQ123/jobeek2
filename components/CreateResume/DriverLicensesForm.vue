<template>
  <div class="form_content">
    <div class="checkboxes-row">
      <div class="check-block" v-for="item in driving_license_item_options">
        <div class="checkbox" @click="toggle(item.id)">
          <input type="checkbox" :id="item.id" :checked="check(item.id)" />
          <div class="checkbox-mask">
            <img src="~/assets/img/svg/check.svg" alt="#" />
          </div>
        </div>
        <label :for="item.id">{{ item.name }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFieldArray } from "vee-validate";
import { useDictionaryStore } from "~/store/dictionary";

const educationElement = ref(false);
const route = useRoute();
const dictionaryStore = useDictionaryStore();

const props = defineProps(["name", "parent_type_id", "providers"]);

const { fields, replace } = useFieldArray(() => props.name);

watch(
  () => fields.value,
  (newIds) => {
    driving_license_item_options.value = dictionaryStore.driver_licenses;
  },
);

const driver_licenses = ref([]);

const driving_license_item_options = ref([]);

watch(
  () => dictionaryStore.driver_licenses,
  (newValues) => {
    driving_license_item_options.value = newValues;
  },
);

// const driver_licenses = ref(selectedItems.value ?? []);
const { getDriverLicenses } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getDriverLicenses();
  });
});

const check = (id) => {
  const IDs = [...fields.value].map((item) => item.value);
  return IDs.includes(id);
};
const toggle = (id) => {
  let IDs = [...fields.value].map((item) => item.value);
  if (!IDs.includes(id)) {
    IDs.push(id);
  } else {
    const deleteIndex = IDs.indexOf(id);
    IDs.splice(deleteIndex, 1);
  }
  driver_licenses.value = IDs;
};

const isShown = ref(false);
const isChanged = ref(false);

watch(
  () => driver_licenses.value,
  (newData) => {
    replace(newData);
  },
);
</script>

<style scoped>
.checkboxes-row {
  width: -webkit-fill-available;
}
</style>
