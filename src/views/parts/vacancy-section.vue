<template>
  <section class="vacancy-section section wrapper">
    <div class="section-head">
      <h2 class="section-title"> Вакансии в вашем городе</h2><a class="more" href="#">
      Все <span>вакансии</span><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.75 12.2256L4.75 12.2256" stroke="#5375FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M13.7002 6.20124L19.7502 12.2252L13.7002 18.2502" stroke="#5375FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg></a>
    </div>
    <div class="swiper cards-slider">
      <ul  class="vacancy-list swiper-wrapper">
        <li v-for="vacancy in vacancies" :key="vacancy.title"  class="swiper-slide">
          <div class="vacancy-card">
            <div class="vacancy-card-body">
              <div class="company">
                <div class="company-logo"><img v-if="vacancy.employer.logo_urls" :src="vacancy.employer.logo_urls['90']" alt="#"></div>
                <div class="company-name"> <strong>{{ vacancy.employer.name }}</strong><span class="location">{{ vacancy.area.name }}</span></div>
              </div><a class="vacancy-card-title" href="#">{{ vacancy.title }}</a>
              <span class="vacancy-card-dop-info">
                  от {{ vacancy.salary.from || vacancy.salary.to }} {{ vacancy.salary.currency === 'RUR' ? '₽' : '' }} / месяц
                </span>
            </div>
            <div class="vacancy-card-footer"> <a class="btn button-md" href="#">Откликнуться</a>
              <button class="ic-btn">
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.0641 0.796788C11.2552 0.45665 11.7448 0.456649 11.9359 0.796789L14.7993 5.89364C15.0135 6.27499 15.3835 6.54383 15.8124 6.62973L21.5446 7.77794C21.9272 7.85457 22.0785 8.32027 21.8141 8.60711L17.8515 12.9053C17.555 13.2269 17.4137 13.6619 17.4645 14.0964L18.1439 19.9029C18.1892 20.2903 17.793 20.5782 17.4385 20.4153L12.1262 17.9749C11.7287 17.7923 11.2713 17.7923 10.8738 17.9749L5.56148 20.4153C5.20696 20.5782 4.81081 20.2903 4.85614 19.9029L5.53549 14.0964C5.58632 13.6619 5.44498 13.2269 5.1485 12.9053L1.18593 8.60711C0.921493 8.32027 1.07281 7.85457 1.45535 7.77794L7.18757 6.62973C7.61645 6.54383 7.98648 6.27499 8.20072 5.89364L11.0641 0.796788Z" stroke="#C8C8C8"></path>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "vacancy-section",
  data() {
    return {
      vacancies: [],
    };
  },
  mounted() {
    window.api
      .call("get", "/api/vacancies/vacancies_in_city", {})
      .then((response) => {
        this.vacancies = response.data.data;
      });
  },
}
</script>

<style scoped>

</style>
