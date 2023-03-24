<template>
  <div class="filter-box" :class="{'open': specializationFilterClass}">
    <div class="filter-box-handle" @click="specializationFilterClass = !specializationFilterClass">
      <strong>Специализации</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#"></div>
    <div class="filter-box-body">
      <div class="check-block-list" v-if="isMore">
        <div class="bloko-modal-overlay bloko-modal-overlay_visible">
          <div class="bloko-modal-container bloko-modal-container_visible" data-qa="bloko-modal">
            <div class="bloko-modal">
              <div class="bloko-modal-header">
                0
                <span class="bloko-modal-title">Специализации</span>
                <div class="bloko-tree-selector-popup-search"><fieldset class="bloko-input-text-wrapper"><input data-qa="bloko-tree-selector-popup-search" placeholder="Быстрый поиск" type="search" class="bloko-input-text" value=""></fieldset></div></div>
              <div class="bloko-tree-selector-popup">
                <div class="bloko-tree-selector-popup-content">
                  <div class="bloko-tree-selector-item bloko-tree-selector-item_has-children-has-action" data-qa="bloko-tree-selector-item bloko-tree-selector-item-category-19 bloko-tree-selector-item-expanded">
                    <div class="bloko-form-item">
                      <div class="bloko-tree-selector-content">
                        <span class="bloko-tree-selector-item-spacer">
                          <span class="bloko-icon-dynamic">
                            <span data-qa="bloko-tree-selector-toogle-node bloko-tree-selector-toogle-node-category-19" class="bloko-icon-link">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="bloko-icon bloko-icon_initial-gray-60 bloko-icon_highlighted-gray-50"><path d="M12 6L8 10L4 6" stroke="var(--bloko-icon-color, var(--bloko-icon-color-default))" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </span>
                          </span>
                        </span>
                        <label class="bloko-checkbox">
                          <input data-qa="bloko-tree-selector-input bloko-tree-selector-input-category-19" name="bloko-tree-selector-default-name-8" class="bloko-checkbox__input" type="checkbox">
                          <span data-qa="bloko-tree-selector-item-text bloko-tree-selector-item-text-category-19" class="bloko-checkbox__text">Автомобильный бизнес</span>
                        </label>
                    </div>
                    </div>
                    <div class="bloko-tree-selector__items" data-qa="bloko-tree-selector-items bloko-tree-selector-items-category-19">
                      <div class="bloko-tree-selector-item bloko-tree-selector-item_no-children" data-qa="bloko-tree-selector-item bloko-tree-selector-item-4">
                        <div class="bloko-form-item">
                          <div class="bloko-tree-selector-content">
                            <label class="bloko-checkbox">
                              <input data-qa="bloko-tree-selector-input bloko-tree-selector-input-4" name="bloko-tree-selector-default-name-8" class="bloko-checkbox__input" type="checkbox">
                              <span data-qa="bloko-tree-selector-item-text bloko-tree-selector-item-text-4" class="bloko-checkbox__text">Автомойщик</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bloko-modal-error bloko-modal-error_hidden"></div>
              <div class="bloko-modal-footer">
              <div class="bloko-tree-selector-popup-footer"><div class="bloko-form-spacer">
                <button class="bloko-button" type="button" data-qa="bloko-tree-selector-popup-cancel"><span>Отменить</span></button>
              </div>
              <div class="bloko-form-spacer">
              <button class="bloko-button bloko-button_kind-primary" type="button" data-qa="bloko-tree-selector-popup-submit"><span>Выбрать</span></button></div></div></div></div>
              <div class="bloko-modal-close-button" data-qa="bloko-modal-close">
              </div>
          </div>
        </div>
      </div>
      <div class="check-block-list" v-else>
        <div v-for="item in specializations" :key="item.title" class="check-block">
          <div class="checkbox">
            <input type="checkbox" id="s1" checked>
            <div class="checkbox-mask">
              <img src="~/assets/img/svg/check.svg" alt="#" />
            </div>
          </div>
          <div class="l-wrap">
            <label for="s1">{{ item.title }}</label>
          </div>
        </div>
      </div>
      <!--          <button class="more-filters" data-default-text="Еще 25"-->
      <!--                  data-hide-text="Скрыть">-->
      <!--            Еще 25-->
      <!--          </button>-->
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";

const vacancyStore = useVacancyStore();

const {getSpecializations} = vacancyStore;

const specializations = computed(() => vacancyStore.specializations)

const isMore = ref(true);
const specializationFilterClass = ref(true);

onMounted(() => {
  getSpecializations();
});


</script>

<style>
.check-block label{
  white-space: pre-wrap;
}

.bloko-modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1041;
  background-color: initial;
  visibility: hidden;
  opacity: 0;
  transition-property: background-color,visibility,opacity;
  transition-duration: .15s;
  transition-timing-function: linear;
}

.bloko-modal-overlay_visible {
  background-color: rgba(48,50,51,.9);
  visibility: visible;
  opacity: 1;
}
.bloko-modal-container_visible {
  opacity: 1;
}
.bloko-modal-container {
  padding: 20px;
}

.bloko-modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100%;
  box-sizing: border-box;
  z-index: 1041;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  transition: opacity .15s linear;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bloko-modal {
  display: flex;
  flex-direction: column;
  /* max-height: 100%; */
  /* max-width: 100%; */
  z-index: 1042;
  -webkit-user-select: text;
  user-select: text;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 10px 15px 0 rgba(48,50,51,.4);
  margin: auto;
  padding: 30px;
  overflow: auto;
}

.bloko-modal {
  border-radius: 4px;
}

.bloko-modal-header {
  width: 0;
  min-width: 100%;
  margin-bottom: 20px;
  flex-shrink: 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
}
.bloko-modal-title {
  margin: 0;
  padding: 0;
  font-size: 24px;
  line-height: 1.16;
  font-family: ProximaNovaCond,Arial Narrow,Roboto Condensed,Arial,sans-serif;
  font-weight: 700;
}
.bloko-tree-selector-popup-search {
  margin-top: 10px;
}
.bloko-input-text-wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
}
.bloko-input-text {
  line-height: 1.43;
  font-size: 14px;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  margin: 0;
  border-radius: 4px;
  font-family: Arial,sans-serif;
  color: #303233;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-tap-highlight-color: transparent;
  background-color: #fff;
  line-height: 38px;
  border-radius: var(--bloko-border-radius-data-entry-v0-11-2);
  border: 1px solid #babdbf;
}


.bloko-tree-selector-popup {
  width: 620px;
  height: 423px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  flex-grow: 1;
  margin-top: -10px;
  padding-left: 10px;
  margin-left: -10px;
}
.bloko-tree-selector-popup-content {
  box-sizing: border-box;
  padding-right: 15px;
  padding-top: 10px;
}
.bloko-tree-selector-item, .bloko-tree-selector-item_has-children-has-action, .bloko-tree-selector-item_no-children {
  border-width: 0;
}
.bloko-tree-selector-item_has-children-has-action {
  margin-left: 2px;
}
.bloko-form-item {
  margin: 10px 0;
}
.bloko-tree-selector-content {
  display: table;
}
.bloko-tree-selector-item-spacer {
  display: table-cell;
  padding-right: 9px;
  vertical-align: top;
}
.bloko-checkbox {
  margin-left: calc(var(--bloko-checkable-control-size) + var(--bloko-checkable-control-margin-right));
  display: inline-table;
  position: relative;
  padding: var(--bloko-checkable-control-vertical-indent) 0;
}
/*.bloko-checkbox__input, .bloko-checkbox__text:before {*/
/*  position: absolute;*/
/*  width: var(--bloko-checkable-control-size);*/
/*  height: var(--bloko-checkable-control-size);*/
/*}*/
.bloko-checkbox__input {
  /*clip: rect(0 0 0 0);*/
}
/*.bloko-checkbox__text {*/
/*  line-height: var(--bloko-checkbox-label-line-height);*/
/*  position: relative;*/
/*  display: table-cell;*/
/*}*/
/*.bloko-checkbox__text:before {*/
/*  content: " ";*/
/*  right: 100%;*/
/*  display: inline-block;*/
/*  box-sizing: border-box;*/
/*  margin-right: var(--bloko-checkable-control-margin-right);*/
/*  top: 0;*/
/*  bottom: 0;*/
/*  color: var(--bloko-color-checkable-typography-default-v0-11-2);*/
/*  border-radius: var(--bloko-border-radius-checkable-v0-11-2);*/
/*  background: var(--bloko-color-checkable-default-background-default-v0-11-2);*/
/*  border: 1px solid var(--bloko-color-checkable-default-border-default-v0-11-2);*/
/*}*/
/*.bloko-checkbox__input, .bloko-checkbox__text:before {*/
/*  position: absolute;*/
/*  width: var(--bloko-checkable-control-size);*/
/*  height: var(--bloko-checkable-control-size);*/
/*}*/
@media (min-width: 1020px){
  .bloko-form-item {
    margin-top: 0;
  }
}
.bloko-tree-selector__items {
  padding-left: 25px;
}
.bloko-tree-selector-item_has-children-has-action>.bloko-tree-selector__items>.bloko-tree-selector-item_no-children {
  margin-left: 27px;
}
.bloko-tree-selector-item, .bloko-tree-selector-item_has-children-has-action, .bloko-tree-selector-item_no-children {
  border-width: 0;
}

.bloko-modal-error_hidden {
  height: 0;
  overflow: hidden;
  margin-top: 0;
  padding: 0 30px;
}

.bloko-modal-error {
  height: auto;
  overflow: hidden;
  color: #fff;
  background: #eb6b6b;
  padding: 7px 30px;
  margin: 25px -30px 0;
  transition: padding .25s ease;
  flex-shrink: 0;
}
.bloko-modal-close-button {
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 1042;
  cursor: pointer;
}
</style>