<template>
  <main class="main" role="main">
    <div class="main-section">
      <div class="wrapper wrapper--xl">
        <div class="main-section-title">
          <h1 class="title">Поиск вакансий</h1><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id.</span>
        </div>
        <form class="search-form" action="#" role="form" autocomplete="off">
          <div class="search-row">
            <div class="input-wrap has-icon has-label"><img class="icon" src="@/assets/img/svg/search.svg" alt="#">
              <label for="name">Названии вакансии </label>
              <input type="text" name="name" id="name" placeholder="Какую вакансию вы ищете?" autocomplete="off">
            </div>
            <div class="input-wrap has-label">
              <label for="salary">Желаемая зарплата </label><select class="n-select" name="salary" id="salary">
              <option data-display="Выберите зарплату">Желаемая зарплата</option>
              <option value="1">Some option</option>
              <option value="2">Another option</option>
              <option value="3" disabled="">A disabled option</option>
              <option value="4">Potato</option>
            </select>
            </div>
            <div class="input-wrap has-icon"><img class="icon" src="@/assets/img/svg/location.svg" alt="#">
              <input type="text" name="city" placeholder="Город" autocomplete="off">
            </div>
            <div class="input-wrap has-icon"><img class="icon" src="@/assets/img/svg/location.svg" alt="#">
              <input type="text" name="country" placeholder="Страна" autocomplete="off">
            </div>
            <button class="button-accent submit-search-form" type="submit">Поиск            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="place-section section wrapper"><a class="place-card place-card--vacancy" href="#">
      <h4 class="place-card-title">Работа</h4>
      <p class="place-card-descr"><strong>Jobeek</strong> — это лучшие предложения высокооплачиваемой работы от&nbsp;российских и&nbsp; зарубежных компаний.</p>
      <button class="btn button-accent button-accent--ts-bigger">Разместить резюме</button></a><a class="place-card place-card--resume" href="#">
      <h4 class="place-card-title">Сотрудники</h4>
      <p class="place-card-descr"><strong>Jobeek</strong> — самая большая и&nbsp;качественная база резюме лучших специалистов в&nbsp;России.</p>
      <button class="btn button-accent button-accent--ts-bigger">Разместить вакансию        </button></a></div>
    <vacancy-section></vacancy-section>
    <section class="companies-section section wrapper">
      <div class="section-head">
        <h2 class="section-title"> Работайте у лучших</h2>
      </div>
      <ul class="companies-list">
        <li> <a class="company company-card" href="#">
          <div class="company-logo"><img src="@/assets/img/logos/logo1.svg" alt="#"></div>
          <div class="company-name"> <strong>Мегафон</strong><span class="count">21 142 вакансии</span></div></a></li>
        <li> <a class="company company-card" href="#">
          <div class="company-logo"><img src="@/assets/img/logos/logo2.svg" alt="#"></div>
          <div class="company-name"> <strong>Мегафон</strong><span class="count">21 142 вакансии</span></div></a></li>
        <li> <a class="company company-card" href="#">
          <div class="company-logo"><img src="@/assets/img/logos/logo3.svg" alt="#"></div>
          <div class="company-name"> <strong>Мегафон</strong><span class="count">21 142 вакансии</span></div></a></li>
        <li> <a class="company company-card" href="#">
          <div class="company-logo"><img src="@/assets/img/logos/logo4.svg" alt="#"></div>
          <div class="company-name"> <strong>Мегафон</strong><span class="count">21 142 вакансии</span></div></a></li>
        <li> <a class="company company-card" href="#">
          <div class="company-logo"><img src="@/assets/img/logos/logo5.svg" alt="#"></div>
          <div class="company-name"> <strong>Мегафон</strong><span class="count">21 142 вакансии</span></div></a></li>
        <li> <a class="company company-card" href="#">
          <div class="company-logo"><img src="@/assets/img/logos/logo6.svg" alt="#"></div>
          <div class="company-name"> <strong>Мегафон</strong><span class="count">21 142 вакансии</span></div></a></li>
        <li> <a class="company company-card" href="#">
          <div class="company-logo"><img src="@/assets/img/logos/logo7.svg" alt="#"></div>
          <div class="company-name"> <strong>Мегафон</strong><span class="count">21 142 вакансии                                                   </span></div></a></li>
      </ul>
    </section>
    <work-section></work-section>
    <section class="search-section">
      <div class="wrapper">
        <div class="divided-box">
          <div class="divided-box-title">
            <h3 class="section-title">Поиск по отраслям</h3>
          </div>
          <div class="divided-box-content">
            <div class="labels-list-box">
              <ul class="labels-list">
                <li> <a class="label" href="#">IT, интернет, связь</a></li>
                <li> <a class="label" href="#">Промышленность, производство </a></li>
                <li> <a class="label" href="#">IT, интернет, связь </a></li>
                <li> <a class="label" href="#">Некомерческие организации, волонтерство     </a></li>
                <li> <a class="label" href="#">IT, интернет, связь </a></li>
                <li> <a class="label" href="#">Промышленность, производство </a></li>
                <li> <a class="label" href="#">IT, интернет, связь</a></li>
                <li> <a class="label" href="#">IT, интернет, связь  </a></li>
                <li> <a class="label" href="#">IT, интернет, связь </a></li>
                <li> <a class="label" href="#">Некомерческие организации, волонтерство </a></li>
                <li> <a class="label" href="#">Промышленность, производство    </a></li>
                <li> <a class="label" href="#">IT, интернет, связь  </a></li>
                <li> <a class="label" href="#">IT, интернет, связь  </a></li>
                <li> <a class="label" href="#">Некомерческие организации, волонтерство   </a></li>
                <li> <a class="label" href="#">IT, интернет, связь  </a></li>
                <li> <a class="label" href="#">IT, интернет, связь  </a></li>
                <li> <a class="label" href="#">IT, интернет, связь   </a></li>
                <li> <a class="label" href="#">Промышленность, производство </a></li>
                <li> <a class="label" href="#">Некомерческие организации, волонтерство  </a></li>
                <li> <a class="label" href="#">IT, интернет, связь    </a></li>
                <li data-hidden="true"> <a class="label" href="#">IT, интернет, связь  </a></li>
                <li data-hidden="true"> <a class="label" href="#">IT, интернет, связь  </a></li>
                <li data-hidden="true"> <a class="label" href="#">IT, интернет, связь   </a></li>
                <li data-hidden="true"> <a class="label" href="#">Промышленность, производство </a></li>
                <li data-hidden="true"> <a class="label" href="#">Некомерческие организации, волонтерство  </a></li>
                <li data-hidden="true"> <a class="label" href="#">IT, интернет, связь                                                                                          </a></li>
              </ul>
            </div>
            <button class="more more--down">
              Показать еще<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.75 12.2256L4.75 12.2256" stroke="#5375FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M13.7002 6.20124L19.7502 12.2252L13.7002 18.2502" stroke="#5375FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            </button>
          </div>
        </div>
        <div class="divided-box">
          <div class="divided-box-title">
            <h3 class="section-title">Поиск по графику</h3>
          </div>
          <div class="divided-box-content">
            <div class="labels-list-box">
              <ul class="labels-list">
                <li> <a class="label" href="#">Вахтой</a></li>
                <li> <a class="label" href="#">1 через 3</a></li>
                <li> <a class="label" href="#">1 через 2</a></li>
                <li> <a class="label" href="#">1 через 1   </a></li>
                <li> <a class="label" href="#">1 через 10</a></li>
                <li> <a class="label" href="#">Удаленка</a></li>
                <li> <a class="label" href="#">Ночью</a></li>
                <li> <a class="label" href="#">Сменный график </a></li>
                <li> <a class="label" href="#">1 через 1</a></li>
                <li> <a class="label" href="#">1 через 10  </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import workSection from "@/views/parts/work-section.vue";
import vacancySection from "@/views/parts/vacancy-section.vue";

export default {
  name: "Home",
  components: {
    workSection: workSection,
    vacancySection: vacancySection,
  },
  data() {
    return {
      vacancies: [],
    };
  },
  mounted() {
  },
};
</script>
