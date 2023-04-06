<template>
  <div class="main-section">
    <div class="wrapper wrapper--xl">
      <div class="main-section-title">
        <h1 class="title">Поиск вакансий</h1><span>Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Id.</span>

      </div>
      <SearchForm/>
    </div>
  </div>
</template>
<script setup>

  import {useVacancyForm} from "../../composables/useVacancyForm";
  import Vacancies from "../../pages/search/vacancies";

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
    const params = useVacancyForm(form.value, 'front');
    console.log(params);
    router.push({name: 'search-vacancies', query: params});
  }
</script>