<template>
  <div class="filter-box" :class="{'open': filterClass}">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Специализации</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#"></div>
    <div class="filter-box-body">
      <div class="check-block-list">

        <div v-for="item in firstItems" :key="item.title" class="check-block" @click="toggleSelect(item.id)">
          <div class="checkbox">
            <input type="checkbox" :id="item.id"   :checked="item.is_checked" >
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label :for="item.id">{{ item.title }}</label>
          </div>
        </div>

      </div>

      <VacanciesFiltersSpecializationModal :title="'Специализации'" v-if="isModalOpen" :is-open="isModalOpen" @toggle="toggleModal" v-model="selectedSpecs" :items="specializations" />

      <button class="more-filters" @click="toggleModal" >
        Выбрать
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['onFormChange']);
const {selectedIds} = defineProps(['selected-ids']);
import {useVacancyStore} from "../../../store/vacancy";
import {storeToRefs} from "pinia";

const vacancyStore = useVacancyStore();

const {getSpecializations} = vacancyStore;
const {specializations} = storeToRefs(vacancyStore)

const isModalOpen = ref(false);
const selectedSpecs = ref(selectedIds);
const firstItems = ref([]);

watch(selectedSpecs, (newValues) => {
  emit('onFormChange', 'professional_roles', newValues);
})
console.log(selectedSpecs);

const toggleModal = () => isModalOpen.value = !isModalOpen.value;
const toggleSelect = (id) => {
  console.log(id);

  const selectedItemIds = [...selectedSpecs.value];
  const dynItems = [...firstItems.value].map(item => {
    if (item.id === id){
      item.is_checked = !item.is_checked;
      console.log(item.is_checked, selectedItemIds)
      if (item.is_checked && !selectedItemIds.includes(id)){
        selectedItemIds.push(item.id);
      }else{
        const index = selectedItemIds.indexOf(item.id);
        console.log(index);
        if (index !== -1){
          selectedItemIds.splice(index, 1);
        }
      }
    }
    return item;
  });

  selectedSpecs.value = selectedItemIds;
  firstItems.value = dynItems;

};

const prepare = (newItems, oldItems) => {
  if (!newItems || newItems.length  < 1){
    return;
  }
  for (let i = 0; i < 5; i++){
    let item = newItems[i];
    let is_checked = false;
    if (selectedIds.includes(item.id)){
      is_checked = true;
    }
    firstItems.value.push({
      id: item.id,
      title: item.title,
      is_checked
    });
  }
}
watch(
    () => vacancyStore.specializations,
    prepare
);



const filterClass = ref(true);

onMounted(() => {
  if (specializations.value.length === 0)
    getSpecializations();
  else prepare(specializations.value);
});


</script>

<style>
.check-block label{
  white-space: pre-wrap;
}

.check-block{
}
</style>