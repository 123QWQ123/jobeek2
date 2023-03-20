<template>
  <form class="search-form search-form--widget" action="#" role="form" autocomplete="off" @submit.prevent="onSubmit">
    <div class="search-row">
      <div v-if="isEmployer" class="input-wrap has-icon has-label"><img class="icon" src="~/assets/img/svg/search.svg" alt="#">
        <input type="text" name="name" id="keyword" placeholder="Какой специалист вы ищете?" autocomplete="off">
      </div>
      <div v-else class="input-wrap has-icon has-label"><img class="icon" src="~/assets/img/svg/search.svg" alt="#">
        <input type="text" name="name" id="keyword" placeholder="Какую вакансию вы ищете?" autocomplete="off">
      </div>
      <HeaderSalarySelectInForm v-model="form.salary" @change="onChange"></HeaderSalarySelectInForm>
      <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
        <input type="text" name="city" placeholder="Город" autocomplete="off">
      </div>
      <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
        <input type="text" name="country" placeholder="Страна" autocomplete="off">
      </div>
      <button class="button-xl submit-search-form" type="submit">Поиск   </button>
    </div>
  </form>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";
import {navigateTo} from "nuxt/app";

const auth = useAuthStore();
const { logout, toggleUserMode } = auth;

const isEmployer = computed(() => auth.isEmployer);

const form = ref({
  keyword: "",
  city: "",
  country: "",
  salary: "0",
})
const onChange = (e) => {
  console.log(e)
}
const onSelect = (e) => {
  console.log(e)
}

const onSubmit  = (e) => {
  console.log(e);

  if (isEmployer.value){
    navigateTo({name: 'search-resumes', query: {...form.value}});
  }else{
    navigateTo({name: 'search-vacancies', query: {...form.value}});
  }
}

const router = useRouter();
const route = useRoute();

onMounted(() => {
  const query = route.query;
  if (!query.hasOwnProperty('salary')) query.salary = "0";
  form.value = {...route.query};
})
</script>

<style scoped>

</style>