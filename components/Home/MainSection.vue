<template>
  <div class="main-section">
    <div class="wrapper wrapper--xl">
      <div class="main-section-title">
        <h1 class="title">Поиск вакансий</h1><span>Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Id.</span>
      </div>
      <form class="search-form" @submit.prevent="onSearchSubmit" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label">
            <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
            <label for="name">Названии вакансии </label>
            <input type="text"
                   v-model="form.name"
                   name="name" id="name"
                   placeholder="Какую вакансию вы ищете?"
                   autocomplete="off" />
          </div>
          <div class="input-wrap has-label">
            <label for="salary">Желаемая зарплата</label>
            <SalarySelectInForm v-model="form.salary" @change="onChange"></SalarySelectInForm>
          </div>
          <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
            <input v-model="form.city" type="text" name="city" placeholder="Город" autocomplete="off">
          </div>

          <div class="input-wrap has-icon">
            <img class="icon" src="~/assets/img/svg/location.svg" alt="#" />
            <input v-model="region" type="text" name="region" placeholder="Регион" autocomplete="off" />
          </div>
          <button class="button-accent submit-search-form" type="submit">Поиск </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>

  import SalarySelectInForm from "../Header/SalarySelectInForm";
  import {useVacancyForm} from "../../composables/useVacancyForm";

  const form = ref(useVacancyForm());
  const onChange = (e) => {
    console.log(e)
  }
  const onSelect = (e) => {
    console.log(e)
  }

  const region = ref(null);
  const router = useRouter();
  const route = useRoute();

  const regionOptions = ref([]);

  onMounted(() => {
  })

  const onSearchSubmit = (e) => {
    router.push({name: 'search-vacancies', query: form.value});
  }
</script>