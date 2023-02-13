<template>
  <div v-click-outside="close" onfocusout="close" class="nice-select n-select d-select" :class="{'open' : isOpen}" tabindex="0" @click.prevent="onClick">
    <span class="current">{{ selectedItem?.name }}</span>
    <ul class="list">
        <li v-for="item in options" :key="item.value" :data-value="item.value" class="option">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  emits: ['change', 'update:modelValue'],
  props: ['options', 'modelValue', 'label', 'vacancy'],
  setup(props, {emit}){
    const isOpen = ref(false);
    const options = computed(() => props.options);
    const selectedValue = computed(() => props.modelValue);
    const selectedItem = computed(() =>{
      return props.options.find(
          item => String(props.modelValue) === String(item.value)
      )
    });
    const label = computed(() => selectedItem?.val?.name);
    function onClick(e){
      if (e.target.classList.contains('current') || e.target.classList.contains('nice-select')){
        isOpen.value = !isOpen.value;
      }
      if (e.target.classList.contains('option')){
        isOpen.value = false;
        emit("change", e.target.dataset.value);
        emit("update:modelValue", e.target.dataset.value);
      }
    }
    function close(){
      isOpen.value = false;
    }
    return {onClick,close, isOpen, options, selectedValue, label, selectedItem}
  }
}
</script>

<style scoped>
.current{
  color: #0A2540;
}
</style>