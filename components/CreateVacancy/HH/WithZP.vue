<template>
  <div class="check-block">
    <div class="checkbox">
      <input type="checkbox" id="with_zp" v-model="value">
      <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
    </div>
    <label for="with_zp">Вашу вакансию увидят больше людей. Мы разместим ее дополнительно на сервисе Зарплата.ру</label>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        required: true,
        default: false,
    }
})
const value = ref(props.modelValue);
watch(value, (newValues) => {
    emit('update:modelValue', newValues);
});

</script>

<style scoped>

</style>