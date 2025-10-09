<template>
  <div class="input-row input-row--checkboxes">
    <label>Наличие водительских прав</label>
    <div class="checkboxes-row">
      <div class="check-block" v-for="item in driver_licenses">
        <div class="checkbox" @click="toggle(item.id)">
          <input type="checkbox" :id="item.id" />
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
import { useDictionaryStore } from "~/store/dictionary";

const emit = defineEmits(["set"]);
import { storeToRefs } from "pinia";
const dictionaryStore = useDictionaryStore();
const { getDriverLicenses } = dictionaryStore;
const { driver_licenses } = storeToRefs(dictionaryStore);
await getDriverLicenses();

const selected_licenses = ref([]);

const toggle = (id) => {
  if (!selected_licenses.value.includes(id)) {
    selected_licenses.value.push(id);
  } else {
    const deleteIndex = selected_licenses.value.indexOf(id);
    selected_licenses.value.splice(deleteIndex, 1);
  }
  emit("set", "driver_license_types", selected_licenses.value);
};
</script>

<style scoped></style>
