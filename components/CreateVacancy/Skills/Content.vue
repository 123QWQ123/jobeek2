<template>
  <div class="w-100">

      <div class="text-danger d-block p-4" v-if="props.message">
        {{ props.message }}
      </div>
      <CreateResumeSkillsForm
              v-if="state.skills.val.length"
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
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const props = defineProps(['modelValue', 'errors']);
const emit = defineEmits(['update:modelValue']);
const dictionaryStore = useDictionaryStore();


const state = reactive({
  skills: {
    val: props.modelValue ?? [],
    isValid: true
  }
});
const isFirst = ref(true);

const currentSkillId = ref(null);
const currentSkill = ref(null);

const isNew = computed(() => {
    if (currentSkill.value){
        return false;
    }
    return true;
})
const computedSelectedSkills = computed(() => {
    return state.skills.val.filter(item => item);
})
const setCurrent = (index) => {
    currentSkillId.value = index;
    currentSkill.value = state.skills.val[index];
    if (isFirst.value){
      isFirst.value = false;
    }
}
const reset = () => {
  state.skills.val = [null];
}
const addItem = (newItem) => {
    const newItems = state.skills.val.filter((item) => item);
    newItems.push(newItem);
    newItems.push(null);
    state.skills.val = newItems;
    if (isFirst.value){
      isFirst.value = false;
    }
}


const updateItem = (id, newItem) => {
    // const newItems = selectedLanguages.value;
    const newItems = state.skills.val.map((item, index) => {
        if (index === id){
            return newItem;
        }
        return item;
    });
    state.skills.val = newItems;
    currentSkillId.value = null;
    currentSkill.value = null;
    if (isFirst.value){
      isFirst.value = false;
    }
}
const deleteItem = (deleteItem) => {
    const newItems = state.skills.val.filter(item => item !== deleteItem);
    state.skills.val = newItems;
    if (isFirst.value){
      isFirst.value = false;
    }
}

watch(() => state.skills.val, (newValues) => {
  console.log(newValues);
  if (!isFirst.value){
    emit('update:modelValue', newValues.filter(item => item));
  }else{
    isFirst.value = false;
  }
})

const errors = ref({});
watch(() => props.errors, (newErrors) => {
  console.log(errors.value, newErrors);
  errors.value = newErrors;
})

</script>

<style scoped>
.selection{
    border-radius: 4px;
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