<template>
    <div class="form-check d-inline-flex">
        <input class="form-check-input" type="checkbox" id="allow_messages" v-model="value">
        <label for="allow_messages">
            Разрешение сообщений.
            возможность переписки с кандидатами по данной вакансии
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
    emit('set', 'allow_messages', newValues);
});

</script>

<style scoped>

</style>