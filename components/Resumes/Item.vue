<template>
  <li>
    <div class="favorites-card">
      <div class="favorites-card-head">
        <div class="company">
          <div class="company-logo">
            <img class="w-100" :src="photo" :alt="item.company" />
          </div>
          <div class="company-name">
            <NuxtLink
              :to="{
                name: 'vacancies-slug',
                params: { slug: item.id },
                query: { provider: 'hh' },
              }"
            >
              {{ item.title }}
            </NuxtLink>
            <span class="count">{{ experienceText }}</span>
          </div>
        </div>
        <div class="salary">
          {{ salaryText }}
        </div>
      </div>
      <div class="favorites-card-body">
        <div class="time-location">
          <span>{{ moment(item.published_date).format("hh:mm") }}</span
          ><strong>{{ item.city }}</strong>
        </div>
      </div>

      <ul class="list-group list-group-flush">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          Последнее место работы:

          <span class="badge bg-light p-3 text-black">
            {{ lastWorkplace }}
          </span>
        </li>
      </ul>
      <div class="favorites-card-footer">
        <div class="favorites-card-footer-row">
          <div class="group">
            <button class="group-action btn button-md">Пригласить</button>
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
  </li>
</template>

<script setup>
import moment from "moment";
import Swal from "sweetalert2";
import { useResumeStore } from "~/store/resume.js";
import { useNuxtApp } from "#app";

const props = defineProps(["item"]);
const { item } = props;

const {
  $format_number,
  $format_years,
  $format_months,
  $convert_month_to_text,
} = useNuxtApp();
const salaryText = computed(() => {
  if (item.salary) {
    return `От ${$format_number(item.salary)} ${item.currency}`;
  }
  return "По договору";
});

const experienceText = computed(() => {
  if (item && item.experience_month_count) {
    const years = $format_years(
      parseInt($format_years(item.experience_month_count / 12)),
    );
    const months = $format_months(parseInt(item.experience_month_count % 12));

    return `${years} ${months}`;
  }
  return "Нет опыт работы";
});
const lastWorkplace = computed(() => {
  if (item && item.experience) {
    const lastExperience = item.experience[0];
    if (lastExperience) {
      const { company, profession, start_year, start_month } = lastExperience;
      return `${company} * ${profession} | ${$convert_month_to_text(start_month)} ${start_year} -  `;
    }
  }
  return "Нет опыт работы";
});
const resumeDescription = computed(() => {
  if (item.description) {
    let text = item.description.slice(0, 150);
    if (item.description.length > 150) {
      text += "...";
    }
    return text;
  }
  return item.description;
});

const isFavorite = ref(item.is_favorite ?? false);

const resumeStore = useResumeStore();
const { addToFavorite, removeFromFavorite } = resumeStore;
const toggleFavorite = async () => {
  let response = {};
  if (!isFavorite.value === true) {
    response = await addToFavorite({ id: item.id, provider: "hh" });
  } else {
    response = await removeFromFavorite({ id: item.id, provider: "hh" });
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
const photo = computed(() => {
  if (item.photo) {
    return item.photo;
  } else return new URL("/assets/img/avatar.png", import.meta.url);
});
</script>

<style scoped></style>
