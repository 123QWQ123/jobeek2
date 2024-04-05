<template>
  <div>
    <div class="company-col">
      <div class="favorites-card-footer-row">
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

      <div class="company-logo">
        <img class="w-100" :src="employerLogo" :alt="data.company" />
      </div>
      <h3 class="title">{{ data.company }}</h3>
      <p>Клиент SuperJob с 2003 года</p>
      <p>{{ data.vacancy_count ?? 0 }} вакансии</p>
      <p v-html="data.company_activity"></p>
      <div class="count">123 вакансии</div>
      <div class="grade-box-container">
        <div class="title">Оценки сотрудников</div>
        <div class="grade-box">
          <div class="grade-box-circle">
            <svg
              class="progress"
              data-complete="0.75"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-1 -1 34 34"
            >
              <circle
                cx="16"
                cy="16"
                r="15.9155"
                class="progress-bar__background"
              ></circle>
              <circle
                cx="16"
                cy="16"
                r="15.9155"
                class="progress-bar__progress js-progress-bar"
                style="stroke-dashoffset: 25px"
              ></circle>
            </svg>
            <span>7.5</span>
          </div>
          <div class="grade-box-text">
            <strong>Хорошо</strong><a href="#">12 отзывов </a>
          </div>
        </div>
        <span class="txt">55% рекомендуют компанию</span>
      </div>
    </div>
    <div class="company-col">
      <span class="select-resume-title title">Мои резюме</span>
      <div class="select-resume-row">
        <div class="custom-select-wrapper">
          <CustomSelectWithRadio
            label="Выберите резюме"
            v-model="selectedResume"
            :options="myResumeOptions"
          />
          <button
            id="apply-button"
            class="btn apply-button button-accent"
            :disabled="!selectedResume"
            @click.prevent="onSubmit"
          >
            Откликнуться
          </button>
        </div>
        <span class="text text-danger">
          {{ selectedResumeError }}
        </span>
      </div>

      <textarea
        class="form-control mt-1"
        v-model="responseLetter"
        v-if="requiredLetter"
        placeholder="Cопроводительное письмо"
      >
      </textarea>
    </div>
    <div class="company-col">
      <div
        class="telephones-row telephones-row-handle"
        :class="{ open: isContactsShown }"
      >
        <ul v-if="vacancyPhones.length > 0">
          <li v-for="phone in vacancyPhones">
            <a class="tel" :href="getPhoneHref(phone)">
              <img src="~/assets/img/svg/carbon_phone.svg" alt="#" />
              {{ phone }}
            </a>
          </li>
        </ul>
      </div>

      <button
        v-if="!isContactsShown"
        @click="toggleContactsVisibility"
        class="group-action btn button-md js-show-contacts"
      >
        Показать контакты
      </button>
      <button
        v-if="isContactsShown"
        @click="toggleContactsVisibility"
        class="group-action btn button-md js-show-contacts"
      >
        Скрыть контакты
      </button>
    </div>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import Swal from "sweetalert2";
import { useResumeStore } from "~/store/resume.js";
import { toast } from "vue3-toastify";
import { ref } from "vue";

const props = defineProps({
  data: {
    required: true,
  },
});
const { data } = storeToRefs(props);
const isFavorite = ref(data.value.is_favorite ?? false);

const vacancyStore = useVacancyStore();
const { addToFavorite, removeFromFavorite } = vacancyStore;
const toggleFavorite = async () => {
  let response = {};
  if (!isFavorite.value === true) {
    response = await addToFavorite({ id: data.value.id, provider: "hh" });
  } else {
    response = await removeFromFavorite(item.id, { provider: "hh" });
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

const resumeStore = useResumeStore();

const { getMyResumes, submitResume } = resumeStore;
const { my_resumes } = storeToRefs(resumeStore);

await getMyResumes();

const isContactsShown = ref(false);
const selectedResume = ref(null);
const responseLetter = ref(null);
const requiredLetter = computed(() => {
  return data.value.response_letter_required ?? false;
});
// const submitResume = async (resume_id, vacancy_id, provider) => {
//   console.log(resume_id, vacancy_id, provider);
// };
const selectedResumeError = ref();
const onSubmit = async (e) => {
  if (!selectedResume.value) {
    selectedResumeError.value = "Выберите резюме чтобы откликатся";
    return;
  }
  e.preventDefault();
  if (resumeStore.my_resumes.length < 1) {
    await getMyResumes();
  }
  if (resumeStore.my_resumes.length < 1) {
    toast.info("Нет резюму чтобы откликатся.");
    return;
  }
  if (data.value.response_letter_required) {
    toast.info("Введите в полье письмо");
    return;
  }
  console.log(resumeStore.my_resumes);

  const response = await submitResume({
    vacancy_id: data.value.id,
    resume_id: selectedResume.value,
    providers: ["hh"],
  });
  console.log(response);
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

const myResumeOptions = computed(() => {
  return resumeStore.my_resumes.map((item) => ({
    name: item.title,
    value: item.id,
  }));
});
const toggleContactsVisibility = () => {
  isContactsShown.value = !isContactsShown.value;
};
const vacancyPhones = computed(() => {
  return data.value.contacts.phones ?? [];
});
const getPhoneHref = (phone) => {
  return "href: +" + phone;
};

const employerLogo = computed(() => {
  if (data.value && data.value.logo) {
    return data.value.logo;
  } else return new URL("/assets/img/logos/superjob.svg", import.meta.url);
});
</script>

<style scoped></style>
