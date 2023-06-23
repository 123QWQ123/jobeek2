<template>
  <div class="filter-box" :class="{'open': filterClass}">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Подработка</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#">
    </div>

    <div class="filter-box-body">
      <div class="check-block-list" :class="{'all-visible': isMore}">
        <div class="check-block" v-for="item in filterItems">
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
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['onFormChange'])
import {useVacancyStore} from "../../../store/vacancy";
import {useVacancyForm} from "../../../composables/useVacancyForm";

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();

const filterClass = ref(true);
const isMore = ref(true);
const search = ref("");
const filterItems = ref([]);

const toggleMore = () => isMore.value = !isMore.value;

const form = ref(useVacancyForm());
const selectedFilterItems = ref(form.value.part_times);

const toggle = (id) => {
  filterItems.value.map((item, key) => {
    if(item.id === id){
      item.is_checked = !item.is_checked;
      if (!selectedFilterItems.value.includes(parseInt(item.id)) && item.is_checked){
        selectedFilterItems.value.push(item.id);
      }else{
        if (selectedFilterItems.value.includes(item.id) && item.is_checked === false){
          selectedFilterItems.value = selectedFilterItems.value.filter(sub => sub !== item.id);
        }
      }
      return item;
    }
    return item;
  });
  form.value.part_times = selectedFilterItems.value;
  submitSearch();
};



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

  filterItems.value = sortedItems.map(item => {
    item.is_checked = selectedFilterItems.value.includes(item.id);
    return item;
  });
};

watch(() => dictionaryStore.part_times, prepare);
const {getPartTimes} = dictionaryStore;
onMounted(async () => {
  if (dictionaryStore.part_times.length === 0){
    await getPartTimes();
  }else{
    prepare(null, dictionaryStore.part_times);
  }
});

const  isLoading = ref(false);
const {clearVacancies} = vacancyStore;
const router  = useRouter();
const submitSearch = () => {
  emit('onFormChange', 'part_times', selectedFilterItems.value);
}

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