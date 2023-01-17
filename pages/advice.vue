<script setup>
definePageMeta({
  layout: "cabinet",
});
</script>
<template>
  <main class="main cabinet advice-page bg-wrapper" role="main">
    <div class="tabs tabs-row wrapper wrapper-1290">
      <ul>
        <li> <a class="active" href="#">Популярное</a></li>
        <li> <a href="#">Резюме</a></li>
        <li> <a href="#">Поиск работы</a></li>
        <li> <a href="#">Собеседования</a></li>
        <li> <a href="#">Про деньги</a></li>
        <li> <a href="#">Карьера </a></li>
      </ul>
    </div>
    <div class="main-section main-section-mob">
      <div class="wrapper wrapper--xl">
        <form class="search-form" action="#" role="form" autocomplete="off">
          <div class="search-row">
            <div class="input-wrap has-icon has-label"><img class="icon" src="img/svg/search.svg"
                                                            alt="#">
              <label for="name">Названии вакансии </label>
              <input type="text" name="name" id="name" placeholder="Какую вакансию вы ищете?"
                     autocomplete="off">
            </div>
            <div class="input-wrap has-label">
              <label for="salary">Желаемая зарплата </label><select class="n-select" name="salary"
                                                                    id="salary">
              <option data-display="Выберите зарплату">Nothing</option>
              <option value="1">Some option</option>
              <option value="2">Another option</option>
              <option value="3" disabled>A disabled option</option>
              <option value="4">Potato</option>
            </select>
            </div>
            <div class="input-wrap has-icon"><img class="icon" src="img/svg/location.svg" alt="#">
              <input type="text" name="city" placeholder="Город" autocomplete="off">
            </div>
            <div class="input-wrap has-icon"><img class="icon" src="img/svg/location.svg" alt="#">
              <input type="text" name="country" placeholder="Страна" autocomplete="off">
            </div>
            <button class="button-accent submit-search-form" type="submit">Поиск </button>
          </div>
        </form>
      </div>
    </div>
    <div class="articles-grid-container wrapper wrapper-1290">
      <ul class="articles-grid">
        <li> <a class="article-card" href="#">
          <div class="article-card-photo"> <img src="img/unsplash_jrh5lAq-mIs.jpg" alt="#"></div>
          <div class="article-card-body"> <span class="cat">Резюме</span><span
              class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa sem ac
                                    sed vitae dolor, massa sem dapibus.</span>
            <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in gravida
              orci, ac sed vitae dolor, massa sem.</p>
            <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234</span></div>
          </div>
        </a></li>
        <li> <a class="article-card" href="#">
          <div class="article-card-photo"> <img src="img/unsplash_H0vuplqoX0c.jpg" alt="#"></div>
          <div class="article-card-body"> <span class="cat">Резюме</span><span
              class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa sem ac
                                    sed vitae dolor, massa</span>
            <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing </p>
            <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234 </span></div>
          </div>
        </a></li>
        <li> <a class="article-card" href="#">
          <div class="article-card-photo"> <img src="img/unsplash_QBpZGqEMsKg.jpg" alt="#"></div>
          <div class="article-card-body"> <span class="cat">Про деньги</span><span
              class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa sem ac
                                    sed vitae dolor, massa sem dapibus.</span>
            <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing </p>
            <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234 </span></div>
          </div>
        </a></li>
        <li> <a class="article-card" href="#">
          <div class="article-card-photo"> <img src="img/unsplash_jrh5lAq-mIs2.jpg" alt="#"></div>
          <div class="article-card-body"> <span class="cat">Резюме</span><span
              class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa sem ac
                                    sed vitae dolor, massa sem dapibus.</span>
            <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in gravida
              orci, ac sed vitae dolor, massa sem.</p>
            <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234</span></div>
          </div>
        </a></li>
        <li> <a class="article-card" href="#">
          <div class="article-card-photo"> <img src="img/unsplash_QBpZGqEMsKg2.jpg" alt="#"></div>
          <div class="article-card-body"> <span class="cat">Резюме</span><span
              class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa sem ac
                                    sed vitae dolor, massa</span>
            <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing </p>
            <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234 </span></div>
          </div>
        </a></li>
        <li>
          <div class="article-card-x2"><a class="article-card" href="#">
            <div class="article-card-body"> <span class="title">Adipiscing volutpat porttitor urna
                                        dapibus.</span>
              <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in
                gravida orci, ac sed vitae dolor, massa sem. Dui justo, netus sit ac nibh purus.
              </p>
              <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234 </span>
              </div>
            </div>
          </a><a class="article-card" href="#">
            <div class="article-card-body"> <span class="title">Adipiscing volutpat porttitor urna
                                        dapibus massa sem.</span>
              <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in
                gravida orci, ac sed vitae dolor, massa sem. Dui justo, netus sit ac nibh purus.
              </p>
              <div class="views a-count"><img src="img/svg/eye.svg" alt="#"><span>1 234 </span>
              </div>
            </div>
          </a></div>
        </li>
        <li>
          <div class="article-card-x2"><a class="article-card" href="#">
            <div class="article-card-body"> <span class="title">Adipiscing volutpat porttitor urna
                                        dapibus.</span>
              <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in
                gravida orci, ac sed vitae dolor, massa sem. Dui justo, netus sit ac nibh purus.
              </p>
              <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234 </span>
              </div>
            </div>
          </a><a class="article-card" href="#">
            <div class="article-card-body"> <span class="title">Adipiscing volutpat porttitor urna
                                        dapibus massa sem.</span>
              <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in
                gravida orci, ac sed vitae dolor, massa sem. Dui justo, netus sit ac nibh purus.
              </p>
              <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234 </span>
              </div>
            </div>
          </a></div>
        </li>
        <li>
          <div class="article-card-x2"><a class="article-card" href="#">
            <div class="article-card-body"> <span class="title">Adipiscing volutpat porttitor urna
                                        dapibus.</span>
              <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in
                gravida orci, ac sed vitae dolor, massa sem. Dui justo, netus sit ac nibh purus.
              </p>
              <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234 </span>
              </div>
            </div>
          </a><a class="article-card" href="#">
            <div class="article-card-body"> <span class="title">Adipiscing volutpat porttitor urna
                                        dapibus massa sem.</span>
              <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in
                gravida orci, ac sed vitae dolor, massa sem. Dui justo, netus sit ac nibh purus.
              </p>
              <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234 </span>
              </div>
            </div>
          </a></div>
        </li>
        <li> <a class="article-card" href="#">
          <div class="article-card-photo"> <img src="img/unsplash_QBpZGqEMsKg2.jpg" alt="#"></div>
          <div class="article-card-body"> <span class="cat">Резюме</span><span
              class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa sem ac
                                    sed vitae dolor, massa sem dapibus.</span>
            <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing </p>
            <div class="views a-count"> <img src="img/svg/eye.svg" alt="#"><span>1 234</span></div>
          </div>
        </a></li>
      </ul>
    </div>
  </main>
</template>