<template>
    <div class="form-check d-inline-flex">
        <input class="form-check-input" type="checkbox" id="accept_kids" v-model="value">
        <label for="accept_kids">
            Указание, что вакансия доступна для соискателей старше 14 лет
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
    emit('set', 'accept_kids', newValues);
});
</script>

<style scoped>

</style>