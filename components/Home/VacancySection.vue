<template>
  <section class="vacancy-section section wrapper">
    <div class="section-head">
      <h2 class="section-title"> Вакансии в вашем городе</h2>
      <a class="more" href="#">
          Все <span> вакансии </span>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
          <path d="M19.75 12.2256L4.75 12.2256" stroke="#5375FD" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.7002 6.20124L19.7502 12.2252L13.7002 18.2502" stroke="#5375FD"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </div>
    <div class="swiper cards-slider">
      <ul class="vacancy-list swiper-wrapper">
        <li class="swiper-slide">
          <div class="vacancy-card">
            <div class="vacancy-card-body">
              <div class="company">
                <div class="company-logo"><img src="~/assets/img/logos/megafon.svg" alt="#"></div>
                <div class="company-name"> <strong>Мегафон</strong><span
                    class="location">Москва</span></div>
              </div><a class="vacancy-card-title" href="#">Специалист по недвижимости</a><span
                class="vacancy-card-dop-info">от 85 000 ₽ / месяц</span>
            </div>
            <div class="vacancy-card-footer">
                <a class="btn button-md" href="#">Откликнуться</a>
            </div>
          </div>
        </li>
        <li class="swiper-slide">
          <div class="vacancy-card">
            <div class="vacancy-card-body">
              <div class="company">
                <div class="company-logo"><img src="~/assets/img/logos/mts.svg" alt="#"></div>
                <div class="company-name"> <strong>МТС</strong><span
                    class="location">Москва</span></div>
              </div><a class="vacancy-card-title" href="#">Оператор Call-центра</a><span
                class="vacancy-card-dop-info">от 85 000 ₽ / месяц</span>
            </div>
            <div class="vacancy-card-footer">
                <a class="btn button-md" href="#">Откликнуться</a>
            </div>
          </div>
        </li>
        <li class="swiper-slide">
          <div class="vacancy-card">
            <div class="vacancy-card-body">
              <div class="company">
                <div class="company-logo"><img src="~/assets/img/logos/tele2.svg" alt="#"></div>
                <div class="company-name"> <strong>Теле2</strong><span
                    class="location">Москва</span></div>
              </div><a class="vacancy-card-title" href="#">Менеджер по продажам сим-карт в
              ...</a><span class="vacancy-card-dop-info">от 85 000 ₽ / месяц</span>
            </div>
            <div class="vacancy-card-footer">
                <a class="btn button-md" href="#">Откликнуться</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
</script>