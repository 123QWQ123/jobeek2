<template>
  <div>
    <div class="company-col">
      <div class="favorites-card-footer-row">
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
            />
          </svg>
        </button>
      </div>

      <div class="company-logo">
        <img class="w-100" :src="employerLogo" :alt="vacancyData.company" />
      </div>
      <h3 class="title">{{ vacancyData.company }}</h3>
      <!--      <p>Клиент SuperJob с 2003 года</p>-->
      <p>{{ vacancyData.open_vacancies ?? 0 }} вакансии</p>
      <p v-html="vacancyData.company_activity" />
      <!--      <div class="count">123 вакансии</div>-->
      <!--      <div class="grade-box-container">-->
      <!--        <div class="title">Оценки сотрудников</div>-->
      <!--        <div class="grade-box">-->
      <!--          <div class="grade-box-circle">-->
      <!--            <svg class="progress" data-complete="0.75" viewBox="-1 -1 34 34">-->
      <!--              <circle-->
      <!--                cx="16"-->
      <!--                cy="16"-->
      <!--                r="15.9155"-->
      <!--                class="progress-bar__background"-->
      <!--              />-->
      <!--              <circle-->
      <!--                cx="16"-->
      <!--                cy="16"-->
      <!--                r="15.9155"-->
      <!--                class="progress-bar__progress js-progress-bar"-->
      <!--                style="stroke-dashoffset: 25px"-->
      <!--              />-->
      <!--            </svg>-->
      <!--            <span>7.5</span>-->
      <!--          </div>-->
      <!--          <div class="grade-box-text">-->
      <!--            <strong>Хорошо</strong><a href="#">12 отзывов</a>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <span class="txt">55% рекомендуют компанию</span>-->
      <!--      </div>-->
    </div>

    <div class="company-col" v-if="isAuthed">
      <span class="select-resume-title title">Мои резюме</span>
      <div class="select-resume-row">
        <div class="custom-select-wrapper">
          <CustomSelectWithRadio
            label="Выберите резюме"
            v-model="selectedResume"
            :options="myResumeOptions"
          />
          <button
            class="btn apply-button button-accent"
            :disabled="!selectedResume"
            @click.prevent="onSubmit"
          >
            Откликнуться
          </button>
        </div>
        <span class="text text-danger">{{ selectedResumeError }}</span>
      </div>
      <textarea
        v-if="requiredLetter"
        class="form-control mt-1"
        v-model="responseLetter"
        placeholder="Cопроводительное письмо"
      />
    </div>

    <div class="company-col" v-if="isAuthed && isContactsShown">
      <div :class="{ open: areContactsShown }">
        <ul>
          <li v-if="vacancyData.contacts.name">
            {{ vacancyData.contacts.name }}
          </li>
          <li v-for="phone in vacancyData.contacts.phones" :key="phone">
            <a class="tel" :href="`tel:+${phone}`">
              <img src="~/assets/img/svg/carbon_phone.svg" alt="Phone" />
              {{ phone }}
            </a>
          </li>
          <li v-if="vacancyData.contacts.email">
            <a class="tel" :href="`email:${vacancyData.contacts.email}`">
              {{ vacancyData.contacts.email }}
            </a>
          </li>
        </ul>
      </div>
      <button
        @click="toggleContactsVisibility"
        class="group-action btn button-md js-show-contacts"
      >
        {{ areContactsShown ? "Скрыть контакты" : "Показать контакты" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useAuthStore } from "~/store/auth";
import Swal from "sweetalert2";
import { useResumeStore } from "~/store/resume.js";
import { toast } from "vue3-toastify";
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  data: {
    required: true,
  },
});
const { data: vacancyData } = storeToRefs(props);
const isFavorite = ref(vacancyData.value.is_favorite ?? false);

const vacancyStore = useVacancyStore();
const { addToFavorite, removeFromFavorite } = vacancyStore;

const authStore = useAuthStore();
const { isAuthed } = storeToRefs(authStore);

const toggleFavorite = async () => {
  const action = isFavorite.value ? removeFromFavorite : addToFavorite;
  const response = await action({
    id: vacancyData.value.id,
    provider: vacancyData.value.provider,
  });

  if (response.status === "success") {
    isFavorite.value = !isFavorite.value;
  } else {
    // todo
    console.error("Error toggling favorite:", response.message);
  }
};

const resumeStore = useResumeStore();
const { getMyResumes, submitResume } = resumeStore;
const { my_resumes } = storeToRefs(resumeStore);

onMounted(getMyResumes);

const areContactsShown = ref(false);
const selectedResume = ref(null);
const responseLetter = ref(null);
const requiredLetter = computed(
  () => vacancyData.value.response_letter_required ?? false,
);
const selectedResumeError = ref("");
const isContactsShown = computed(() => {
  return (
    !!vacancyData.contacts?.name ||
    !!vacancyData.contacts?.phones ||
    !!vacancyData.contacts?.email
  );
});

const onSubmit = async (e) => {
  e.preventDefault();

  if (!selectedResume.value) {
    selectedResumeError.value = "Выберите резюме чтобы откликатся";
    return;
  }

  if (!my_resumes.value.length) {
    toast.info("Нет резюме чтобы откликатся.");
    return;
  }

  if (requiredLetter.value && !responseLetter.value) {
    toast.info("Введите сопроводительное письмо");
    return;
  }

  const response = await submitResume({
    vacancy_id: vacancyData.value.id,
    resume_id: selectedResume.value,
    providers: ["hh"],
  });

  if (response.status !== "success") {
    // todo
    console.error("Failed to submit resume:", response.message);
  }
};

const myResumeOptions = computed(() =>
  my_resumes.value.map((item) => ({ name: item.title, value: item.id })),
);

const toggleContactsVisibility = () => {
  areContactsShown.value = !areContactsShown.value;
};

const employerLogo = computed(
  () =>
    vacancyData.value.logo ??
    new URL("/assets/img/logos/superjob.svg", import.meta.url),
);
</script>

<style scoped></style>
