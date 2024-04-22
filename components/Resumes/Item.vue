<template>
  <li>
    <div class="favorites-card resume-card-t2">
      <div class="resume-card-t2__head">
        <div class="resume-card-t2__head-info">
          <div class="status-list">
            <span style="color: #0dc267">
              Опубликовано
              {{ moment(item.updated_at).format("hh:mm") }}
            </span>
            <span style="color: #0dc267">{{ viewedText }}</span>
          </div>

          <a href="#" class="resume-title">
            <NuxtLink
              :to="{
                name: 'resumes-slug',
                params: { slug: item.id },
                query: { provider: item.provider },
              }"
            >
              {{ item.title }}
            </NuxtLink>
          </a>
          <div class="salary">
            {{ salaryText }}
          </div>
          <!--          <span class="yo">30 лет</span>-->

          <div class="resume-tag">Рассматривает предложения</div>
        </div>

        <div class="resume-card-t2__head-img">
          <img :src="photo" :alt="item.profession" />
        </div>
      </div>

      <div class="resume-card-t2__body">
        <ul>
          <li>
            <div>Опыт работы</div>

            <div>{{ experienceText }}</div>
          </li>

          <li>
            <div>Последнее место работы</div>

            <div>
              <div class="rrow">
                {{ lastWorkplace }}
                <!--                <strong></strong> • PHP-программист • Ноябрь 2018 — по настоящее-->
                <!--                время-->
              </div>
            </div>
          </li>

          <li>
            <div>Названия компаний, в которых работал кандидат</div>

            <div>
              <div class="rrow" v-for="ex_item in experienceItems">
                <strong>{{ ex_item.company }}</strong> •
                {{ ex_item.profession }} •

                {{ ex_item.dateText }}
              </div>
            </div>
          </li>

          <li>
            <div>Специализации</div>

            <div>Программист, разработчик</div>
          </li>

          <!--          <li>-->
          <!--            <div>Регион и переезд</div>-->

          <!--            <div>-->
          <!--              Москва-->
          <!--              <span class="m" style="background-color: #943e90"></span> м.-->
          <!--              Полежаевская • Переезд невозможен-->
          <!--            </div>-->
          <!--          </li>-->

          <li>
            <div>Основное образование</div>

            <div>{{ educationLevelText }}</div>
          </li>

          <!--          <li>-->
          <!--            <div>Знание иностранных языков</div>-->

          <!--            <div>-->
          <!--              Родной язык — Русский • Английский, B2 — Средне-продвинутый-->
          <!--            </div>-->
          <!--          </li>-->
        </ul>
      </div>

      <div class="favorites-card-footer">
        <div class="favorites-card-footer-row">
          <div class="group" style="margin-left: auto">
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

const viewedText = computed(() => {
  if (!item.date_view) return item.viewed ? "Просмотрено" : "";
  return "Просмотрено" + moment(item.date_view).format("hh:mm");
});
const salaryText = computed(() => {
  if (!item.agreement) {
    return `От ${$format_number(item.salary)} ${item.currency}`;
  }
  return "По договору";
});
const educationLevelText = computed(() => {
  const { education_level } = props.item.educations;
  const { primary } = props.item.educations;
  let level = "Среднее";
  if (education_level) {
    level = education_level.name;
  }
  let instituteText = undefined;
  if (primary && primary.length > 0) {
    const edu = primary[0];
    const institute = edu.institute ? ", " + edu.institute : "";
    const profession = edu.profession ? ", " + edu.profession : "";
    const end_year = edu.end_year ? ", " + edu.end_year : "";
    instituteText = `${institute}${profession}${end_year}`;
  }

  if (instituteText)
    return level + `${instituteText ? ", " : ""} ${instituteText}`;
  else return level;
});

const educationPlaceText = computed(() => {
  const { education_level } = props.item.educations;
  let level = "Среднее";
  if (education_level) {
    level = education_level.name;
  }

  return level + "-" + "";
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
const formatEndDate = (end_year = null, end_month = null) => {
  if (!end_year || !end_month) return "по настоящее";
  return $convert_month_to_text(end_month) + " " + end_year;
};
const lastWorkplace = computed(() => {
  if (item && item.experience) {
    const lastExperience = item.experience[0];
    if (lastExperience) {
      const { company, profession, start_year, start_month } = lastExperience;
      return (
        `${company} * ${profession} | ${$convert_month_to_text(start_month)} ${start_year} - ` +
        formatEndDate(lastExperience.end_year, lastExperience.end_month)
      );
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

const experienceItems = ref([]);
const prepareExperienceItems = (newExperience) => {
  const items = newExperience.map((ex_item) => {
    let text = "-";
    text =
      `${$convert_month_to_text(ex_item.start_month)} ${ex_item.start_year}` +
      " - " +
      formatEndDate(ex_item.end_year, ex_item.end_month);
    return { ...ex_item, dateText: text };
  });

  experienceItems.value = items;
};
watch(() => props.item.experience, prepareExperienceItems);
prepareExperienceItems(item.experience);

const isFavorite = ref(item.is_favorite ?? false);

const resumeStore = useResumeStore();
const { addToFavorite, removeFromFavorite } = resumeStore;
const toggleFavorite = async () => {
  let response = {};
  if (!isFavorite.value === true) {
    response = await addToFavorite({
      resume_id: String(item.id),
      provider: item.provider,
    });
  } else {
    if (!item.favorite_id) {
      isFavorite.value = false;
      return;
    }
    response = await removeFromFavorite(item.favorite_id);
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
