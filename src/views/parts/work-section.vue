<template>
  <section class="work-section section wrapper">
    <div class="section-head">
      <h2 class="section-title">Работа и вакансии в Москве</h2>
      <a class="more" href="#">
        Все <span>вакансии</span
        ><svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.75 12.2256L4.75 12.2256"
            stroke="#5375FD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M13.7002 6.20124L19.7502 12.2252L13.7002 18.2502"
            stroke="#5375FD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path></svg
      ></a>
    </div>
    <div class="swiper cards-slider-row">
      <ul class="cards-grid swiper-wrapper">
        <li
          v-for="vacancy in vacancies"
          :key="vacancy.title"
          class="swiper-slide"
        >
          <a class="tile-card" href="#">
            <h4 class="tile-card-title">{{ vacancy.title }}</h4>
            <span class="tile-card-dop-info">
              До {{ vacancy.salary.to || vacancy.salary.from }}
              {{ vacancy.salary.currency === "RUR" ? "₽" : "" }} / месяц
            </span>
            <strong class="tile-card-count"
              >{{ vacancy.found }} вакансии</strong
            >
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "work-section",
  data() {
    return {
      vacancies: [],
    };
  },
  mounted() {
    window.api
      .call("get", "/api/vacancies/specialization_in_city", {})
      .then((response) => {
        this.vacancies = response.data.data;
      });
  },
};
</script>

<style scoped></style>
