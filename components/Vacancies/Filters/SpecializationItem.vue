<template>
  <div class="filter-tree-selector-item filter-tree-selector-item_has-children-has-action">
    <div class="filter-form-item">
      <div class="filter-tree-selector-content">
        <div class="check-block" >
          <svg @click="toggle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right cursor-pointer " :class="{expanded: isOpen}" viewBox="0 0 16 16">
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
          </svg>

          <div class="checkbox ms-1" @click="selectToggle" :title="item.is_checked + '-' + isHalfChecked">
            <input type="checkbox" :id="item.id" :checked="item.is_checked" :class="{'is_half_checked': isHalfChecked}">
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/dash.svg" alt="#" v-if="isHalfChecked" >
              <img src="~/assets/img/svg/check.svg" alt="#" v-else>
            </div>
          </div>
          <label :for="item.id">{{ item.name }}</label>
        </div>
      </div>
    </div>
    <div class="filter-tree-selector__items" v-if="isOpen">
      <div class="filter-tree-selector-item filter-tree-selector-item_no-children" v-for="sub_item in items" :key="sub_item.id">
        <div class="filter-form-item">
          <div class="filter-tree-selector-content">
            <div class="check-block">
              <div class="checkbox">
                <input :checked="sub_item.is_checked" type="checkbox" :id="item.id + '_' + sub_item.id" @click="selectSubToggle(sub_item.id)">
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <label :for="item.id + '_' + sub_item.id">{{sub_item.name}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set'])
const props = defineProps({
  item: {
    required: true,
  },
  items: {
    required: true,
  },
  isOpen: {
    required: false,
    default: false
  },
  isHalfChecked: {
    required: false,
  },
})
import {useVacancyStore} from "../../../store/vacancy";

const item = ref(props.item);
const items = ref(props.items);
const isOpen = ref(props.isOpen);
const selected_ids = items.value.filter(item => item.is_checked).map(item => item.id);
const isHalfChecked = ref(selected_ids.length > 0 && selected_ids.length !== items.value.length);
if (selected_ids.length === items.value.length){
  item.value.is_checked = true;
}
const selectedSubSpecs = ref(selected_ids);

watchEffect(() => item.value = props.item);
watchEffect(() => items.value = props.items);
// watchEffect(() => isHalfChecked.value = props.isHalfChecked);

watch(selectedSubSpecs, (newValue, oldValue) => {
  emit('set', props.item.id, newValue);
});

const vacancyStore = useVacancyStore();


const toggle = () => isOpen.value = !isOpen.value;
const selectToggle = () => {
  let is_checked = !item.value.is_checked;

  if (is_checked){
    selectedSubSpecs.value = items.value.map(spec => spec.id);
  }else{
    selectedSubSpecs.value = [];
    isHalfChecked.value = false;
  }
  const sub_items = items.value.map(sub_item => {
    sub_item.is_checked = is_checked;
    return sub_item;
  });
  items.value = sub_items;
  item.value = {...item.value, is_checked: is_checked};
}

const selectSubToggle = (sub_id) => {
  const dynSelectedItems = [...selectedSubSpecs.value];
  const sub_items = items.value.map(sub_item => {
    const dyn_sub_item = {...sub_item};
    if (dyn_sub_item.id === sub_id){
      dyn_sub_item.is_checked = !dyn_sub_item.is_checked;
      if (dyn_sub_item.is_checked){
        dynSelectedItems.push(dyn_sub_item.id)
      }else{
        const findIndex = dynSelectedItems.findIndex(id => id === dyn_sub_item.id);
        if (findIndex !== -1)
          dynSelectedItems.splice(findIndex, 1);
      }
    }
    return dyn_sub_item;
  });
  let is_any_checked = sub_items.some(sub_item => sub_item.is_checked === true);
  let is_all_checked = !sub_items.some(sub_item => sub_item.is_checked === false);

  if (!is_all_checked && is_any_checked){
    isHalfChecked.value = true;
  }else{
    isHalfChecked.value = false;
  }
  if (is_all_checked){
    isHalfChecked.value = false;
  }
  item.value = {...item.value, is_checked: is_all_checked};
  items.value = sub_items;
}

</script>

<style>

.check-block .expanded{
  transform: rotateZ(90deg);
}
.filter-tree-selector-item, .filter-tree-selector-item_has-children-has-action, .filter-tree-selector-item_no-children {
  border-width: 0;
}
.filter-tree-selector-item_has-children-has-action {
  margin-left: 2px;
}
.filter-form-item {
  margin: 10px 0;
}
.filter-tree-selector-content {
  display: table;
}
.check-block{
}
.check-block .expanded{
  transform: rotateZ(90deg);
}
@media (min-width: 1020px){
  .filter-form-item {
    margin-top: 0;
  }
}
.filter-tree-selector__items {
  padding-left: 25px;
}
.filter-tree-selector-item_has-children-has-action>.filter-tree-selector__items>.filter-tree-selector-item_no-children {
  margin-left: 27px;
}
.filter-tree-selector-item, .filter-tree-selector-item_has-children-has-action, .filter-tree-selector-item_no-children {
  border-width: 0;
}


.check-block .checkbox input.is_half_checked ~ .checkbox-mask{
  background: #5375FD;
}
.check-block .checkbox input.is_half_checked ~ .checkbox-mask img{
  opacity: 1;
}
</style>