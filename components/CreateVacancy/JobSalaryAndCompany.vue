<template>
  <div class="input-row">
    <label for="income">Какой ЗП вы предложите (₽)?</label>
    <div class="row-container">
      <div class="c2">
        <div class="input-wrapper">
          <input type="text" id="income">
        </div>
        <div class="tbs-row">
          <ul>
            <li>
              <div class="tab-btn">
                <input type="radio" name="income" id="any" checked>
                <div class="mask"><span>Любая</span></div>
              </div>
            </li>
            <li>
              <div class="tab-btn">
                <input type="radio" name="income" id="month">
                <div class="mask"><span>Месяц</span></div>
              </div>
            </li>
            <li>
              <div class="tab-btn">
                <input type="radio" name="income" id="day">
                <div class="mask"><span>День</span></div>
              </div>
            </li>
            <li>
              <div class="tab-btn">
                <input type="radio" name="income" id="hour">
                <div class="mask"> <span>Час </span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
<!--  <div class="input-row">-->
<!--    <label for="company">Компания</label>-->
<!--    <div class="input-wrapper">-->
<!--      <input type="text" id="company">-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>

</script>

<style scoped>

</style>