<template>
  <div v-click-outside="close" onfocusout="close" class="nice-select n-select d-select"  :style="props.style" :class="{open: isOpen}" tabindex="0" @click.prevent="onClick">
    <span class="current">{{ label }}</span>
    <ul class="list" :style="listStyles">
        <li v-for="item in options" :key="item.value" :data-value="item.value" class="option">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
}
</script>

<script setup>
  const props = defineProps(['options', 'modelValue', 'label', 'vacancy', 'listStyles', 'class']);
  const emit = defineEmits(['change', 'update:modelValue']);
  const isOpen = ref(false);
  const options = computed(() => props.options);
  // const classes = computed(() => {
  //     let classes = props.class;
  //     if (isOpen.value){
  //         classes.open = isOpen.value;
  //     }
  //
  //     return classes;
  // });
  const selectedValue = computed(() => props.modelValue);
  const selectedOption = ref({});
  const selectedItem = props.options.find(
      (item) => String(selectedValue.value) === String(item.value)
  );
  if (selectedItem){
    selectedOption.value = selectedItem;
  }

  watch(
      selectedValue,
      (newValue) => {
    const selectedItem = props.options.find(
        (item) => String(newValue) === String(item.value)
    );
    if (selectedItem){
      selectedOption.value = selectedItem;
    }
  })

  const label = computed(() => selectedOption.value?.name);
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
</script>

<style scoped>
.current{
  color: #0A2540;
}
.d-select{
  /*background: none;*/
  padding-right: 3.125rem;
}
</style>