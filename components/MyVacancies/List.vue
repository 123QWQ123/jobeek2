<template>
    <PageLoader v-if="isLoading" />
  <div class="wrapper wrapper-1290">
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
      <NuxtLink class="create-button" type="link" :to="{name: 'create-vacancy'}" >Создать вакансию</NuxtLink>

      <h1 ref="filterRef" class="lk-page-title mt-4">Ваши вакансии({{ my_total }})</h1>

      <div class="row d-flex ">

        <MyVacanciesTabs></MyVacanciesTabs>

      </div>
      <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="all" role="tabpanel">
              <div class="resume-list-container pt-3" >
                  <div class="col d-flex justify-content-between" >
                      <!--              <div class="d-inline-flex">-->
                      <!--                  <form class="sort mx-1" action="#">-->
                      <!--                      <span>Поиск:</span>-->
                      <!--                      <input class="form-control" placeholder="По название" type="search" @keyup="onInput" v-model="form.name"/>-->
                      <!--                  </form>-->
                      <!--              </div>-->
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
                  <ul class="resume-list mt-4">
                      <MyVacanciesItem v-for="item in my_vacancies" :key="item.id" :item="item"></MyVacanciesItem>
                  </ul>

                  <div class="d-flex mt-4 justify-content-between">
                      <button class="btn btn-primary btn-group-sm" :class="{disabled: isPrevDisabled}"  @click="prevPage">Prev</button>
                      <p>{{current_page}}</p>
                      <button class="btn btn-primary btn-group-sm" @click="nextPage">Next</button>
                  </div>
              </div>
          </div>
          <div class="tab-pane fade  " id="active" role="tabpanel">
          </div>
          <div class="tab-pane fade" id="archived" role="tabpanel" aria-labelledby="profile-tab">...</div>
      </div>
  </div>
</template>

<script setup>

import Swal from "sweetalert2";

useHead({
    title: "Jobeek - Мои вакансии"
})
import {useVacancyStore} from "../../store/vacancy";
import {storeToRefs} from "pinia";
import PageLoader from "~/components/UI/PageLoader.vue";
import {useMyVacancyForm} from "~/composables/useMyVacancyForm";
import CustomSelect from "~/components/UI/CustomSelect.vue";
import {useMyVacancySortingOptions} from "~/composables/useMyVacancySortingOptions";
import {useMyVacancyPerPageOptions} from "~/composables/useMyVacancyPerPageOptions";



const router = useRouter();
const vacancyStore = useVacancyStore();
const {getMyVacancies} = vacancyStore;

const sortingOptions = ref(useMyVacancySortingOptions());
const perPageOptions = ref(useMyVacancyPerPageOptions());

const {my_vacancies, current_page, my_total} = storeToRefs(vacancyStore);

const isPrevDisabled = computed(() => {
  if (parseInt(current_page.value) === 1) return true;
  return false;
})
const form = ref(useMyVacancyForm());
const vacancies = ref([]);
const isLoading = ref(true);
onMounted(async() => {
    const params = useMyVacancyForm(form.value, 'backend');
    await getMyVacancies(params);
    isLoading.value = false;
})

watch(() => vacancyStore.my_vacancies, (newMyVacancies) => {
    vacancies.value = newMyVacancies;
})

const filterRef = ref();

const onInput = async(page) => {
    isLoading.value = true;
    const params = useMyVacancyForm(form.value, 'backend');
    await getMyVacancies({...params});
    isLoading.value = false;
}


const prevPage = async(page) => {
    isLoading.value = true;
    const params = useMyVacancyForm(form.value, 'backend');
    let page_number = parseInt(current_page.value);
    if(page_number > 1){
        form.value.page = form.value.page - 1;
    }
    await getMyVacancies(params);
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
    const response = await getMyVacancies(params);
    console.log(response.data.items)
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
    await getMyVacancies(params);
    isLoading.value = false;
    form.value.page = 1;
    current_page.value = form.value.page;
}

const onChangeSorting = async(sorting) => {
    isLoading.value = true;
    form.value.order_by = sorting;
    const params = useMyVacancyForm(form.value, 'front');
    await getMyVacancies(params);
    isLoading.value = false;

}

const listStyles = {
    'left': 'unset',
    'right': 0,
    'width': 'auto !important'
}
</script>

<style scoped>

</style>