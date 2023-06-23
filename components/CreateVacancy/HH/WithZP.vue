<template>

    <div class="form-check d-inline-flex">
        <input class="form-check-input" type="checkbox" id="with_zp" v-model="value">
        <label for="with_zp">
            Вашу вакансию увидят больше людей. Мы разместим ее дополнительно на сервисе Зарплата.ру
        </label>
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