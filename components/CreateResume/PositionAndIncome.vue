<template>
  <div class="w-box w-box--main w-box-position">
    <div class="w-box-head">
      <h3 class="title">Должность и доход</h3>
    </div>
    <div class="w-box-body">
      <div class="input-row">
        <label for="position">Какую должность вы хотите занимать? <b>*</b></label>
        <div class="input-wrapper">
          <input type="text" placeholder="Укажите должность" id="position" required>
        </div>
      </div>
        <CreateResumeSalary/>
      <div class="input-row">
        <label for="employment">Занятость <b>*</b></label>
        <div class="input-wrapper"><select class="d-select" name="employment" id="employment">
          <option data-display="Выберите занятость">Nothing</option>
          <option value="1">Some option</option>
          <option value="2">Another option</option>
          <option value="3" disabled>A disabled option</option>
          <option value="4">Potato</option>
        </select>
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="remote" checked>
              <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
            </div>
            <label for="remote">Ищу удаленную работу</label>
          </div>
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="no-trips">
              <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
            </div>
            <label for="no-trips">Не готов к командировкам</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CreateResume from "~/pages/create-resume.vue";
</script>

<style scoped>

</style>