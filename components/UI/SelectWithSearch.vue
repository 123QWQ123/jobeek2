<script>
export default {
  name: "SelectWithSearch",
}
</script>

<script setup>
const emit = defineEmits(['change', 'update:modelValue', 'input']);
const props = defineProps({
  options: {
    required: true,
  },
  label: {
    required: false,
  },
  listStyles: {
    required: false,
  },
  listItemStyles: {
    required: false,
  },
  modelValue: {
    required: true
  }
})
const isOpen = ref(false);
const options = ref(props.options);
watch(props, (newProps) => {
  options.value = newProps.options;
});


const selectedOption = ref({});
const selectedValue = computed(() => props.modelValue);
const selectedItem = computed(() =>{
  if (options.value){
    let selectedItem = options.value.find(
        item => String(props.modelValue) === String(item.value)
    )

    if (selectedItem){
      return selectedItem;
    }

    return options.value[0];
  }
});


watch(
    selectedValue,
    (newValue) => {
      let selectedOptionItem;
      if (selectedValue){
        const selectedItem = props.options.find(
            (item) => String(newValue) === String(item.value)
        );
        if (selectedItem){
          selectedOption.value = selectedItem;
          selectedOptionItem = selectedItem;
        }
      }else{
        selectedOption.value = props.options[0];
        selectedOptionItem = props.options[0]
      }

      emit('change', selectedOptionItem);
    });

const label = computed(() => selectedOption?.value?.name);
function onClick(e){
  if (e.target.classList.contains('current') || e.target.classList.contains('nice-select')){
    isOpen.value = !isOpen.value;
  }
  if (e.target.classList.contains('option')){
    const selectedOptionValue =  e.target.dataset.value;
    const selectedOptionItem = options.value.find(item => item.value === selectedOptionValue);
    emit('change', selectedOptionItem)
    isOpen.value = false;
    emit("update:modelValue", e.target.dataset.value);
  }
}

const searchInput = ref("");

const onChangeHandler = (e) => {
  searchInput.value = e.target.textContent;
  // emit("input", searchInput.value);
  // emit("update:modelValue", searchInput.value);
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
</script>
<template>
  <div v-click-outside="close" onfocusout="close" class="nice-select n-select d-select" :class="{'open' : isOpen}" tabindex="0" @click.prevent="onClick">
    <span class="current" contenteditable="true" @keyup="onChangeHandler">{{ selectedItem?.name }}</span>
    <ul class="list" :style="listStyles">
      <li v-for="item in options" :key="item.value" :data-value="item.value" class="option" :style="listItemStyles">{{ item.name }}</li>
    </ul>
  </div>

</template>

<style scoped>
.list{
  max-height: 0vh;
}
.current{
  color: #0A2540;
  width: 100%;
  height: unset !important;
}
</style>

