<template>
  <div class="filter-box" :class="{'open': specializationFilterClass}">
    <div class="filter-box-handle" @click="specializationFilterClass = !specializationFilterClass">
      <strong>Специализации</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#"></div>
    <div class="filter-box-body">
      <div class="check-block-list">


        <div v-for="item in firstItems" :key="item.name" class="check-block">
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


        <div class="filter-modal-overlay filter-modal-overlay_visible" v-if="isModalOpen" >
            <div class="filter-modal-container filter-modal-container_visible">
              <div class="filter-modal">
                <div class="filter-modal-header">
                  <span class="filter-modal-title">Специализации</span>
                  <div class="filter-tree-selector-popup-search">
                    <fieldset class="input-wrapper">
                      <input placeholder="Быстрый поиск" type="search" class="filter-input-text" value="">
                    </fieldset>
                  </div>
                </div>
                <div class="filter-tree-selector-popup">
                  <div class="filter-tree-selector-popup-content">
                    <VacanciesFiltersSpecializationItem v-for="item in groupedSpecs" :item="item" :key="item.id"/>
                  </div>
                </div>
                <div class="filter-modal-error filter-modal-error_hidden"></div>
                <div class="filter-modal-footer">
                  <div class="filter-tree-selector-popup-footer">
                    <div class="filter-form-spacer">
                      <button @click="toggleModal" class="btn button-xs sign-in-btn" type="button"><span>Отменить</span></button>
                    </div>
                    <div class="filter-form-spacer">
                      <button class="btn button-accent" type="button">
                        <span>Выбрать</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="filter-modal-close-button" @click="toggleModal">
                <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
              </div>
            </div>
        </div>
        <button class="more-filters"
                data-default-text="Еще"
                data-hide-text="Скрыть"
                @click="toggleModal"
        >
          Выбрать
        </button>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";
import {storeToRefs} from "pinia";

const vacancyStore = useVacancyStore();

const {getSpecializations} = vacancyStore;
const {specializations} = storeToRefs(vacancyStore)
// const specializations = computed(() => vacancyStore.specializations);

const groupedSpecs = ref([]);

const firstItems = ref([]);
watch(
    () => vacancyStore.specializations,
    (newValues) => {

      if (!newValues || newValues.length  < 1){
        return;
      }
      for (let i = 0; i < 5; i++){
        let item = newValues[i];
        firstItems.value.push({
          id: item.id,
          name: item.title,
          is_checked: false
        });
      }

      const groupItems = [];
      for (let i = 0; i < newValues.length; i++){
        const item = newValues[i];
        if (item && !item.parent_id){

          groupItems.push({
            id: item.id,
            name: item.title,
            is_checked: false,
            items: []
          })
        }
      }


      for (let i = 0; i < groupItems.length; i++){
        const item = groupItems[i];
        for (let j = 0; j < newValues.length; j++){
          const sub_item = newValues[j];
          if (sub_item && sub_item.parent_id){
            if (sub_item.parent_id === item.id){
              groupItems[i].items.push({
                id: sub_item.id,
                name: sub_item.title,
                is_checked: false,
              })
            }
          }
        }
      }

      groupedSpecs.value = groupItems;

      console.log(groupedSpecs.value.length)
})



const isModalOpen = ref(true);

const toggleModal = () => isModalOpen.value = !isModalOpen.value;
const specializationFilterClass = ref(true);

onMounted(() => {
  getSpecializations();
});


</script>

<style>
.check-block label{
  white-space: pre-wrap;
}

.filter-modal-overlay {
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

.filter-modal-overlay_visible {
  background-color: rgba(48,50,51,.9);
  visibility: visible;
  opacity: 1;
}
.filter-modal-container_visible {
  opacity: 1;
}
.filter-modal-container {
  padding: 20px;
}

.filter-modal-container {
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

.filter-modal {
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

.filter-modal {
  border-radius: 4px;
}

.filter-modal-header {
  width: 0;
  min-width: 100%;
  margin-bottom: 20px;
  flex-shrink: 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
}
.filter-modal-title {
  margin: 0;
  padding: 0;
  font-size: 24px;
  line-height: 1.16;
  font-weight: 700;
}
.filter-tree-selector-popup-search {
  margin-top: 10px;
}
.filter-form-spacer{
  margin: 0.2rem 0.5rem;
}
.filter-input-text {
  line-height: 1.43;
  font-size: 14px;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  margin: 0;
  border-radius: 4px;
  color: #303233;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-tap-highlight-color: transparent;
  background-color: #fff;
  border: 1px solid #babdbf;
}


.filter-tree-selector-popup {
  width: 620px;
  height: 423px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  flex-grow: 1;
  margin-top: -10px;
  padding-left: 10px;
  margin-left: -10px;
}
.filter-tree-selector-popup-content {
  box-sizing: border-box;
  padding-right: 15px;
  padding-top: 10px;
}
.check-block{
}
@media (min-width: 1020px){

}
.filter-modal-error {
  height: auto;
  overflow: hidden;
  color: #fff;
  background: #eb6b6b;
  padding: 7px 30px;
  margin: 25px -30px 0;
  transition: padding .25s ease;
  flex-shrink: 0;
}

.filter-modal-error_hidden {
  height: 0;
  overflow: hidden;
  margin-top: 0;
  padding: 0 30px;
}

.filter-modal-close-button {
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 1042;
  cursor: pointer;
}

.filter-tree-selector-popup-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>