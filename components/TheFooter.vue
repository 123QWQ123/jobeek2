<template>
  <footer class="main-footer">
    <div class="main-footer-content wrapper">
      <div class="logo"> <img src="~/assets/img/jobeek-dark.svg" alt="#"></div>
      <div class="footer-navigation navigation" role="navigation">

        <div class="col">
          <h5 class="col-title">Работодателям</h5>
          <ul>
            <li><a href="#">Создать вакансию</a></li>
            <li><a href="#">Поиск соотрудников</a></li>
            <li><a href="#">Советы</a></li>
          </ul>
        </div>

        <div class="col">
          <h5 class="col-title">Соискателям</h5>
          <ul>
            <li><a href="#">Создать резюме</a></li>
            <li><a href="#">Поиск работы</a></li>
            <li><a href="#">Советы</a></li>
          </ul>
        </div>

        <div class="col">
          <h5 class="col-title">Информация</h5>
          <ul>
            <li><NuxtLink :to="{name: 'profile'}">Личный кабинет</NuxtLink></li>
            <li><a href="https://reg.jobeek.me/rules.pdf">Помощь</a></li>
            <li><a href="https://reg.jobeek.me/rules.pdf">Пользовательское соглашение</a></li>
            <li><a href="https://reg.jobeek.me/default-jobeek/control">Отмена премиума</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-footer-bottom">
      <div class="wrapper"> <span>© 2000–2021 Jobeek </span></div>
    </div>
    <div class="main-footer-bottom">
      <div class="wrapper">

        <p class="text-center">
          Ввод номера телефона на сайте и нажатие кнопки "Получить код" инициирует запрос Сервиса соответствующего Оператора, позволяющего совершить оплату услуги. Каждый день со счета моего мобильного телефона будет списываться стоимость доступа пока действует подписка. В любой момент подписку можно отключить в личном кабинете. Стоимость доступа составляет 30 рублей (все налоги и комиссии включены) в сутки для абонентов Tele2. Для отключения подписки абонентам Теле2, необходимо отправить SMS сообщение с кодом СТОП на номер 659. Стоимость доступа составляет 30 рублей (все налоги и комиссии включены) в сутки для абонентов ПАО «МегаФон». Для отключения подписки абонентам ПАО «МегаФон» необходимо отправить SMS сообщение с кодом СТОП на номер 7522. Вводя телефон на сайте, пользователь принимает условия оферт:
          <a href="https://единаякасса.рф/wp-content/uploads/Pravila_perevodov_EDS_RNKO_EK.pdf" target="_blank">
            РНКО «Единая Касса»
          </a>,
          <a href="http://moscow.megafon.ru/download/~federal/oferts/oferta_m_platezhi.pdf" target="_blank">
            МегаФон
          </a>,

          <a href="https://f.tele2.ru/offer/" target="_blank">
            Теле2
          </a>,

          <a href="https://reg.jobeek.me/rules.pdf" target="_blank">
            Договор - публичная оферта
          </a>
          . Нажимая кнопку «Получить код», Вы даете согласие на получение фискального чека на эл. почту: "ваш номер телефона@jobeek.me". Чтобы изменить адрес эл. почты, отправьте запрос с адресом на support@hphelp.me. Служба поддержки: 8-495-128-2655 | support@hphelp.me | www.hphelp.me
        </p>

      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style>
.footer-navigation{
  /*justify-content: flex-end;*/
}
</style>