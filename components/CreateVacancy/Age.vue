<template>
  <div class="input-row">
    <label for="remote-work">Возрасть</label>
    <div class="input-wrapper">
        <div class="c2">
            <input type="number" v-model="age.from" placeholder="От">
            <div class="text-danger d-block" v-if="errors.age_from">
              {{errors.age_from}}
            </div>
            <input type="number" v-model="age.to" placeholder="До">
            <div class="text-danger d-block" v-if="errors.age_to">
              {{errors.age_to}}
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    required: true,
    default: {
      age_from: null,
      age_to: null,
    }
  },
  errors: {
    required: false,
    default: {}
  }
})
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();

const age = ref({
  age_from: null,
  age_to: null,
});

watch(age, (newValues) => {
  emit('update:modelValue', newValues);
})
</script>

<style scoped>

</style>