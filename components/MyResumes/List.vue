<template>
  <div class="wrapper wrapper-1290">
    <PageLoader v-if="isLoading" />

    <div class="notification mt-0">
        <div class="ic">
          <img src="~/assets/img/svg/crown2.svg" alt="#" />
        </div>
        <div class="notification-text">
          <strong class="title">Подключите премиум</strong>
          <p>
            У вас стоит лимит на создание подписок: 3 шт. Чтобы создавать
            неограниченное кол-во подписок, подключите премиум
          </p>
        </div>
        <a class="notification-button button-accent" href="#">Подключить </a>
      </div>
      <NuxtLink class="create-button" type="link" :to="{name: 'create-resume'}" >Создать резюме</NuxtLink>



    <div class="col d-flex justify-content-between mt-4" >
      <h1 ref="filterRef" class="lk-page-title mt-4">Ваши резюме({{ my_total }})</h1>

<!--      {{providers}}-->
<!--      <div class="d-inline-flex">-->
<!--        <div class="option-group selector-group">-->
<!--          <div class="option" @click="onProviderToggle('hh')">-->
<!--            <div class="custom-check-wrap">-->
<!--              <div class="theme-checker theme-checker&#45;&#45;blue">-->
<!--                <input type="checkbox" id="hh" :checked="providers.hh" />-->
<!--                <div class="theme-checker-ui">-->
<!--                  <div class="circle" :class="{'right' : providers.hh, 'left': !providers.hh}"></div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <label for="hh"-->
<!--              ><img-->
<!--                  src="~/assets/img/logos/hhmini.svg"-->
<!--                  alt="#"-->
<!--              /><span>Hh.ru</span></label-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="option" @click="onProviderToggle('superjob')">-->
<!--            <div class="custom-check-wrap">-->
<!--              <div class="theme-checker theme-checker&#45;&#45;blue">-->
<!--                <input type="checkbox" id="sj" :checked="providers.superjob" />-->
<!--                <div class="theme-checker-ui">-->
<!--                  <div class="circle" :class="{'right' : providers.superjob, 'left': !providers.superjob}"></div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <label for="sj"-->
<!--              ><img src="~/assets/img/logos/sj.svg" alt="#" /><span-->
<!--              >Superjob.ru-->
<!--                          </span></label-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="col d-flex justify-content-between align-items-center " >
        <div class="d-inline-flex">

          <form class="sort mx-2 ms-auto" action="#">
            <span>Поставщик:</span>
            <CustomSelect :options="providerOptions" v-model="form.provider" @change="onProviderChange" class="bg-white w-auto" :listStyles="listStyles"></CustomSelect>
          </form>
          <form class="sort mx-2 ms-auto" action="#">
            <span>Фильтр:</span>
            <CustomSelect :options="filterOptions" v-model="form.status" @change="onFilterChange" class="bg-white w-auto" :listStyles="listStyles"></CustomSelect>
          </form>
        </div>

        <div class="d-inline-flex">
          <form class="sort mx-1" action="#">
            <span>Показать:</span>
            <CustomSelect v-model="form.per_page" :options="perPageOptions" @change="onChangePerPage" class="bg-white w-auto" :listStyles="listStyles"></CustomSelect>
          </form>
          <form class="sort mx-1" action="#">
            <span>Сортировать:</span>
            <CustomSelect v-model="form.order_by" :options="sortingOptions" @change="onChangeSorting" class="bg-white w-auto" :listStyles="listStyles"></CustomSelect>
          </form>
        </div>
      </div>
      <ul class="resume-list mt-4" v-if="my_total > 0">
        <MyResumesItem v-for="item in my_resumes" :key="item.id" :item="item"></MyResumesItem>
      </ul>
      <div class="d-flex mt-4 pb-4 justify-content-center" v-else>
        <p>Ничего не найдено!</p>
      </div>
      <div class="d-flex mt-4 justify-content-between pb-4" v-if="my_total > 0">
        <button class="btn btn-primary btn-group-sm" :class="{disabled: isPrevDisabled}"  @click="prevPage">Prev</button>
        <p>{{current_page}}</p>
        <button class="btn btn-primary btn-group-sm" @click="nextPage">Next</button>
      </div>
    </div>
</template>

<script setup>

import Swal from "sweetalert2";

useHead({
    title: "Jobeek - Мои вакансии"
})
import {storeToRefs} from "pinia";
import PageLoader from "~/components/UI/PageLoader.vue";
import {useMyVacancyForm} from "~/composables/useMyVacancyForm";
import CustomSelect from "~/components/UI/CustomSelect.vue";
import {useMyVacancySortingOptions} from "~/composables/useMyVacancySortingOptions";
import {useMyVacancyPerPageOptions} from "~/composables/useMyVacancyPerPageOptions";
import {useMyVacanciesFilterOptions} from "../../composables/useMyVacanciesFilterOptions";
import {useResumeStore} from "~/store/resume";

const router = useRouter();
const resumeStore = useResumeStore();
const {getMyResumes} = resumeStore;

const sortingOptions = ref(useMyVacancySortingOptions());
const perPageOptions = ref(useMyVacancyPerPageOptions());
const filterOptions = ref(useMyVacanciesFilterOptions());
const providerOptions = ref([
  {value: '*', name: 'Все'},
  {value: 'hh', name: 'HeadHunter'},
  {value: 'superjob', name: 'Superjob'},
]);


const {my_resumes, current_page, my_total} = storeToRefs(resumeStore);

const isPrevDisabled = computed(() => {
  if (parseInt(current_page.value) === 1) return true;
  return false;
})
const form = ref(useMyVacancyForm());

const providers = ref({
  hh: true,
  superjob: true
})

const onProviderToggle = (provider) => {
  providers.value[provider] = !providers.value[provider];
}

const resumes = ref([]);
const isLoading = ref(true);
onMounted(async() => {
    const params = useMyVacancyForm(form.value, 'backend');
    await getMyResumes(params);
    isLoading.value = false;
})

watch(() => resumeStore.my_resumes, (newMyResumes) => {
    resumes.value = newMyResumes;
});

const hhFilters = ['active', 'archived', 'deleted'];
const superjobFilters = ['active', 'private', 'published', 'archived', 'declined', 'in_moderation'];


function getCommon(arr1, arr2) {
  let common = [];                   // Array to contain common elements
  for(let i=0 ; i<arr1.length ; ++i) {
    for(let j=0 ; j<arr2.length ; ++j) {
      if(arr1[i] == arr2[j]) {       // If element is in both the arrays
        common.push(arr1[i]);        // Push to common array
      }
    }
  }

  return common;                     // Return the common elements
}

watch(providers.value, (newProviders) => {
  let prevItems = useMyVacanciesFilterOptions();

  const commonStates = getCommon(hhFilters, superjobFilters);

  if (newProviders.superjob === false && newProviders.hh === false){
    prevItems = [];
  }
  if (newProviders.superjob === false && newProviders.hh === true){
    prevItems = prevItems.filter(item => hhFilters.includes(item.value)  || commonStates.includes(item.value));
  }
  if (newProviders.superjob === true && newProviders.hh === false){
    prevItems = prevItems.filter(item => superjobFilters.includes(item.value) || commonStates.includes(item.value));
  }
  filterOptions.value = prevItems;
})
watch(filterOptions, (newFilterOptions) => {


  if (newFilterOptions.length > 0){
    const findItem = newFilterOptions.some(item => item.value === form.value.status);
    if (!findItem){
      onFilterChange(newFilterOptions[0].value);
    }
  }
})

const filterRef = ref();

const onInput = async(page) => {
    isLoading.value = true;
    const params = useMyVacancyForm(form.value, 'backend');
    await getMyResumes({...params});
    isLoading.value = false;
}


const prevPage = async(page) => {
    isLoading.value = true;
    const params = useMyVacancyForm(form.value, 'backend');
    let page_number = parseInt(current_page.value);
    if(page_number > 1){
        form.value.page = form.value.page - 1;
    }
    await getMyResumes(params);
    current_page.value = form.value.page;
    isLoading.value = false;
    filterRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
}

const nextPage = async(page) => {
    isLoading.value = true;
    isLoading.value = true;
    form.value.page = form.value.page + 1;
    current_page.value = form.value.page;
    const params = useMyVacancyForm(form.value, 'front');
    const response = await getMyResumes(params);
    if (response?.data?.items.length === 0){
      Swal.fire({
        title: 'Больше нет вакансий',
        text: response.message,
        icon: 'success',
        confirmButtonText: 'ОК'
      });
    }
    isLoading.value = false;
    filterRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
}

const onChangePerPage = async(per_page) => {
    isLoading.value = true;
    form.value.per_page = per_page;
    const params = useMyVacancyForm(form.value, 'front');
    await getMyResumes(params);
    isLoading.value = false;
    form.value.page = 1;
    current_page.value = form.value.page;
}

const onChangeSorting = async(sorting) => {
    isLoading.value = true;
    form.value.order_by = sorting;
    const params = useMyVacancyForm(form.value, 'front');
    await getMyResumes(params);
    isLoading.value = false;

}
const onFilterChange = async(filter) => {
    isLoading.value = true;
    form.value.status = filter;
    const params = useMyVacancyForm(form.value, 'front');
    await getMyResumes(params);
    isLoading.value = false;
}
const onProviderChange = async(provider) => {
    form.value.provider = provider;
    if (provider === '*'){
      providers.value.hh = true;
      providers.value.superjob = true;
    }
    if (provider === 'hh'){
      providers.value.hh = true;
      providers.value.superjob = false;
    }
    if (provider === 'superjob'){
      providers.value.hh = false;
      providers.value.superjob = true;
    }
    // const params = useMyVacancyForm(form.value, 'front');
    // await getMyVacancies(params);
    // isLoading.value = false;
}

const listStyles = {
    'left': 'unset',
    'right': 0,
    'width': 'auto !important'
}
</script>

<style scoped>

.theme-checker input ~ .theme-checker-ui .circle.left{
  transform: translate(3px, -50%);
}
.theme-checker input ~ .theme-checker-ui .circle.right{
  transform: translate(30px, -50%);
}

.sort .d-select{
  background: #F5F8FA !important;
}
</style>