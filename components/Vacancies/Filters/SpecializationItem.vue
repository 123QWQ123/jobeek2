<template>
  <div class="filter-tree-selector-item filter-tree-selector-item_has-children-has-action" data-qa="filter-tree-selector-item filter-tree-selector-item-category-19 filter-tree-selector-item-expanded">
    <div class="filter-form-item">
      <div class="filter-tree-selector-content">
        <div class="check-block" >
          <svg @click="toggle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right cursor-pointer " :class="{expanded: isOpen}" viewBox="0 0 16 16">
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
          </svg>
          <div class="checkbox ms-1">
            <input type="checkbox" id="IT">
            <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <label for="IT">{{ item.name }}</label>
        </div>
      </div>
    </div>
    <div class="filter-tree-selector__items" v-if="isOpen">
      <div class="filter-tree-selector-item filter-tree-selector-item_no-children" v-for="sub_item in item.items" :key="sub_item.id">
        <div class="filter-form-item">
          <div class="filter-tree-selector-content">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="internet">
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <label for="internet">{{sub_item.name}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {item} = defineProps(['item'])
import {useVacancyStore} from "../../../store/vacancy";

// console.log(item)

const vacancyStore = useVacancyStore();

const specializations = computed(() => vacancyStore.specializations)

const isOpen = ref(false);

const toggle = () => isOpen.value = !isOpen.value;

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

</style>