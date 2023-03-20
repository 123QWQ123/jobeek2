<template>
  <div class="input-row">
    <label>Занятость</label>
    <div class="checkboxes-row input-row--checkboxes">
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="full">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="full">Полная</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="changeable">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="changeable">Сменная</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="incomplete-distance">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="incomplete-distance">Неполная дистанционная</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="incomplete">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="incomplete">Неполная</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="rotational">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="rotational">Вахтовая</label>
      </div>
    </div>
  </div>
  <div class="input-row">
    <label for="remote-work">Удаленная работа</label>
    <div class="input-wrapper"><select class="d-select" name="remote-work" id="remote-work">
      <option data-display=""></option>
      <option value="1">Статус привитого</option>
      <option value="2">Another option</option>
      <option value="3" disabled>A disabled option</option>
      <option value="4">Potato</option>
    </select>
    </div>
  </div>
  <div class="input-row input-row--checkboxes">
    <label>Тип вакансии</label>
    <div class="checkboxes-row input-row--checkboxes">
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="video">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="video">Видеовакансии</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="no-experience">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="no-experience">Опыт не требуется</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="not-requiring-higher-education">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="not-requiring-higher-education">Не требующие высшего
          образования</label>
      </div>
    </div>
  </div>
  <div class="input-row input-row--checkboxes">
    <label>Наличие водительских прав</label>
    <div class="checkboxes-row">
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="A">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="A">А - мотоциклы</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="B">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="B">В - легковые авто</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="C">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="C">С - грузовые авто</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="D">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="D">D - Автобусы</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="E">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="E">E - Авто с прицепом</label>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>