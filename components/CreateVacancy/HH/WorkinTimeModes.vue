<template>
<!--  <div class="form-check ">-->
<!--    <input class="form-check-input" type="checkbox" id="working_in_time_modes" v-model="value">-->
<!--    <label for="working_in_time_modes">-->

<!--    </label>-->
<!--  </div>-->

  <div class="check-block">
    <div class="checkbox">
      <input type="checkbox" id="working_in_time_modes" v-model="value">
      <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
    </div>
    <label for="working_in_time_modes">Можно начинать работать после 16:00</label>
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
        emit('update:modelValue', 25);
    }else{
        emit('update:modelValue', null);
    }
});

</script>

<style scoped>

</style>