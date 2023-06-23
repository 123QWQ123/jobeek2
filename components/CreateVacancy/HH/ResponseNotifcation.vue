<template>
    <div class="form-check d-inline-flex">
        <input class="form-check-input" type="checkbox" id="response_notifications" v-model="value">
        <label for="response_notifications">
            Уведомлять ли менеджера о новых откликах
        </label>
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