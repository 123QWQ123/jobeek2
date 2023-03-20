<template>
  <div class="main-section main-section-mob">
    <div class="wrapper wrapper--xl">
      <form class="search-form" action="#" role="form" autocomplete="off">
        <div class="search-row">
          <div class="input-wrap has-icon has-label"><img class="icon" src="~/assets/img/svg/search.svg"
                                                          alt="#">
            <label for="name">Названии вакансии </label>
            <input type="text" name="name" id="name" placeholder="Какую вакансию вы ищете?"
                   autocomplete="off">
          </div>
          <div class="input-wrap has-label">
            <label for="salary">Желаемая зарплата </label>
<!--            <HeaderSalarySelectInForm @change="onChange"></HeaderSalarySelectInForm>-->
          </div>
          <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
            <input type="text" name="city" placeholder="Город" autocomplete="off">
          </div>
          <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
            <input type="text" name="country" placeholder="Страна" autocomplete="off">
          </div>
          <button class="button-accent submit-search-form" type="submit">Поиск </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>

const onChange = () => {

}
</script>

<style scoped>

</style>