<template>
  <div className="layout">
    <header className="header" v-if="hasHeaderSlot">
      <slot name="header"></slot>
    </header>
    <HeaderThePersonalCabinetHeader v-else></HeaderThePersonalCabinetHeader>

    <main class="main cabinet advice-page bg-wrapper" role="main">
      <div class="tabs tabs-row wrapper wrapper-1290">
        <ul>
          <li>
            <NuxtLink
              :to="{ name: 'advice-category', params: { category: 'popular' } }"
              >Популярное</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'advice-category', params: { category: 'resume' } }"
              >Резюме</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{
                name: 'advice-category',
                params: { category: 'seeking-jobs' },
              }"
              >Поиск работы</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{
                name: 'advice-category',
                params: { category: 'interviews' },
              }"
              >Собеседования</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{
                name: 'advice-category',
                params: { category: 'about-money' },
              }"
              >Про деньги</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'advice-category', params: { category: 'career' } }"
              >Карьера</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="main-section main-section-mob">
        <div class="wrapper wrapper--xl">
          <form class="search-form" action="#" role="form" autocomplete="off">
            <div class="search-row">
              <div class="input-wrap has-icon has-label">
                <img class="icon" src="~/assets/img/svg/search.svg" alt="#" />
                <label for="name">Названии вакансии </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Какую вакансию вы ищете?"
                  autocomplete="off"
                />
              </div>
              <div class="input-wrap has-label">
                <label for="salary">Желаемая зарплата </label
                ><select class="n-select" name="salary" id="salary">
                  <option data-display="Выберите зарплату">Nothing</option>
                  <option value="1">Some option</option>
                  <option value="2">Another option</option>
                  <option value="3" disabled>A disabled option</option>
                  <option value="4">Potato</option>
                </select>
              </div>
              <div class="input-wrap has-icon">
                <img class="icon" src="~/assets/img/svg/location.svg" alt="#" />
                <input
                  type="text"
                  name="city"
                  placeholder="Город"
                  autocomplete="off"
                />
              </div>
              <div class="input-wrap has-icon">
                <img class="icon" src="~/assets/img/svg/location.svg" alt="#" />
                <input
                  type="text"
                  name="country"
                  placeholder="Страна"
                  autocomplete="off"
                />
              </div>
              <button class="button-accent submit-search-form" type="submit">
                Поиск
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="articles-grid-container wrapper wrapper-1290">
        <NuxtPage />
      </div>
    </main>

    <!-- <template #error="{ error }">
        <div>
          <p>
            Oh no, something broke when loading the lesson!
            <code>{{ error }}</code>
          </p>
          <p>
            <NuxtLink class="hover:cursor-pointer" to="/"> Go to / </NuxtLink>
          </p>
        </div>
      </template> -->

    <footer class="footer" v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </footer>
    <the-footer v-else></the-footer>
  </div>
</template>

<script>
export default {
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
  },
};
</script>
