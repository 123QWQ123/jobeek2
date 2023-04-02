<template>
  <div class="filter-box" :class="{'open': regionFilterClass}">
    <div class="filter-box-handle" @click="regionFilterClass = !regionFilterClass">
      <strong>Cities({{selectedRegion}})</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#">
    </div>

    <div v-if="isMore" class="filter-box-body " >
      <div class="search_area">
        <input type="search" v-model="search" @keyup.prevent="onSearch" @input="onSearch">
      </div>
      <div class="check-block-list with_scroll" :class="{'all-visible': isMore}">
        <div class="check-block" v-for="item in groupedFilterItems" :class="{'is_header': item.is_header}">
          <div class="checkbox" v-if="!item.is_header">
            <input type="checkbox" :checked="item.is_checked" @change="toggleRegion(item.id)">
            <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <div class="l-wrap">
            <label>{{item.name}}</label>
          </div>
        </div>
      </div>
      <button class="more-filters" data-default-text="Еще 25" data-hide-text="Скрыть" @click="toggleMore">
        Скрыть
      </button>
    </div>
    <div v-else class="filter-box-body">
      <div class="check-block-list" >
        <div class="check-block" v-for="item in groupedFilterItems">
          <div class="checkbox" v-if="!item.is_header">
            <input type="checkbox" :checked="item.is_checked" @change="toggleRegion(item.id)" >
            <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <div class="l-wrap" v-if="!item.is_header">
            <label>{{item.name}}</label>
          </div>
        </div>
      </div>
      <button class="more-filters" data-default-text="Еще 25" data-hide-text="Показат" @click="toggleMore">
        Еще {{ total }}
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['onFormChange']);
const {selectedRegion} = defineProps(['selectedRegion']);
import {useVacancyStore} from "../../../store/vacancy";
import {useVacancyForm} from "../../../composables/useVacancyForm";

const vacancyStore = useVacancyStore();

const appliedRegion = ref(null);
const search = ref("");
const cities = ref([]);

const total = computed(() => cities.value.length - 5);
const regionFilterClass = ref(true);
const isMore = ref(false);
const groupedFilterItems = ref([]);

const toggleMore = () => isMore.value = !isMore.value;
const onSearch = (e) => {
  const search = e.target.value;
  let items = [];
  if (search != ''){
    items = vacancyStore.cities.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

  }else{
    items = vacancyStore.cities.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  selectedItems.value = items;
  prepare(items);
};

const form = ref(useVacancyForm());
console.log(form.value.cities)
const selectedItems = ref(form.value.cities);

const toggleRegion = (id) => {
  const items = groupedFilterItems.value.map((item, key) => {
    if(item.id === id){
      item.is_checked = !item.is_checked;
      if (!selectedItems.value.includes(item.id) && item.is_checked){
        selectedItems.value.push(item.id);
      }else{
        if (selectedItems.value.includes(item.id) && item.is_checked === false){
          selectedItems.value = selectedItems.value.filter(sub => sub !== item.id);
        }
      }
      return item;
    }
    return item;
  });

  groupedFilterItems.value = items;

  form.value.cities = selectedItems.value;

  submitSearch();
};


const  isLoading = ref(false);
const {clearVacancies} = vacancyStore;
const router  = useRouter();
const submitSearch = () => {
  emit('onFormChange', 'regions', selectedItems.value);
}

const prepare = (items, custom_items) => {
  let filterItems = items;
  if (!items){
    filterItems = custom_items;
  }

  if (filterItems.length < 1){
    groupedFilterItems.value = [];
    return;
  }

  filterItems = filterItems.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  cities.value = filterItems;
  groupedFilterItems.value = [];
  cities.value.map((item, key) => {
    const firstLetter = item.name.charAt(0);
    if (key === 0){
      groupedFilterItems.value.push({
        id: firstLetter,
        name: firstLetter,
        is_header: true
      });
    }else{
      let prevFirstLetter;
      if (cities.value[key-1] !== undefined){
        prevFirstLetter = cities.value[key-1].name.charAt(0);
      }
      if (firstLetter !== prevFirstLetter){
        groupedFilterItems.value.push({
          id: firstLetter,
          name: firstLetter,
          is_header: true
        });
      }
    }

    groupedFilterItems.value.push({
      id: item.id,
      name: item.name,
      is_header: false,
      is_checked: selectedItems.value.includes(item.id)
    });
  });

};

const {getCities} = vacancyStore;
watch(() => vacancyStore.cities, prepare);
onMounted(async () => {
  if (vacancyStore.cities.length === 0 || parseInt(selectedRegion) !== parseInt(appliedRegion.value)){
    await getCities({region_ids: [selectedRegion]});
    appliedRegion.value = selectedRegion;
  }else{
    prepare(null, vacancyStore.cities);
  }
  if (selectedItems.value.length > 0){
    isMore.value = true;
  }
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