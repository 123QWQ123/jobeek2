<template>
  <div class="input-row input-row--checkboxes">
    <label>Подключенные сервисы</label>
    <div class="input-wrapper input-wrapper--flex">
      <div class="custom-check-wrap">
        <div class="theme-checker theme-checker--blue">
          <input type="checkbox" id="hh">
          <div class="theme-checker-ui">
            <div class="circle"> </div>
          </div>
        </div>
        <label for="hh"><img src="~/assets/img/logos/hhmini.svg"
                             alt="#"><span>Hh.ru</span></label>
      </div>
      <div class="custom-check-wrap">
        <div class="theme-checker theme-checker--blue">
          <input type="checkbox" id="sj" checked>
          <div class="theme-checker-ui">
            <div class="circle"> </div>
          </div>
        </div>
        <label for="sj"><img src="~/assets/img/logos/sj.svg" alt="#"><span>Superjob.ru
                                            </span></label>
      </div>
    </div>
  </div>
  <div class="input-row">
    <label for="search-words">Что искать</label>
    <div class="input-wrapper">
      <input type="text" id="search-words">
      <div class="prompt">Слова через запятую: найдутся вакансии, где встречается хотя бы
        одно из указанных слов. Слова через пробел: найдутся вакансии, где встречаются
        все указанные слова.</div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="do-not-show-date" checked>
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="do-not-show-date">Только в названии вакансий</label>
      </div>
    </div>
  </div>
  <div class="input-row">
    <label for="exclude-words">Исключать из названия вакансии</label>
    <div class="input-wrapper">
      <input type="text" id="exclude-words">
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>