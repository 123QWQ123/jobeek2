<template>
  <div class="check-block">
    <div class="checkbox">
      <input type="checkbox" id="response_notification" v-model="value">
      <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
    </div>
    <label for="response_notification">Уведомлять ли менеджера о новых откликах</label>
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
    emit('set', 'response_notifications', newValues);
});

</script>

<style scoped>

</style>