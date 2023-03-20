<template>
  <form class="search-form" @submit.prevent="onSearchSubmit" role="form" autocomplete="off">
    <div class="wrapper">
      <div class="search-row">
        <div class="input-wrap has-icon has-label"><img class="icon" src="~/assets/img/svg/search.svg" alt="#">
          <label for="name">Названии вакансии </label>
          <input v-model="form.keyword" type="text" name="name" id="name" placeholder="Какую вакансию вы ищете?"
                 autocomplete="off">
        </div>
        <div class="input-wrap has-label">
          <label for="salary">Желаемая зарплата </label>
          <HeaderSalarySelectInForm v-model="form.salary"></HeaderSalarySelectInForm>
        </div>
        <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
          <input v-model="form.city" type="text" name="city" placeholder="Город" autocomplete="off">
        </div>
        <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
          <input v-model="form.country" type="text" name="country" placeholder="Страна" autocomplete="off">
        </div>
        <button class="button-accent submit-search-form" type="submit">Поиск </button>
      </div>
    </div>
  </form>
</template>

<script setup>

const onChange = (data) => {
  console.log(data);
}
const form = ref({
  keyword: "",
  city: "",
  country: "",
  salary: "0",
})

const router = useRouter();
const route = useRoute();

onMounted(() => {
  form.value = {...route.query};
})

const onSearchSubmit = (e) => {
  console.log(form.value);
  router.push({name: 'search-vacancies', query: form.value});
}
</script>

<style scoped>

</style>