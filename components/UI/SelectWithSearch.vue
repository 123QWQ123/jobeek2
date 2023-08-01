<template>
    <div class="nice-select n-select d-select" :class="{'open' : isOpen}" v-click-outside="() => isOpen = false" tabindex="0">

        <span class="current" ref="searchInputElement" contenteditable="true" @keyup="onChangeHandler" :class="{placeholder: placeholderClass}" @click="toggle" >{{ labelText }}</span>
        <span class="select_arrow" @click="toggle"></span>
        <ul class="list" :style="listStyles" v-if="isOpen">
            <li v-for="item in options" :key="item.value" :data-value="item.value" class="option" @click="onSelect(item.value)" :style="listItemStyles">{{ item.name }}</li>
        </ul>
    </div>
</template>
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
watch(() => props.modelValue, (newValue) => {
  selectedOption.value = options.value.find(item => String(item.value) === String(newValue));
});

const selectedOption = ref(null);

onMounted(() => {
    selectedOption.value = options.value.find(item => String(item.value) === String(props.modelValue));
})

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
function toggle(){
    if (isFirst.value === false){
        isFirst.value = true;
    }
    isOpen.value = !isOpen.value;
    if (isOpen.value){
        setTimeout(() => searchInputElement.value?.focus(), 0);
    }
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
  cursor: pointer;
}

.placeholder {
    font-weight: 400 !important;
    font-size: 16px;
    line-height: 22px;
    background-color: unset;
    opacity: 1;
}

.placeholder {
    font-weight: 400 !important;
    font-size: 16px;
    line-height: 22px;
    background-color: unset;
    opacity: 1;
}

.nice-select:after{
    display: none;
}
.select_arrow{
    border-bottom: 2px solid #999;
    border-right: 2px solid #999;
    content: '';
    display: block;
    height: 8px;
    margin-top: -4px;
    pointer-events: initial;
    position: absolute;
    right: 16px;
    top: 50%;
    transform-origin: 66% 66%;
    transform: rotate(45deg);
    transition: all 0.15s ease-in-out;
    width: 8px;
}
</style>

