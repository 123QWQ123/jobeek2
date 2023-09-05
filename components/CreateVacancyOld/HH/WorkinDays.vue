<template>
    <div class="check-block">
      <div class="checkbox">
        <input type="checkbox" id="working_in_days" v-model="value">
        <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
      </div>
      <label for="working_in_days">Работа только по сб и вс</label>
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