<template>
  <div class="input-row">
    <div class="left">
        <label for="lenguage">Дополнительные навыки</label>
    </div>

      <div class="right">

          <CreateVacancySkillsForm
                  v-if="selectedSkills.length"
                  :is-new="isNew"
                  :id="currentSkillId"
                  :skill="currentSkill"
                  @add="addItem"
                  @update="updateItem"
                  @delete="deleteItem" />
          <button class="btn btn-primary" v-else @click="reset">Добавить</button>

          <div class="selection selected-options" v-if="computedSelectedSkills.length > 0">
              <ul class="selected-options" id="select2--container">
                  <li class="multi-select_selected-item" v-for="(item, index) in computedSelectedSkills" @click="setCurrent(index)">
                      <button type="button" class="select2-selection__choice__remove" @click="deleteItem(item)">
                          <span aria-hidden="true">×</span>
                      </button>
                      <span class="select2-selection__choice__display">{{ item }}</span>
                  </li>
              </ul>
          </div>
      </div>

  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();

const selectedSkills = ref([]);

const currentSkillId = ref(null);
const currentSkill = ref(null);

const isNew = computed(() => {
    if (currentSkill.value){
        return false;
    }
    return true;
})
const computedSelectedSkills = computed(() => {
    return selectedSkills.value.filter(item => item);
})
const setCurrent = (index) => {
    console.log(index);
    currentSkillId.value = index;
    currentSkill.value = selectedSkills.value[index];
}
const reset = () => {
    selectedSkills.value = [null];
}
const addItem = (newItem) => {
    console.log(newItem);
    const newItems = selectedSkills.value.filter((item) => item);
    newItems.push(newItem);
    newItems.push(null);
    selectedSkills.value = newItems;
}


const updateItem = (id, newItem) => {
    console.log(newItem);
    // const newItems = selectedLanguages.value;
    const newItems = selectedSkills.value.map((item, index) => {
        if (index === id){
            return newItem;
        }
        return item;
    });
    selectedSkills.value = newItems;
    currentSkillId.value = null;
    currentSkill.value = null;
}
const deleteItem = (deleteItem) => {
    const newItems = selectedSkills.value.filter(item => item !== deleteItem);
    selectedSkills.value = newItems;
}
</script>

<style scoped>
.selection{
    /*border: 1px solid;*/
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