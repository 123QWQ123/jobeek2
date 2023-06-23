<template>
    <div class="d-flex flex-row justify-content-between align-content-center gap-2">
        <label class="radio-label form-control" v-for="item in options" :class="{'active': current === item.value}">
            <input class="hidden" type="radio" :value="item.value"  v-model="current" />
            {{ item.name }}
        </label>
    </div>
</template>

<script>
export default {
  name: "CustomRadio",
}
</script>

<script setup>
const props = defineProps(['options', 'modelValue', 'listStyles']);
const emit = defineEmits(['change', 'update:modelValue']);
const options = computed(() => props.options);
const current = ref(props.modelValue);
watch(
    current,
    (newValue) => {
      emit('update:modelValue', newValue);
})

</script>

<style scoped>
.radio-label{
    font-weight: normal;
    padding: 5px;
    text-align: center;
    cursor: pointer;
    color: #0A2540;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 20px rgba(28, 27, 98, 0.04);
}
.radio-label.active{
    background-color: #3e85f6;
    color: #F5F8FA;
}
.radio-label input.hidden{
    display: none;
}
</style>