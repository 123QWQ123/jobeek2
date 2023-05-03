<template>
    <div class="input-row">
        <div class="left">
            <label for="remote-work">
                Неполное резюме.
                разрешен ли отклик на вакансию неполным резюме
            </label>
        </div>

        <div class="right">
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
    emit('set', 'accept_incomplete_resumes', newValues);
})
</script>

<style scoped>

</style>