<template>
    <div class="input-row">
        <div class="left">
            <label for="remote-work">
                Работа только по сб и вс
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
    if (newValues === true){
        emit('update:modelValue', 26);
    }else{
        emit('update:modelValue', null);
    }
});

</script>

<style scoped>

</style>