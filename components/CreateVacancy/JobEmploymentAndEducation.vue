<template>
  <div class="input-row">
    <label>Тип занятости</label>
    <div class="checkboxes-row input-row--checkboxes">
      <div class="check-block" v-for="item in workTypesOptions">
        <div class="checkbox">
          <input v-model="work_types" type="radio" :id="item.name" :value="item.id" name="work_type">
          <div class="checkbox-mask"></div>
        </div>
        <label :for="item.name">{{ item.name }}</label>
      </div>
    </div>
  </div>
  <div class="input-row">
    <label for="remote-work">Образование</label>
    <div class="input-wrapper">
        <CustomSelect :options="educationOptions" v-model="education"></CustomSelect>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getWorkTypes, getDriverLicenses, getEducations} = vacancyStore;
const {work_types: workTypesOptions, educations} = storeToRefs(vacancyStore);
await getWorkTypes();
await getDriverLicenses();
await getEducations();

const educationOptions = computed(() => educations.value.map(item => ({value: item.id, name: item.name})));
const education = ref(54);
const work_types = ref([]);

watch(education, (newValues) => {
    emit('set', 'education', newValues);
})
watch(work_types, (newValues) => {
    emit('set', 'employment', newValues);
})
</script>

<style scoped>

</style>