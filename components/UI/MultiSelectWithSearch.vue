<template>
    <div class="multi-select_wrapper">
        <div v-click-outside="close" onfocusout="close" class="select2-container select2-container--default select2-container--below select2-container--focus nice-select n-select d-select" :class="{'open' : isOpen}" tabindex="0" @click.prevent="onClick">
            <span class="current " contenteditable="true" @keyup="onChangeHandler">{{ searchInput }}</span>

            <ul class="list" :style="listStyles">
                <li v-for="item in options" @click="onSelect" :key="item.value" :data-value="item.value" class="option" :style="listItemStyles">{{ item.name }}</li>
            </ul>

        </div>
        <div class="selection selected-options">
            <ul class="selected-options" id="select2--container">
                <li v-for="item in selectedOptions" class="multi-select_selected-item">
                    <button type="button" class="select2-selection__choice__remove" @click="onUnselect(item)">
                        <span aria-hidden="true">×</span>
                    </button>
                    <span class="select2-selection__choice__display">{{ getSelectedOptionName(item) }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "MultiSelectWithSearch",
}
</script>

<script setup>
const emit = defineEmits(['change', 'update:modelValue', 'input', 'unselect']);
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
  },
  selected: {
    required: false
  },
  sort_by: {
    required: false,
      default: 'asc'
  }
});

const isOpen = ref(false);
const options = ref(props.options);
watch(props, (newProps) => {
  options.value = newProps.options.sort(function(a, b) {
      let textA = a.name.toUpperCase();
      let textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  selectedOption.value = options.value.find(item => String(item.value) === String(props.modelValue));
});


const selectedOption = ref(null);
const selectedOptions = ref([]);
const selectedItem = computed(() =>{
  if (options.value.length){
    if (selectedOption.value){
      return selectedOption;
    }
    return options.value[0];
  }
});


function onSelect(e){
  if (e.target.classList.contains('current') || e.target.classList.contains('nice-select')){
    isOpen.value = !isOpen.value;
  }
  if (e.target.classList.contains('option')){
    isOpen.value = false;
    const selectedOptionValue =  e.target.dataset.value;
      console.log(options.value);
    const selectedOptionItem = options.value.find(item => String(item.value) === String(selectedOptionValue));
      console.log(selectedOptionItem, selectedOptionValue);
    if (selectedOptionItem){
        selectedOption.value = selectedOptionItem;
        console.log(selectedOptionItem);
        if (!selectedOptions.value.includes(selectedOptionItem.value)){
            selectedOptions.value.push(String(selectedOptionItem.value));
        }

        // exclude from all options
        options.value = props.options.filter(item => !selectedOptions.value.includes(String(item.value)));
        emit('change', selectedOptionItem)
    }
  }
}

function onUnselect(deleteId){
    console.log(deleteId);
    let tempOptions = options.value;
    const selectedOptionItemIndex = props.options.findIndex(item => String(item.value) === String(deleteId));
    console.log(selectedOptionItemIndex);
    if (selectedOptionItemIndex !== -1){
        if (selectedOptions.value.includes(deleteId)){
            selectedOptions.value.splice(selectedOptionItemIndex);
            selectedOptions.value = selectedOptions.value.filter(item => String(item.value) !== String(deleteId));
            tempOptions.push(props.options[selectedOptionItemIndex]);
            tempOptions = tempOptions.sort(function(a, b) {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            options.value = tempOptions;
        }
        emit('unselect', deleteId)
    }
}
function onClick(e){
  if (e.target.classList.contains('current') || e.target.classList.contains('nice-select')){
    isOpen.value = !isOpen.value;
  }
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
        (item) => item.name.toLowerCase().includes(typedName)
    );
  }
}

function getSelectedOptionName(value){
    console.log(value, options);
    const selectedOptionItem = props.options.find(item => String(item.value) === String(value));
    if (selectedOptionItem) return selectedOptionItem.name;
    else return "Not found";
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
.multi-select_wrapper{

}
.list{
    max-height: 0vh;
    margin-top: 0;
}
.current{
    margin-top: 0.8rem;
    color: #0A2540;
    width: 100%;
    height: unset !important;
    display: block;
}
.selection{
    border: 1px solid;
    border-radius: 4px;
    /*padding: 0 16px;*/
    left: 0;
}
.selected-options{
    margin-top: 0.5rem;
    flex-wrap: wrap;
    display: flex;
    padding: 0 0.1rem 0.2rem;
    gap: 0.5rem;
}

.multi-select_selected-item{
    border: 1px solid;
    border-radius: 4px;
    padding: 2px;
}
</style>

