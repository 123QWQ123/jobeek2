<template>
    <div class="input-row">
        <div class="left">
            <label for="remote-work">
                Вашу вакансию увидят больше людей. Мы разместим ее дополнительно на сервисе Зарплата.ру
            </label>
        </div>

        <div class="right ">
            <input class="checkbox-mask" type="checkbox" v-model="value" />
        </div>

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