<template>
  <li>
    <div class="favorites-card">
      <div class="favorites-card-head">
        <div class="company">
          <div class="company-logo"><img :src="item.logo" alt="item.logo">
          </div>
          <div class="company-name">
            <NuxtLink :to="{name: 'vacancies-slug', params: {slug: item.id}, query: {provider: 'superjob'}}">
              {{ item.name }}
            </NuxtLink>
            <span class="count">{{ item.company }}</span>
          </div>
        </div>
        <div class="salary" v-if="item.salary_from">От {{vueNumberFormat(item.salary_from, {})}} {{ item.currency }} </div>
        <div class="salary" v-else>До {{vueNumberFormat(item.salary_to, {})}} {{ item.currency }} </div>
      </div>
      <div class="favorites-card-body">
        <div class="time-location"><span>{{ moment(item.published_date).format('hh:mm') }}</span><strong>{{ item.city }}</strong></div>
        <p>{{item.description}}</p>
      </div>
      <div class="favorites-card-footer">
        <div class="favorites-card-footer-row telephones-row">
          <ul>
            <li> <a class="tel" href="tel: +7 800 550 11 00"> <img
                src="~/assets/img/svg/carbon_phone.svg" alt="#">+7 800 550 11 00
            </a></li>
            <li> <a class="tel" href="tel: +7 800 550 11 00"> <img
                src="~/assets/img/svg/carbon_phone.svg" alt="#">+7 800 550 11 00
            </a></li>
            <li> <a class="tel" href="tel: +7 800 550 11 00"> <img
                src="~/assets/img/svg/akar-icons_whatsapp-fill.svg" alt="#">+7
              800 550 11 00 </a></li>
          </ul>
        </div>
        <div class="favorites-card-footer-row">
          <div class="group">
            <NuxtLink class="group-action btn button-md" :to="{name: 'vacancies-slug', params: {slug: item.id}, query: {provider: 'superjob'}}">
              Откликнуться
            </NuxtLink>
          </div>
          <div class="group">
            <button class="group-action ic-btn fav-btn" :class="{active: isFavorite}" @click="toggleFavorite">
            <svg width="23" height="21" viewBox="0 0 23 21" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M11.0641 0.796788C11.2552 0.45665 11.7448 0.456649 11.9359 0.796789L14.7993 5.89364C15.0135 6.27499 15.3835 6.54383 15.8124 6.62973L21.5446 7.77794C21.9272 7.85457 22.0785 8.32027 21.8141 8.60711L17.8515 12.9053C17.555 13.2269 17.4137 13.6619 17.4645 14.0964L18.1439 19.9029C18.1892 20.2903 17.793 20.5782 17.4385 20.4153L12.1262 17.9749C11.7287 17.7923 11.2713 17.7923 10.8738 17.9749L5.56148 20.4153C5.20696 20.5782 4.81081 20.2903 4.85614 19.9029L5.53549 14.0964C5.58632 13.6619 5.44498 13.2269 5.1485 12.9053L1.18593 8.60711C0.921493 8.32027 1.07281 7.85457 1.45535 7.77794L7.18757 6.62973C7.61645 6.54383 7.98648 6.27499 8.20072 5.89364L11.0641 0.796788Z"
                  stroke="#C8C8C8"></path>
            </svg>
          </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import moment from "moment";
const props = defineProps(['item']);

const {item} = props;
const isFavorite = ref(false);

const toggleFavorite = (e) => {
  isFavorite.value = !isFavorite.value;
}
</script>

<style scoped>

.params-box.is_open{
  display: block;
}

</style>