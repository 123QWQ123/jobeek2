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
            <label for="salary">Желаемая зарплата </label><select class="n-select" name="salary"
                                                                  id="salary">
            <option data-display="Выберите зарплату">Nothing</option>
            <option value="1">Some option</option>
            <option value="2">Another option</option>
            <option value="3" disabled>A disabled option</option>
            <option value="4">Potato</option>
          </select>
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

</script>

<style scoped>

</style>