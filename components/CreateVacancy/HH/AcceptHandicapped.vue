<template>
  <div class="check-block">
    <div class="checkbox">
      <input type="checkbox" id="accept_handicapped" v-model="value">
      <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
    </div>
    <label for="accept_handicapped">Соискатель с инвалидностью.
      Указание, что вакансия доступна для соискателей с инвалидностью</label>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);
const props = defineProps({
    modelValue: {
        required: true,
        default: true,
    }
})
const value = ref(props.modelValue);
watch(value, (newValues) => {
    emit('set', 'accept_handicapped', newValues);
})
</script>

<style scoped>

</style>