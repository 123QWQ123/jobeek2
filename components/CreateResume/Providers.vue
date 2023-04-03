<template>
  <div class="carryover-box">
    <div class="carryover-box-label">Есть резюме на hh или SuperJob? Просто перенесите его!</div>
    <div class="import-grid">
      <div class="import-box">
        <div class="import-box-dvnld">
          <input type="file">
          <div class="logo"> <img src="~/assets/img/logos/hh.svg" alt="#">
            <div class="check"> <img src="~/assets/img/svg/complete.svg" alt="#"></div>
          </div><span>Импорт резюме с HeadHunters.ru   </span>
        </div>
        <div class="import-complete">
          <div class="logo logo-fake"> </div><span>Импортировано!</span>
          <button class="close" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9951 4.99512L5.00586 18.9843" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.0009 18.9928L5 4.98901" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="import-box import-is-complete">
        <div class="import-box-dvnld">
          <div class="logo"> <img src="~/assets/img/logos/sb.svg" alt="#">
            <div class="check"> <img src="~/assets/img/svg/complete.svg" alt="#"></div>
          </div><span>Импорт резюме с superjob.ru    </span>
        </div>
        <div class="import-complete">
          <div class="logo logo-fake"> </div><span>Импортировано! </span>
          <button class="close" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9951 4.99512L5.00586 18.9843" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.0009 18.9928L5 4.98901" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>

</style>