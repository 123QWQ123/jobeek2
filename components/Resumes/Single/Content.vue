<template>
  <div class="has-sidebar has-sidebar--v3">
    <div class="content">
      <div class="resume-single">
        <div class="resume-photoblock">
          <div class="resume-photoblock__left">
            <img src="~/assets/img/avatar_medium.jpg" alt="Превью фото" />
          </div>
          <div class="resume-phblock__right">
            <div class="resume-phblock__right-all">
              <div class="resume-phblock__right-block-position">
                <div class="resume-phblock__right-name">
                  <h1 class="resume-phblock__right-h1">{{ item.title }}</h1>
                  <span class="resume-phblock__right-time">
                    <span>{{ formattedUpdatedAt }}</span>
                  </span>
                </div>
                <span class="resume-phblock__right-price">{{
                  salaryText
                }}</span>
              </div>
              <div class="resume-phblock__right-txt">
                <span class="d-inline resume-phblock__right-year"
                  >Дата рождения: {{ item.birth_date }}</span
                >
                <span class="d-block">{{ item.area.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="resume-photoblock__sub">
          <div class="resume-photoblock__sub__left">Занятость</div>
          <div class="resume-photoblock__sub__right">полная занятость</div>
        </div>

        <div class="resume-photoblock__sub">
          <div class="resume-photoblock__sub__left">Гражданство</div>
          <div class="resume-photoblock__sub__right">
            <span v-for="citizenship in item.citizenship">{{
              citizenship.name
            }}</span>
          </div>
        </div>

        <div class="resume-photoblock__sub">
          <div class="resume-photoblock__sub__left">
            Профессиональные навыки
          </div>
          <div class="resume-photoblock__sub__right">
            <ul class="resume-photoblock-skills">
              <li>PHP 7, SQL, HTML, CSS, Python, Git, Javascript</li>
              <li>Битрикс</li>
              <li>Docker</li>
              <li>YII</li>
              <li>C++</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="resume-content">
        <div class="resume-text-box">
          <h2>Опыт работы {{ experienceText }}</h2>
          <div
            v-for="experience in item.experience"
            class="resume-content__sub"
          >
            <div class="resume-content__sub__left">
              {{ formatDate(experience) }}
            </div>
            <div class="resume-content__sub__right">
              <div class="resume-content__history">
                <h3>{{ experience.profession }}</h3>
                <div class="resume-content__sub__right_company">
                  <div>
                    <div>
                      <span class="resume-content__company-name"
                        >{{ experience.company }},
                        {{ experience.area.name }}</span
                      >
                    </div>
                    <div v-if="experience.company_url">
                      <a
                        class="resume-content__company-link"
                        rel="nofollow"
                        target="_blank"
                        :href="experience.company_url"
                        >{{ experience.company_url }}</a
                      >
                    </div>
                    <div class="resume-content__company-txt">
                      {{ experience.achievements }}
                    </div>
                  </div>
                </div>
                <div class="resume-content__sub__right_text">
                  <p><strong>Обязанности:</strong></p>
                  <p>{{ experience.responsibilities }}</p>
                  <!--                  <p><strong>Достижения:</strong></p>-->
                  <!--                  <p>-->
                  <!--                    Написал телеграмм бота для продажи конфигов на вебхуке с-->
                  <!--                    mvc-структурой. Выполнена интеграция с панелями 3xui на-->
                  <!--                    удаленных серверах и настроено автоматическое создание-->
                  <!--                    конфигов и выдача их по оплате.-->
                  <!--                  </p>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="resume-content">
        <div class="resume-text-box">
          <h2>Образование</h2>
          <div
            v-for="education in item.educations?.primary"
            class="resume-content__sub"
          >
            <div class="resume-content__sub__left">
              {{ education.type?.name }}<br />{{ education.form?.name }}<br />
              {{ education.end_year }}
            </div>
            <div class="resume-content__sub__right">
              <div class="resume-content__education">
                <a href="" class="resume-content__education-link">{{
                  education.institute
                }}</a>
                <div class="resume-content__sub__right_education">
                  <div>
                    <div>
                      <span class="resume-content__education-txt"
                        >Факультет: <a href="">{{ education.faculty }}</a></span
                      >
                      <span class="resume-content__education-txt">
                        Специальность:
                        <a href="">{{ education.profession }}</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="item.additional_information" class="resume-content">
        <div class="resume-text-box">
          <h2>Обо мне</h2>
          <p><strong>Дополнительные сведения:</strong></p>
          {{ item.additional_information }}
        </div>
      </div>

      <div v-if="item.languages.length > 0" class="resume-content">
        <div class="resume-text-box">
          <h2>Иностранные языки</h2>
          <p v-for="language in item.languages">{{ language.name }}</p>
        </div>
      </div>
    </div>
    <aside class="sidebar">
      <div v-if="item.phones.length > 0" class="company-col">
        <div
          :class="{ open: isContactsShown }"
          class="telephones-row telephones-row-handle"
        >
          <ul>
            <li v-for="phone in item.phones">
              <a class="tel" href="tel: +7 800 550 11 00">
                <img src="~/assets/img/svg/carbon_phone.svg" alt="#" />
                {{ phone }}
              </a>
            </li>
          </ul>
        </div>
        <button
          class="group-action btn button-md js-show-contacts"
          @click="toggleContactsVisibility"
        >
          {{ isContactsShown ? "Скрыть контакты" : "Показать контакты" }}
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useResumeStore } from "~/store/resume.js";
import moment from "moment";

const { item } = defineProps({
  item: {
    required: true,
  },
});

const isFavorite = ref(item.is_favorite || false);

const resumeStore = useResumeStore();
const { addToFavorite, removeFromFavorite } = resumeStore;
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
  }
};
const { $format_number } = useNuxtApp();
const salaryText = computed(() => {
  if (item.salary) {
    return `От ${$format_number(item.salary)} ${item.currency}`;
  }
  return "По договору";
});

const isContactsShown = ref(false);
const toggleContactsVisibility = () => {
  isContactsShown.value = !isContactsShown.value;
};
const vacancyPhones = computed(() => {
  return item.contacts?.phones || [];
});
const getPhoneHref = (phone) => {
  return "href: +" + phone;
};

const employerLogo = computed(() => {
  if (item && item.logo) {
    return item.logo;
  } else return new URL("/assets/img/logos/superjob.svg", import.meta.url);
});

const formatDate = (ex) => {
  return (
    (ex.start_month && ex.start_year
      ? moment(`${ex.start_year}-${ex.start_month}-01`)
          .locale("ru")
          .format("MMMM YYYY")
      : "неизвестно") +
    " — " +
    (ex.end_month && ex.end_year
      ? moment(`${ex.end_year}-${ex.end_month}-01`)
          .locale("ru")
          .format("MMMM YYYY")
      : "по настоящее время")
  );
};

// Format work experience
const experienceText = computed(() => {
  if (!item.experience_month_count || item.experience_month_count === 0) {
    return "Нет опыта";
  }
  const years = Math.floor(item.experience_month_count / 12);
  const months = item.experience_month_count % 12;
  return `${years > 0 ? `${years} год(а) ` : ""}${months} месяц(а)`;
});

// Format "updated at" date
const formattedUpdatedAt = computed(() => {
  return item.updated_at
    ? moment(item.updated_at).format("DD.MM.YYYY HH:mm")
    : "Дата неизвестна";
});
</script>

<style scoped></style>
