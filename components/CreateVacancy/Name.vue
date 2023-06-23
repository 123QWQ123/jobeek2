<template>
  <div class="input-row">
    <label for="name">Название</label>
    <div class="input-wrapper">
      <input type="text" id="name" v-model="keywords" />
      <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">
          Введите название вакансий
      </div>
    </div>

  </div>
</template>

<script setup>
import {useVacancyStore} from "../../store/vacancy";
const emit = defineEmits(['set']);
const props = defineProps(['is_valid']);
const isValid = computed(() => props.is_valid);

const keywords = ref();
watch(keywords, (newValue) => {
    emit('set', 'name', newValue);
})


const vacancyStore = useVacancyStore();
const {getIndustries, industries} = vacancyStore;

onMounted(async() => {
  await getIndustries();
});

</script>

<style>


</style>