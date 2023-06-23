<template>
    <div class="form-check d-inline-flex">
        <input class="form-check-input" type="checkbox" id="accept_incomplete_resumes" v-model="value">
        <label for="accept_incomplete_resumes">
            Неполное резюме.
            разрешен ли отклик на вакансию неполным резюме
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
    emit('set', 'accept_incomplete_resumes', newValues);
})
</script>

<style scoped>

</style>