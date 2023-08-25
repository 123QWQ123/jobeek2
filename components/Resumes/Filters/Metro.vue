<template>
  <div class="filter-box" :class="{'open': filterClass}">
    <div class="filter-box-handle" @click="filterClass = !filterClass">
      <strong>Метро</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#">
    </div>

    <div v-if="isMore" class="filter-box-body " >
      <div class="search_area">
        <input type="search" v-model="search" @keyup.prevent="onSearch" @input="onSearch">
      </div>
      <div class="check-block-list with_scroll" :class="{'all-visible': isMore}">
        <div class="check-block" v-for="item in selectedRegionItems">
          <div class="checkbox">
            <input type="checkbox" :checked="true" @change="toggleRegion(item.id)">
            <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <span class="rounded_circle" :style="{backgroundColor: '#' + item.color}"></span>
          <div class="l-wrap">
            <label>{{item.name}}</label>
          </div>
        </div>
      </div>
      <div class="check-block-list with_scroll" :class="{'all-visible': isMore}">
        <div class="check-block" v-for="item in groupedFilterItems" :class="{'is_header': item.is_header}">
          <div class="checkbox" v-if="!item.is_header">
            <input type="checkbox" :checked="item.is_checked" @change="toggleRegion(item.id)">
            <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
          </div>
          <span class="rounded_circle"  v-if="!item.is_header" :style="{backgroundColor: '#' + item.color}"></span>
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
          <span class="rounded_circle" v-if="!item.is_header" :style="{backgroundColor: '#' + item.color}"></span>
          <div class="l-wrap" v-if="!item.is_header">
            <label>{{item.name}}</label>
          </div>
        </div>
      </div>
      <button class="more-filters" data-default-text="Еще 25" data-hide-text="Показат" @click="toggleMore" v-if="total > 0">
        Еще {{ total }}
      </button>
    </div>
  </div>
</template>

<script setup>
import useSort from "~/composables/useSort";

const {selectedCountry} = defineProps(['selectedCountry']);
const emit = defineEmits(['onFormChange'])
import {useVacancyStore} from "../../../store/vacancy";
import {useVacancyForm} from "../../../composables/useVacancyForm";

const vacancyStore = useVacancyStore();

const appliedCountry = ref(1);
const search = ref("");
const metros = ref([]);
// watch(metros, (newValue) => console.log(newValue));

const total = computed(() => {
  if (metros.value.length > 5){
    return metros.value.length - 5;
  }else{
    return 0;
  }
});
const filterClass = ref(true);
const isMore = ref(false);
const groupedFilterItems = ref([]);
const selectedRegionItems = ref([]);

const form = ref(useVacancyForm());
const selectedItems = ref(form.value.metros);

const toggleMore = () => isMore.value = !isMore.value;
const onSearch = (e) => {
  const search = e.target.value;
  let items = [];
  if (search != ''){
    items = vacancyStore.metros.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

  }else{
    items = vacancyStore.metros.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  selectedItems.value = items;
  prepare(items);
};


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

  form.value.metros = selectedItems.value;

  submitSearch();
};


const  isLoading = ref(false);
const {clearVacancies} = vacancyStore;
const router  = useRouter();
const submitSearch = () => {
  emit('onFormChange', 'metros', selectedItems.value);
}

const {sort} = useSort();
const prepare = (items, custom_items) => {

  let filterItems = items;
  if (!items){
    filterItems = custom_items;
  }

  if (filterItems.length < 1){
    groupedFilterItems.value = [];
    return;
  }

  filterItems = sort(filterItems, {by: 'alpha'});

  metros.value = filterItems;
  groupedFilterItems.value = [];
  metros.value.map((item, key) => {
    const firstLetter = item.name.charAt(0);
    if (key === 0){
      groupedFilterItems.value.push({
        id: firstLetter,
        name: firstLetter,
        color: item.color,
        is_header: true
      });
    }else{
      let prevFirstLetter;
      if (metros.value[key-1] !== undefined){
        prevFirstLetter = metros.value[key-1].name.charAt(0);
      }
      if (firstLetter !== prevFirstLetter){
        groupedFilterItems.value.push({
          id: firstLetter,
          name: firstLetter,
          color: item.color,
          is_header: true
        });
      }
    }

    groupedFilterItems.value.push({
      id: item.id,
      name: item.name,
      color: item.color,
      is_header: false,
      is_checked: selectedItems.value.includes(item.id)
    });
  });

};

const {getMetros} = vacancyStore;
watch(() => vacancyStore.metros, prepare);
onMounted(async () => {
  if (vacancyStore.metros.length === 0){
    await getMetros({country_id: selectedCountry});
    appliedCountry.value = selectedCountry;
  }else{
    prepare(null, vacancyStore.metros);
  }
  if (selectedItems.value.length > 0){
    isMore.value = true;
  }
});


</script>

<style setup>
.check-block{
  display: flex;
  align-items: center;
}
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

.rounded_circle{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #5c636a;
  margin-right: 3px;
}
</style>