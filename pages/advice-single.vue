<script setup>
definePageMeta({
  layout: "cabinet",
});
</script>
<template>
  <main class="main cabinet advice-single-page bg-wrapper" role="main">
    <div class="main-section main-section-mob">
      <div class="wrapper wrapper--xl">
        <form class="search-form" action="#" role="form" autocomplete="off">
          <div class="search-row">
            <div class="input-wrap has-icon has-label"><img class="icon" src="~/assets/img/svg/search.svg"
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
            <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
              <input type="text" name="city" placeholder="Город" autocomplete="off">
            </div>
            <div class="input-wrap has-icon"><img class="icon" src="~/assets/img/svg/location.svg" alt="#">
              <input type="text" name="country" placeholder="Страна" autocomplete="off">
            </div>
            <button class="button-accent submit-search-form" type="submit">Поиск </button>
          </div>
        </form>
      </div>
    </div>
    <div class="has-sidebar wrapper wrapper-1290">
      <div class="content">
        <article class="article">
          <div class="cat">Про деньги</div>
          <div class="article-image"> <img src="~/assets/img/unsplash_jrh5lAq-mIs-art.jpg" alt="#"></div>
          <div class="article-info-row">
            <div class="time a-count"><img src="~/assets/img/svg/carbon_time.svg" alt="#"><span>1 234</span>
            </div>
            <div class="views a-count"> <img src="~/assets/img/svg/eye.svg" alt="#"><span>1 234 </span></div>
          </div>
          <h1>Adipiscing volutpat porttitor urna ac sed vitae dolor, massa sem ac sed vitae dolor, massa
            sem dapibus. </h1>
          <p>According to sitefy.com, there are approximately 10,500 new websites every hour. It’s a
            monstrous number, right? But among all these websites, only a few stand out enough to win
            the Webby Awards.</p>
          <p>Ever heard about them?</p>
          <p>Regarding the digital world, these awards are some of the most important internationally
            speaking. The main categories are websites, mobile sites, videos, advertising, apps and
            software, podcasts, among others.</p>
          <p>In every edition, there are two prizes for each category.</p>
          <p>On one hand, “The Webby Award”. The winners of this recognition are selected by the
            “International Academy of Digital Arts and Sciences”. The jury consists of digital experts,
            famous entrepreneurs, creative minds, and creators.</p>
          <p>On the other hand, “The Webby People’s Voice Award”. This award is given by popular vote.
            However, the nominated works are chosen by the academy.</p><img
            src="~/assets/img/unsplash_Imc-IoZDMXc.jpg" alt="#">
          <h2>The jury consists of digital experts, famous entrepreneurs</h2>
          <p>On one hand, “The Webby Award”. The winners of this recognition are selected by the
            “International Academy of Digital Arts and Sciences”. The jury consists of digital experts,
            famous entrepreneurs, creative minds, and creators.</p>
          <p>On the other hand, “The Webby People’s Voice Award”. This award is given by popular vote.
            However, the nominated works are chosen by the academy.</p>
          <div class="article-footer">
            <div class="socials-widget"> <span>Поделиться:</span>
              <ul>
                <li> <a href="#"><img src="~/assets/img/cib_facebook.svg" alt="#"></a></li>
                <li> <a href="#"><img src="~/assets/img/logos_telegram.svg" alt="#"></a></li>
                <li> <a href="#"><img src="~/assets/img/vk.svg" alt="#"></a></li>
                <li> <a href="#"><img src="~/assets/img/ok.svg" alt="#"></a></li>
              </ul>
            </div>
          </div>
        </article>
      </div>
      <aside class="sidebar">
        <div class="publications-col sticky-item">
          <h4 class="publications-col-title">Последние публикации</h4>
          <ul class="publications-col-list">
            <li> <a class="publication-card-mini" href="#">
              <div class="publication-card-mini-img"><img src="~/assets/img/unsplash_QBpZGqEMsKgmini.jpg"
                                                          alt="#"></div>
              <div class="publication-card-mini-text">
                <h5 class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa
                  sem ac sed </h5>
                <div class="views a-count"> <img src="~/assets/img/svg/eye.svg" alt="#"><span>1
                                                234</span></div>
              </div>
            </a></li>
            <li> <a class="publication-card-mini" href="#">
              <div class="publication-card-mini-img"><img src="~/assets/img/unsplash_QBpZGqEMsKgmini.jpg"
                                                          alt="#"></div>
              <div class="publication-card-mini-text">
                <h5 class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa
                  sem ac sed </h5>
                <div class="views a-count"> <img src="~/assets/img/svg/eye.svg" alt="#"><span>1
                                                234</span></div>
              </div>
            </a></li>
            <li> <a class="publication-card-mini" href="#">
              <div class="publication-card-mini-img"><img src="~/assets/img/unsplash_QBpZGqEMsKgmini.jpg"
                                                          alt="#"></div>
              <div class="publication-card-mini-text">
                <h5 class="title">Sed vitae dolor, massa sem </h5>
                <div class="views a-count"><img src="~/assets/img/svg/eye.svg" alt="#"><span>1 234</span>
                </div>
              </div>
            </a></li>
            <li> <a class="publication-card-mini" href="#">
              <div class="publication-card-mini-img"><img src="~/assets/img/unsplash_QBpZGqEMsKgmini.jpg"
                                                          alt="#"></div>
              <div class="publication-card-mini-text">
                <h5 class="title">Adipiscing volutpat porttitor urna ac sed vitae </h5>
                <div class="views a-count"> <img src="~/assets/img/svg/eye.svg" alt="#"><span>1 234
                                            </span></div>
              </div>
            </a></li>
          </ul>
        </div>
      </aside>
    </div>
  </main>
</template>