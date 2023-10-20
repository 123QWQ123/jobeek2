<template>
  <div>
    <div class="row">
      <div class="col">

        <div class="row">
          <label>HH:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <MultiSelectWithSearch :hide_selection="true" :options="hhProfRoleOptions" v-model="professional_roles" :label="'Выберите сферу'" @input="onHHUpdateInput" @focusin="() => errors.professional_roles = ''"></MultiSelectWithSearch>
          </div>
        </div>
      </div>
      <div class="col">

        <div class="row">
          <label>Superjob:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <MultiSelectWithSearch :hide_selection="true" :options="superjobProfRoleOptions" v-model="professional_roles" :label="'Выберите сферу'" @input="onSuperjobUpdateInput" @focusin="() => errors.professional_roles = ''"></MultiSelectWithSearch>
          </div>

        </div>
      </div>
    </div>

    {{profRoleOptions.length}}
    {{props.modelValue}}
    {{selectedOptions}}
<!--    <div class="selection selected-options" v-if="selectedOptions.length">-->
<!--      <ul class="selected-options" id="select2&#45;&#45;container">-->
<!--        <li v-for="item in selectedOptions" class="multi-select_selected-item" @click="onUnselect(item)">-->
<!--          <button type="button" class="select2-selection__choice__remove" >-->
<!--            <span aria-hidden="true">×</span>-->
<!--          </button>-->
<!--          <span class="select2-selection__choice__display">{{ getSelectedOptionName(item) }}</span>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const props = defineProps({
  modelValue: {
    required: true,
    defaul: []
  },
  errors: {
    required: false,
    default: {}
  }
});

import {useProfileStore} from "~/store/profile";
import {useRuntimeConfig} from "#app";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const {updateVacancy, getMyVacancy} = vacancyStore;

const {employer} = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const professional_roles = ref( props.modelValue ?? []);
watch(() => props.modelValue, (newValues) => {
  professional_roles.value = newValues;
})

const {searchProfessionalRoles} = profileStore;
const selectedOptions = ref([]);
const profRoleOptions = ref([]);
const hhProfRoleOptions = ref([]);
const superjobProfRoleOptions = ref([]);

function getSelectedOptionName(value){
  const selectedOptionItem = profRoleOptions.value.find(item => String(item.value) === String(value));
  if (selectedOptionItem) return selectedOptionItem.name;
  else return "Not found";
}
const onHHUpdateInput = async (newValue = '') => {
  console.log(newValue);
  if (newValue.length > 1){
    const items = await searchProfessionalRoles({providers: ['hh'], search: newValue}) ?? [];
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    hhProfRoleOptions.value = newOptions.concat(selectedOptions.value);
  }
}

const onSuperjobUpdateInput = async (newValue = '') => {
  console.log(newValue);
  if (newValue.length > 2){
    const items = await searchProfessionalRoles({providers: ['hh'], search: newValue}) ?? [];
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    superjobProfRoleOptions.value = newOptions.concat(selectedOptions.value);
  }
}

onMounted(() => {
  setTimeout(async() => {
    const items = await searchProfessionalRoles({providers: ['hh']}) ?? [];
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    hhProfRoleOptions.value = newOptions.concat(selectedOptions.value);
  }, 500)
  setTimeout(async() => {
    const items = await searchProfessionalRoles({providers: ['superjob']}) ?? [];
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    superjobProfRoleOptions.value = newOptions.concat(selectedOptions.value);
  }, 500)

  setTimeout(() => {
    profRoleOptions.value = [...hhProfRoleOptions.value, ...superjobProfRoleOptions.value];
  }, 600)

})

</script>

<style>

.from-to-block{

}

</style>