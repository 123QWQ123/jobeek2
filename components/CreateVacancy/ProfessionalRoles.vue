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

    <div class="selection selected-options" v-if="professional_roles.length">
      <ul class="selected-options" id="select2--container">
        <li v-for="item in professional_roles" class="multi-select_selected-item" @click="onUnselect(item)">
          <button type="button" class="select2-selection__choice__remove" >
            <span aria-hidden="true">×</span>
          </button>
          <span class="select2-selection__choice__display">{{ getSelectedOptionName(item) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const emit = defineEmits(['update:modelValue']);
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


const {searchProfessionalRoles} = profileStore;
const selectedOptions = ref([]);
const profRoleOptions = ref([]);
const hhProfRoleOptions = ref([]);
const superjobProfRoleOptions = ref([]);

const professional_roles = ref([]);
watchEffect(() => (professional_roles.value = props.modelValue));

watch(() => props.modelValue, (newValues) => {
  professional_roles.value = newValues;
  const items = profRoleOptions.value.filter((item) => newValues.includes(item.id));
})

watch(() => professional_roles.value, (newValues) => {
  emit('update:modelValue', newValues);
})


function getSelectedOptionName(value){
  const selectedOptionItem = profRoleOptions.value.find(item => String(item.value) === String(value));
  if (selectedOptionItem) return selectedOptionItem.name;
  else return "Not found";
}
const onHHUpdateInput = async (newValue = '') => {
  console.log(newValue);
  if (newValue.length > 2){
    const items = await searchProfessionalRoles({providers: ['hh'], search: newValue}) ?? [];
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    hhProfRoleOptions.value = newOptions;
  }
}

const onSuperjobUpdateInput = async (newValue = '') => {
  if (newValue.length > 2){
    const items = await searchProfessionalRoles({providers: ['hh'], search: newValue}) ?? [];
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    superjobProfRoleOptions.value = newOptions;
  }
}
function onUnselect(deleteId){
  if (professional_roles.value.includes(deleteId)){
    const selectedItems = professional_roles.value.filter(item => item.toString() !== deleteId.toString());
    professional_roles.value = selectedItems;
  }
}

onMounted(() => {

  setTimeout(async() => {
    const items = await searchProfessionalRoles({providers: ['superjob']}) ?? [];
    let newOptions = items.map(item => ({value: item.id, name: `${item.name}` }));
    superjobProfRoleOptions.value = newOptions;

    const items2 = await searchProfessionalRoles({providers: ['hh']}) ?? [];
    let newOptions2 = items2.map(item => ({value: item.id, name: `${item.name}` }));
    hhProfRoleOptions.value = newOptions2;

    profRoleOptions.value = [...newOptions, ...newOptions2];

  }, 500)


})

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
  border: 1px solid #5375FD;
  border-radius: 4px;
  padding: 2px;
  color: #5375FD;
}
.multi-select_selected-item span{
  color: #5375FD;
}

</style>