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
  placeholder: {
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
  },
  selected: {
    required: false
  }
});

const isFirst = ref(false);
const isOpen = ref(false);
const options = ref(props.options);
const placeholder = computed(() => props.placeholder);

watch(() => props.options, (newOptions) => {
  options.value = newOptions;
  selectedOption.value = options.value.find(item => String(item.value) === String(props.modelValue));
});


const selectedOption = ref(null);

const labelText = computed(() => {
    if (!isOpen.value){
        if (selectedOption.value){
            return selectedOption.value.name;
        }else{
            if (isFirst.value || !selectedOption.value){
                return placeholder.value;
            }
            return searchInput.value;
        }
    }else{
        return searchInput.value;
    }
})

const placeholderClass = computed(() => {
    return isFirst.value || !selectedOption.value;
})

const searchInputElement = ref();
function switchToEditing(){
    isOpen.value = true;
    if (isFirst.value === false){
        isFirst.value = true;
    }
    setTimeout(() => searchInputElement.value?.focus(), 0);
}
function onSelect(id){
    const selectedOptionItem = options.value.find(item => String(item.value) === String(id));
    selectedOption.value = selectedOptionItem;
    searchInput.value = selectedOptionItem.name;
    emit('change', selectedOptionItem);
    emit("update:modelValue", id);
    isOpen.value = false;
}

const searchInput = ref("");

const onChangeHandler = (e) => {
  searchInput.value = e.target.textContent;
  isOpen.value = true;
  const typedName = e.target.textContent.toLowerCase();
  emit('input', searchInput.value);
  if (typedName === ""){
    options.value = props.options;
  }else{
    options.value = props.options.filter(
        (item) => String(item.name).toLowerCase().includes(typedName)
    );
  }
}

function close(){
  isOpen.value = false;
}
</script>
<template>
  <div v-click-outside="close" onfocusout="close" class="nice-select n-select d-select" :class="{'open' : isOpen}" tabindex="0">

    <span class="current" ref="searchInputElement" contenteditable="true" @keyup="onChangeHandler" :class="{placeholder: placeholderClass}" @click="switchToEditing" >{{ labelText }}</span>

    <ul class="list" :style="listStyles" v-if="isOpen">
      <li v-for="item in options" :key="item.value" :data-value="item.value" class="option" @click="onSelect(item.value)" :style="listItemStyles">{{ item.name }}</li>
    </ul>
  </div>

</template>

<style>

.select2-container .select2-selection--multiple .select2-selection__rendered{
  flex-wrap: wrap !important;
}

</style>
<style scoped>
.list{
  max-height: 0vh;
}
.current{
  color: #0A2540;
  width: 100%;
  height: unset !important;
}

.placeholder {
    font-weight: 400 !important;
    font-size: 16px;
    line-height: 22px;
    background-color: unset;
    opacity: 1;
}
</style>

