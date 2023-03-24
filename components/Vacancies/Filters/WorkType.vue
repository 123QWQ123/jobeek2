<template>
  <div class="filter-box" :class="{'open': employmentTypeFilterClass}">
    <div class="filter-box-handle" @click="employmentTypeFilterClass = !employmentTypeFilterClass">
      <strong>Тип занятости</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#">
    </div>

    <div class="filter-box-body">
      <div class="check-block-list" :class="{'all-visible': isMore}">
        <div class="check-block" v-for="item in workTypes">
          <div class="checkbox">
            <input type="checkbox" :checked="item.is_checked" @change="toggle(item.id)">
            <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <div class="l-wrap">
            <label>{{item.name}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";
import {useVacancyForm} from "../../../composables/useVacancyForm";

const vacancyStore = useVacancyStore();

const {getRegions} = vacancyStore;

const isMore = ref(true);
const search = ref("");
const workTypes = ref([]);

const toggleMore = () => isMore.value = !isMore.value;

const form = ref(useVacancyForm());
console.log(form.value.work_types);
const selectedWorkTypes = ref(form.value.work_types);

const toggle = (id) => {
  workTypes.value.map((item, key) => {
    if(item.id === id){
      item.is_checked = !item.is_checked;
      if (!selectedWorkTypes.value.includes(parseInt(item.id)) && item.is_checked){
        selectedWorkTypes.value.push(item.id);
      }else{
        if (selectedWorkTypes.value.includes(item.id) && item.is_checked === false){
          selectedWorkTypes.value = selectedWorkTypes.value.filter(sub => sub !== item.id);
        }
      }
      return item;
    }
    return item;
  });
  form.value.work_types = selectedWorkTypes.value;
  submitSearch();
};


const  isLoading = ref(false);
const {clearVacancies} = vacancyStore;
const router  = useRouter();
const submitSearch = () => {
  isLoading.value = true;
  clearVacancies();
  console.log(form.value);
  const params = useVacancyForm(form.value, 'front');
  router.replace({name: 'search-vacancies', query: params});
  isLoading.value = false;
}

const prepare = (items, custom_items) => {

  let unsortedItems = items;
  if (!items){
    unsortedItems = custom_items;
  }

  const sortedItems = unsortedItems.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  workTypes.value = sortedItems.map(item => {
    item.is_checked = selectedWorkTypes.value.includes(item.id);
    return item;
  });
};

watch(() => vacancyStore.work_types, prepare);

const {getWorkTypes} = vacancyStore;

const employmentTypeFilterClass = ref(true);

onMounted(async () => {
  await getWorkTypes();
});


</script>

<style setup>
.check-block label{
  white-space: pre-wrap;
}
.with_scroll{
  max-height: 300px;
  overflow: auto;
}
.is_header .l-wrap label{
  font-weight: bold;
}
.is_header input,
.is_header .radio-mask
{
  display: none;
}

input[type="search"]{
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #CBCBCB;
  padding: 0.1rem 0.3rem;
}
</style>