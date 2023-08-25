<template>
  <li>
    <div class="favorites-card">
      <div class="favorites-card-head">
        <div class="company">
          <div class="company-logo">
            <img src="~/assets/img/logos/megafon.svg" alt="#" />
          </div>
          <div class="company-name">
            <a href="#"> Продавец-консультант и рабоник зала</a
            ><span class="count">Мегафон</span>
          </div>
        </div>
        <div class="salary">От 1 000 000 ₽</div>
      </div>
      <div class="favorites-card-body">
        <div class="time-location">
          <span>9:55</span><strong>Москва</strong>
        </div>
        <p>
          Торговая сеть «Перекрёсток» – объединяем лучших! <br />«Перекрёсток»
          предлагает покупателям только лучшее, потому что у нас сильная команда
          профессионалов!Наши сотрудники - самая большая ценность для компании.
          Мы предлагаем стабильную работу и открываем все возможности, чтобы
          вместе развиваться и двигаться вперёд.
        </p>
      </div>
      <div class="favorites-card-footer">
        <div class="favorites-card-footer-row telephones-row">
          <ul>
            <li>
              <a class="tel" href="tel: +7 800 550 11 00">
                <img src="~/assets/img/svg/carbon_phone.svg" alt="#" />+7 800
                550 11 00
              </a>
            </li>
            <li>
              <a class="tel" href="tel: +7 800 550 11 00">
                <img src="~/assets/img/svg/carbon_phone.svg" alt="#" />+7 800
                550 11 00
              </a>
            </li>
            <li>
              <a class="tel" href="tel: +7 800 550 11 00">
                <img
                  src="~/assets/img/svg/akar-icons_whatsapp-fill.svg"
                  alt="#"
                />+7 800 550 11 00
              </a>
            </li>
          </ul>
        </div>
        <div class="favorites-card-footer-row">
          <div class="group">
            <button class="group-action btn button-md">Откликнуться</button>
          </div>
          <div class="group">
            <button
              class="group-action ic-btn fav-btn"
              :class="{ active: isFavoured }"
              @click="isFavoured = !isFavoured"
            >
              <svg
                width="23"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0641 0.796788C11.2552 0.45665 11.7448 0.456649 11.9359 0.796789L14.7993 5.89364C15.0135 6.27499 15.3835 6.54383 15.8124 6.62973L21.5446 7.77794C21.9272 7.85457 22.0785 8.32027 21.8141 8.60711L17.8515 12.9053C17.555 13.2269 17.4137 13.6619 17.4645 14.0964L18.1439 19.9029C18.1892 20.2903 17.793 20.5782 17.4385 20.4153L12.1262 17.9749C11.7287 17.7923 11.2713 17.7923 10.8738 17.9749L5.56148 20.4153C5.20696 20.5782 4.81081 20.2903 4.85614 19.9029L5.53549 14.0964C5.58632 13.6619 5.44498 13.2269 5.1485 12.9053L1.18593 8.60711C0.921493 8.32027 1.07281 7.85457 1.45535 7.77794L7.18757 6.62973C7.61645 6.54383 7.98648 6.27499 8.20072 5.89364L11.0641 0.796788Z"
                  stroke="#C8C8C8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
const isFavoured = ref(true);
</script>

<style scoped>
</style>