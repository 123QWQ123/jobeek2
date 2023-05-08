<template>
  <div class="input-row">
    <label>Тип занятости</label>
    <div class="checkboxes-row input-row--checkboxes">
      <div class="check-block" v-for="item in workTypesOptions">
        <div class="checkbox">
          <input v-model="employment" type="radio" :id="item.name" :value="item.id" name="work_type">
          <div class="checkbox-mask"></div>
        </div>
        <label :for="item.name">{{ item.name }}</label>
      </div>
    </div>

    <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">
        Выберите
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);
const props = defineProps(['is_valid']);
const isValid = computed(() => props.is_valid);
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getWorkTypes} = vacancyStore;
const {work_types: workTypesOptions,} = storeToRefs(vacancyStore);
await getWorkTypes();

const employment = ref(null);

watch(employment, (newValues) => {
    emit('set', 'employment', newValues);
})
</script>

<style scoped>

</style>