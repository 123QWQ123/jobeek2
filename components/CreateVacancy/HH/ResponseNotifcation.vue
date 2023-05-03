<template>
    <div class="input-row">
        <div class="left">
            <label for="remote-work">
                Уведомлять ли менеджера о новых откликах
            </label>
        </div>

        <div class="right ">
            <input class="checkbox-mask" type="checkbox" v-model="value" />
        </div>

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