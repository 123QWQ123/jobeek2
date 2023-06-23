<template>
    <div class="form-check d-inline-flex">
        <input class="form-check-input" type="checkbox" id="accept_temporary" v-model="value">

        <label for="accept_temporary">
            Временное трудоустройство.
            указание, что вакансия доступна с временным трудоустройством
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
    emit('set', 'accept_temporary', newValues);
});
</script>

<style scoped>

</style>