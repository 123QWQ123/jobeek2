<template>
  <div class="w-box">
    <div class="w-box-head">
      <h3 class="title">Водительские права</h3>
    </div>
    <div class="w-box-body">
      <div class="form_content" v-if="isShown">
          <div class="checkboxes-row" >
              <div class="check-block" v-for="item in driver_licenses">
                  <div class="checkbox" @click="toggle(item.id)">
                      <input type="checkbox" :id="item.id">
                      <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
                  </div>
                  <label :for="item.id">{{ item.name }}</label>
              </div>
          </div>
      </div>
      <div class="empty-area" v-else>
          <span>Здесь вы можете выбрать права</span>
          <button class="add" type="button" @click="isShown = !isShown">Добавить </button>
      </div>

    </div>
  </div>

</template>

<script setup>

import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['set']);
import {storeToRefs} from "pinia";
const dictionaryStore = useDictionaryStore();
const {getDriverLicenses} = dictionaryStore;
const {driver_licenses} = storeToRefs(dictionaryStore);
await getDriverLicenses();

const isShown = ref(false);
const selected_licenses = ref([]);


const toggle = (id) => {
    if (!selected_licenses.value.includes(id)){
        selected_licenses.value.push(id);
    }else{
        const deleteIndex = selected_licenses.value.indexOf(id);
        selected_licenses.value.splice(deleteIndex, 1);
    }
    emit('set', 'driver_license_types', selected_licenses.value);
}


</script>

<style scoped>
.checkboxes-row{
    width: -webkit-fill-available;
}
</style>