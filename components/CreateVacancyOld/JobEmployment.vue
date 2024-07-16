<template>
  <div class="input-row">
    <label>Тип занятости</label>
    <div class="checkboxes-row input-row--checkboxes job_employment_types">
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
import {useDictionaryStore} from "~/store/dictionary";
import {useVacancyStore} from "~/store/vacancy";

const emit = defineEmits(['set']);
const props = defineProps(['is_valid']);
const isValid = computed(() => props.is_valid);
const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();
const {getWorkTypes} = useDictionaryStore();
const workTypesOptions = computed(() => dictionaryStore.work_types);
await getWorkTypes();

const employment = ref(null);

watch(employment, (newValues) => {
    emit('set', 'employment', newValues);
})
</script>

<style scoped>
@media (min-width: 960px) {
  .checkboxes-row.job_employment_types{
    grid-template-columns: 1fr 1fr;
  }
}
</style>