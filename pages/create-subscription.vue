<script setup>
definePageMeta({
  layout: "cabinet",
});

const myChangeEvent = (event) => {
  console.log("myChangeEvent: ", event);
}
const mySelectEvent = (e) => {
  console.log("mySelectEvent: ", event);
}
const myOptions = [
  {id: 1, text: 'apple'},
  {id: 2, text: 'berry'},
  {id: 3, text: 'cherry'},
]
const myOptions2 = [
  {id: 1, text: 'apple'},
  {id: 2, text: 'berry'},
  {id: 3, text: 'cherry'},
]
const myValue = ref();
const myValue2 = ref();

</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="create-subscribe" action="" name="create-subscribe ">
          <div class="w-box w-box--main w-box-subscribe">
            <div class="w-box-head">
              <h1 class="title">Создание подписки</h1>
              <div class="descr">Получайте уведомления о новых вакансиях по созданному запросу</div>
            </div>
            <div class="w-box-body">
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
                    <label for="hh"><img src="~/assets/img//logos/hhmini.svg"
                                         alt="#"><span>Hh.ru</span></label>
                  </div>
                  <div class="custom-check-wrap">
                    <div class="theme-checker theme-checker--blue">
                      <input type="checkbox" id="sj" checked>
                      <div class="theme-checker-ui">
                        <div class="circle"> </div>
                      </div>
                    </div>
                    <label for="sj"><img src="~/assets/img//logos/sj.svg" alt="#"><span>Superjob.ru
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
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
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
              <div class="sep"> </div>
              <div class="input-row">
                <label for="industry">Отрасль</label>
                <div class="input-wrapper">
                  <Select2 v-model="myValue" :options="myOptions" :settings="{ multiple: true }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                </div>
              </div>
              <div class="input-row">
                <label for="locations">Города, области, страны</label>
                <div class="input-wrapper">
                  <Select2 v-model="myValue2" :options="myOptions2" :settings="{ multiple: true }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                </div>
              </div>
              <div class="sep"> </div>
              <div class="input-row">
                <label for="covid-vaccine">Вакцинация от COVID-19</label>
                <div class="input-wrapper"><select class="d-select" name="covid-vaccine"
                                                   id="covid-vaccine">
                  <option value="1">Статус привитого</option>
                  <option value="2">Another option</option>
                  <option value="3" disabled>A disabled option</option>
                  <option value="4">Potato</option>
                </select>
                </div>
              </div>
              <div class="sep"></div>
              <div class="input-row">
                <label for="income">Какой доход вы рассматриваете (₽)?</label>
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
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="show-no-salary" checked>
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="show-no-salary">Не показывать без зарплаты</label>
                  </div>
                </div>
              </div>
              <div class="input-row">
                <label for="company">Компания</label>
                <div class="input-wrapper">
                  <input type="text" id="company">
                </div>
              </div>
              <div class="sep"></div>
              <div class="input-row">
                <label>Занятость</label>
                <div class="checkboxes-row input-row--checkboxes">
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="full">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="full">Полная</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="changeable">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="changeable">Сменная</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="incomplete-distance">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="incomplete-distance">Неполная дистанционная</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="incomplete">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="incomplete">Неполная</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="rotational">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
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
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="video">Видеовакансии</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="no-experience">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="no-experience">Опыт не требуется</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="not-requiring-higher-education">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
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
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="A">А - мотоциклы</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="B">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="B">В - легковые авто</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="C">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="C">С - грузовые авто</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="D">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="D">D - Автобусы</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="E">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="E">E - Авто с прицепом</label>
                  </div>
                </div>
              </div>
              <div class="sep"> </div>
              <div class="input-row">
                <label for="lenguage">Владение иностранными языками</label>
                <div class="c2">
                  <div class="input-wrapper"><select class="d-select" name="lenguage" id="lenguage">
                    <option data-display="Язык">Язык</option>
                    <option value="1">Статус привитого</option>
                    <option value="2">Another option</option>
                    <option value="3" disabled>A disabled option</option>
                    <option value="4">Potato</option>
                  </select>
                  </div>
                  <div class="input-wrapper"><select class="d-select" name="lenguage-level"
                                                     id="lenguage-level">
                    <option data-display="Уровень владения">Уровень владения</option>
                    <option value="1">Статус привитого</option>
                    <option value="2">Another option</option>
                    <option value="3" disabled>A disabled option</option>
                    <option value="4">Potato</option>
                  </select>
                  </div>
                </div>
              </div>
              <div class="sep"> </div>
              <div class="input-row input-row--checkboxes">
                <label>Куда получать уведомления</label>
                <div class="checkboxes-row">
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="push-notifications">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="push-notifications">Push-уведомления</label>
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="email-notofocations">
                      <div class="checkbox-mask"><img src="~/assets/img//svg/check.svg" alt="#"></div>
                    </div>
                    <label for="email-notofocations">E-mail уведомления</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-submit-container">
            <p>Найдено 2 012 вакансий</p>
            <button class="button-accent" type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style>

.select2-container {
  width: 100% !important; }

.select2-container--default .select2-selection--multiple {
  min-height: 46px;
  background: #F5F8FA;
  border-radius: 8px;
  border: none; }

.select2-search {
  display: none; }

.select2-container--default.select2-container--focus .select2-selection--multiple {
  padding: 0 7px 0 7px; }

.select2-container .select2-selection--multiple .select2-selection__rendered {
  min-height: 46px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-bottom: 0;
  padding-left: 7px;
  padding-right: 7px; }

.select2-container--default .select2-selection--multiple {
  padding-bottom: 0;
  padding-left: 7px;
  padding-right: 7px; }

.select2-container--default .select2-selection--multiple .select2-selection__choice {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content; }

.select2-container--default .select2-selection--multiple .select2-selection__choice {
  margin-top: 0;
  margin-bottom: 5px;
  margin-left: 0;
  margin-right: 8px;
  -webkit-transform: translateY(2px);
  -ms-transform: translateY(2px);
  transform: translateY(2px); }

.select2-container--default.select2-container--focus .select2-selection--multiple {
  border: none; }

.select2-container .select2-selection--multiple .select2-selection__rendered {
  padding-left: 0;
  padding-right: 0; }

.select2-container--default .select2-selection--multiple .select2-selection__choice {
  padding-left: 12px;
  padding-right: 38px;
  background: #FFFFFF;
  border: 1px solid #ECECEC;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 6px;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #000000; }

.select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
  left: auto;
  right: 0;
  width: 26px;
  height: 18px;
  border: none;
  padding: 0;
  padding-right: 8px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  background-image: url("~/assets/img/svg/Close-Square.svg");
  background-position: center center;
  background-repeat: no-repeat; }
.select2-container--default .select2-selection--multiple .select2-selection__choice__remove span {
  display: none; }
.select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover {
  background-color: none; }

.select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover, .select2-container--default .select2-selection--multiple .select2-selection__choice__remove:focus {
  background-color: transparent !important; }

.select2-dropdown {
  padding: 8px 4px;
  background: #FFFFFF;
  border-radius: 0 !important;
  border: none;
  -webkit-filter: drop-shadow(0px 0px 20px rgba(28, 27, 98, 0.1));
  filter: drop-shadow(0px 0px 20px rgba(28, 27, 98, 0.1)); }

.select2-container {
  margin-top: 4px; }

.select2-container--default .select2-results__option {
  border-radius: 8px;
  padding: 12px 13px;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #0A2540; }

.select2-container--default .select2-results__option--highlighted.select2-results__option--selectable {
  background: #F5F8FA;
  color: #0A2540; }

.select2-container--default .select2-results__option--selected {
  background: #F5F8FA;
  color: #0A2540; }

.select2-container--default .select2-selection--multiple:after {
  border-bottom: 1.5px solid #78757E;
  border-right: 1.5px solid #78757E;
  content: '';
  display: block;
  margin-top: -4px;
  pointer-events: none;
  position: absolute;
  width: 9px;
  height: 9px;
  top: 44%;
  right: 24px;
  -webkit-transform-origin: 66% 66%;
  -ms-transform-origin: 66% 66%;
  transform-origin: 66% 66%;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: all .15s ease-in-out;
  -o-transition: all .15s ease-in-out;
  transition: all .15s ease-in-out; }

.select2-container--default.select2-container--open .select2-selection--multiple:after {
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  transform: rotate(-135deg); }

</style>