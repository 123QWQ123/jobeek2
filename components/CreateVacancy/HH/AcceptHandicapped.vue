<template>
    <div class="input-row">
        <div class="left">
            <label for="remote-work">
                Соискатель с инвалидностью.
                Указание, что вакансия доступна для соискателей с инвалидностью
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
    emit('set', 'accept_handicapped', newValues);
})
</script>

<style scoped>

</style>