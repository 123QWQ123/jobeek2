<template>
  <div class="filter-box" :class="{'open': regionFilterClass}">
    <div class="filter-box-handle" @click="regionFilterClass = !regionFilterClass">
      <strong>Регион</strong>
      <img src="~/assets/img/svg/Arrow-Down.svg" alt="#">
    </div>

    <div v-if="isMore" class="filter-box-body " >
      <div class="search_area">
        <input type="search" v-model="search" @keyup.prevent="onSearch" @input="onSearch">
      </div>
      <div class="check-block-list with_scroll" :class="{'all-visible': isMore}">
        <div class="check-block" v-for="item in groupedRegions" :class="{'is_header': item.is_header}">
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
        <div class="check-block" v-for="item in groupedRegions">
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
        Еще {{ totalRegions }}
      </button>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "../../../store/vacancy";
import {useVacancyForm} from "../../../composables/useVacancyForm";

const vacancyStore = useVacancyStore();

const {getRegions} = vacancyStore;

const search = ref("");
const regions = ref([]);

const totalRegions = computed(() => regions.value.length - 5);
const regionFilterClass = ref(true);
const isMore = ref(false);
const groupedRegions = ref([]);

const toggleMore = () => isMore.value = !isMore.value;
const onSearch = (e) => {
  const search = e.target.value;
  let regionItems = [];
  if (search != ''){
    regionItems = vacancyStore.regions.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

  }else{
    regionItems = vacancyStore.regions.filter((item, key) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  groupedRegions.value = regionItems;
  prepareRegions(regionItems);
};

const form = ref(useVacancyForm());
const selectedRegions = ref(form.value.regions);

const toggleRegion = (id) => {
  const regionItems = groupedRegions.value.map((item, key) => {
    if(item.id === id){
      item.is_checked = !item.is_checked;
      if (!selectedRegions.value.includes(item.id) && item.is_checked){
        selectedRegions.value.push(item.id);
      }else{
        if (selectedRegions.value.includes(item.id) && item.is_checked === false){
          selectedRegions.value = selectedRegions.value.filter(sub => sub !== item.id);
        }
      }
      return item;
    }
    return item;
  });

  groupedRegions.value = regionItems;

  form.value.regions = selectedRegions.value;

  submitSearch();
};


const  isLoading = ref(false);
const {clearVacancies} = vacancyStore;
const router  = useRouter();
const submitSearch = () => {
  isLoading.value = true;
  clearVacancies();
  const params = useVacancyForm(form.value, 'front');
  router.replace({name: 'search-vacancies', query: params});
  isLoading.value = false;
}

const prepareRegions = (items, custom_items) => {

  let regionItems = items;
  if (!items){
    regionItems = custom_items;
  }

  if (regionItems.length < 1){
    groupedRegions.value = [];
    return;
  }

  regionItems = regionItems.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  regions.value = regionItems;
  groupedRegions.value = [];
  regions.value.map((item, key) => {
    const firstLetter = item.name.charAt(0);
    let nextFirstLetter;
    if (regions.value[key+1] !== undefined){
      nextFirstLetter = regions.value[key+1].name.charAt(0);
    }
    if (key === 0){
      groupedRegions.value.push({
        id: firstLetter,
        name: firstLetter,
        is_header: true
      });
    }

    if (firstLetter !== nextFirstLetter){
      groupedRegions.value.push({
        id: firstLetter,
        name: firstLetter,
        is_header: true
      });
    }
    groupedRegions.value.push({
      id: item.id,
      name: item.name,
      is_header: false,
      is_checked: selectedRegions.value.includes(item.id)
    });
  });

};

watch(() => vacancyStore.regions, prepareRegions);
onMounted(async () => {
  await getRegions();
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