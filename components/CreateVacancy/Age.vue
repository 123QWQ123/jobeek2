<template>
  <div class="input-row" v-if="isHidden">
    <label for="remote-work">Возрасть</label>
    <div class="input-wrapper">
        <div class="c2">
            <input type="number" v-model="from" placeholder="От">
            <div class="text-danger d-block" v-if="errors.age_from">
              {{errors.age_from}}
            </div>
            <input type="number" v-model="to" placeholder="До">
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
      from: null,
      to: null,
    }
  },
  errors: {
    required: false,
    default: {}
  },
  providers: {
    required: true,
    default: {
      hh: false,
      superjob: false,
    }
  },
})

import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const isHidden = computed(() => {
  return props.providers.superjob
});

const from = ref(null);
const to = ref(null);

watch(() => from.value, (newValue) => {
  emit('update:modelValue', {from: newValue, to: to.value});
})
watch(() => to.value, (newValue) => {
  emit('update:modelValue', {from: from.value, to: newValue});
});

watch(props.modelValue, (newValue) => {
  from.value = newValue.from;
  to.value = newValue.to;
});

</script>

<style scoped>

</style>