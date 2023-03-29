

<script>
export default {
  name: "SelectWithSearch",
  emits: ['change', 'update:modelValue', 'input'],
  props: {
    options: {
      required: true,
    },
    label: {
      required: false,
    },
    modelValue: {
      required: true
    }
  },
  setup(props, {emit}){
    const isOpen = ref(false);
    const options = ref(props.options);
    watch(props, () => options.value = props.options);
    const localOptions = computed(() => options.value);
    const selectedValue = computed(() => props.modelValue);
    const selectedItem = computed(() =>{
      return localOptions.value.find(
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
        // emit("update:modelValue", e.target.dataset.value);
      }
    }

    const searchInput = ref("");

    const onChangeHandler = (e) => {
      searchInput.value = e.target.textContent;
      // emit("input", searchInput.value);
      emit("update:modelValue", searchInput.value);
      const typedName = e.target.textContent.toLowerCase();
      if (typedName === ""){
        options.value = props.options;
      }else{
        options.value = props.options.filter(
            (item) => item.name.toLowerCase().includes(typedName)
        );
      }
    }

    function close(){
      isOpen.value = false;
    }
    return {onClick, close, onChangeHandler, isOpen, options, selectedValue, label, selectedItem, searchInput};
  }
}
</script>

<template>
  <div v-click-outside="close" onfocusout="close" class="nice-select n-select d-select" :class="{'open' : isOpen}" tabindex="0" @click.prevent="onClick">
    <span class="current" contenteditable="true" @keyup="onChangeHandler">{{ selectedItem?.name }}</span>
    <ul class="list">
      <li v-for="item in options" :key="item.value" :data-value="item.value" class="option">{{ item.name }}</li>
    </ul>
  </div>

</template>

<style scoped>
.current{
  color: #0A2540;
  width: 100%;
}
</style>

