<template>
  <div class="filter-tree-selector-item filter-tree-selector-item_has-children-has-action" data-qa="filter-tree-selector-item filter-tree-selector-item-category-19 filter-tree-selector-item-expanded">
    <div class="filter-form-item">
      <div class="filter-tree-selector-content">
        <div class="check-block" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right cursor-pointer expanded" viewBox="0 0 16 16">
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
          </svg>
          <div class="checkbox ms-1">
            <input type="checkbox" id="IT">
            <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <label for="IT">Информационные технологии, интернет, телеком</label>
        </div>
      </div>
    </div>
    <div class="filter-tree-selector__items">
      <div class="filter-tree-selector-item filter-tree-selector-item_no-children" >
        <div class="filter-form-item">
          <div class="filter-tree-selector-content">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="internet">
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <label for="internet">Internet</label>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-tree-selector-item filter-tree-selector-item_no-children" >
        <div class="filter-form-item">
          <div class="filter-tree-selector-content">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="internet">
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <label for="internet">Internet</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";
import Vacancies from "../../../pages/search/vacancies";

const vacancyStore = useVacancyStore();

const specializations = computed(() => vacancyStore.specializations)

const isOpen = ref(true);

</script>

<style>

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
.filter-tree-selector-item-spacer {
  display: table-cell;
  padding-right: 9px;
  vertical-align: top;
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