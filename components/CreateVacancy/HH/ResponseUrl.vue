<template>
    <div class="input-row">
        <div class="left">
            <label for="remote-work">
                URL отклика для прямых вакансий
            </label>
        </div>

        <div class="right">
            <input class="form-control" type="text" v-model="value" />
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
    emit('set', 'response_url', newValues);
});

</script>

<style scoped>

</style>