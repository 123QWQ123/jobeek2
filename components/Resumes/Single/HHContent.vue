<template>
  <div class="favorites-card favorites-card--footer-only">
    <div class="favorites-card-footer">
      <div
        class="favorites-card-footer-row telephones-row"
        :style="{ display: isContactsShown }"
      >
        <ul v-if="vacancyPhones.length > 0">
          <li v-for="phone in vacancyPhones">
            <a class="tel" :href="getPhoneHref(phone)">
              <img src="~/assets/img/svg/carbon_phone.svg" alt="#" />+7
              {{ phone }}
            </a>
          </li>
        </ul>
        <p v-else>Нет контактов</p>
      </div>
      <div class="favorites-card-footer-row">
        <div class="group">
          <button class="group-action btn button-md">Откликнуться</button>
          <button
            v-if="isContactsShown === 'none'"
            @click="toggleContactsVisibility"
            class="group-action btn button-md js-show-contacts"
          >
            Показать контакты
          </button>
          <button
            v-if="isContactsShown !== 'none'"
            @click="toggleContactsVisibility"
            class="group-action btn button-md js-show-contacts"
          >
            Скрыть контакты
          </button>
        </div>
        <div class="group">
          <button
            class="group-action ic-btn fav-btn"
            :class="{ active: isFavorite }"
            @click="toggleFavorite"
          >
            <svg
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0641 0.796788C11.2552 0.45665 11.7448 0.456649 11.9359 0.796789L14.7993 5.89364C15.0135 6.27499 15.3835 6.54383 15.8124 6.62973L21.5446 7.77794C21.9272 7.85457 22.0785 8.32027 21.8141 8.60711L17.8515 12.9053C17.555 13.2269 17.4137 13.6619 17.4645 14.0964L18.1439 19.9029C18.1892 20.2903 17.793 20.5782 17.4385 20.4153L12.1262 17.9749C11.7287 17.7923 11.2713 17.7923 10.8738 17.9749L5.56148 20.4153C5.20696 20.5782 4.81081 20.2903 4.85614 19.9029L5.53549 14.0964C5.58632 13.6619 5.44498 13.2269 5.1485 12.9053L1.18593 8.60711C0.921493 8.32027 1.07281 7.85457 1.45535 7.77794L7.18757 6.62973C7.61645 6.54383 7.98648 6.27499 8.20072 5.89364L11.0641 0.796788Z"
                stroke="#C8C8C8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="has-sidebar has-sidebar--v3">
    <div class="content">
      <div class="vacancy-single">
        <div class="vacancy-single-head">
          <h1 class="title">{{ item?.name }}</h1>
          <div class="adress">
            <span>{{ item.address }}</span>
          </div>
          <div class="requirements">
            {{ item.experience && item.experience + "," }}
            {{ item.education && item.education + "," }} {{ item.work_type }},
            {{ moment.unix(item.published_date).format("YYYY.MM.DD") }}
          </div>
          <div class="salary">
            {{ $formatNumber(item.salary_from, {}) }} —
            {{ $formatNumber(item.salary_to, {}) }} руб./месяц
          </div>
        </div>
        <div class="vacancy-single-body" v-html="item.description"></div>
        <div class="vacancy-single-footer">
          <button class="btn button-accent button-accent--ts-bigger">
            Откликнуться
          </button>
        </div>
      </div>
    </div>
    <aside class="sidebar">
      <div class="company-col sticky-item">
        <div class="company-logo">
          <img class="w-100" :src="employerLogo" :alt="item.company" />
        </div>
        <h3 class="title">{{ item.company }}</h3>
        <div class="count">{{ item.open_vacancies ?? 0 }} вакансии</div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import moment from "moment";
import { useVacancyStore } from "../../../store/vacancy";
import Swal from "sweetalert2";
const { item } = defineProps({
  item: {
    required: true,
  },
});
const { $formatNumber } = useNuxtApp();

const isFavorite = ref(item.is_favorite ?? false);

const vacancyStore = useVacancyStore();
const { addToFavorite, removeFromFavorite } = vacancyStore;
const toggleFavorite = async () => {
  let response = {};
  if (!isFavorite.value === true) {
    response = await addToFavorite({ id: item.id, provider: item.provider });
  } else {
    response = await removeFromFavorite({
      id: item.id,
      provider: item.provider,
    });
  }
  if (response.status === "success") {
    isFavorite.value = !isFavorite.value;
  } else {
    Swal.fire({
      title: "Ошибка!",
      text: response.message,
      icon: "error",
      confirmButtonText: "ОК",
    });
  }
};
const isContactsShown = ref("none");
const toggleContactsVisibility = () => {
  if (isContactsShown.value === "block") {
    isContactsShown.value = "none";
  } else {
    isContactsShown.value = "block";
  }
};
const vacancyPhones = computed(() => {
  return item.contacts.phones;
});
const getPhoneHref = (phone) => {
  return "href: +" + phone;
};

const employerLogo = computed(() => {
  if (item && item.logo) {
    return item.logo;
  } else return new URL("/assets/img/logos/superjob.svg", import.meta.url);
});
</script>

<style scoped></style>
