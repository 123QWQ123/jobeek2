<template>
  <div>
    <div class="company-col">
      <div class="favorites-card-footer-row">
        <button
          class="group-action ic-btn fav-btn"
          :class="{ active: isFavorite }"
          @click="toggleFavorite"
          :disabled="disabled"
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
        <img class="w-100" :src="employerLogo" :alt="data.company.name" />
      </div>
      <h3 class="title">{{ data.company.name }}</h3>
      <!--      <p>Клиент SuperJob с 2003 года</p>-->
      <p>{{ data.vacancy_count ?? 0 }} вакансии</p>
      <p v-html="data.company_activity" />
    </div>

    <div class="company-col" v-if="isAuthed && provider">
      <span class="select-resume-title title">Мои резюме</span>
      <div class="select-resume-row">
        <div class="custom-select-wrapper">
          <CustomSelectWithRadio
            v-if="myResumeOptions"
            label="Выберите резюме"
            v-model="selectedResume"
            :options="
              myResumeOptions.map((item) => ({
                name: item.title,
                value: item.id,
              }))
            "
          />
          <button
            v-if="myResumeOptions && myResumeOptions.length > 0"
            class="btn apply-button button-accent"
            :disabled="!selectedResume"
            @click.prevent="onSubmit"
          >
            Откликнуться
          </button>
          <p v-else class="text">У Вас нет опубликованных резюме для отклика</p>
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
          <li v-if="data.contacts.name">
            {{ data.contacts.name }}
          </li>
          <li v-if="data.contacts.company_description">
            {{ data.contacts.company_description }}
          </li>
          <li v-if="data.contacts?.phones?.phone">
            <a class="tel" :href="`tel:+${data.contacts.phones.phone}`">
              <img src="~/assets/img/svg/carbon_phone.svg" alt="Phone" />
              {{ data.contacts.phones.phone_comment }}
            </a>
          </li>
          <li v-if="data.contacts?.phones?.additional_phone">
            <a
              class="tel"
              :href="`tel:+${data.contacts.phones.additional_phone}`"
            >
              <img src="~/assets/img/svg/carbon_phone.svg" alt="Phone" />
              {{ data.contacts.phones.additional_phone_comment }}
            </a>
          </li>
          <li v-if="data.contacts.email">
            <a class="tel" :href="`email:${data.contacts.email}`">
              {{ data.contacts.email }}
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
import { useResumeStore } from "~/store/resume.js";
import { toast } from "vue3-toastify";
import { ref, computed } from "vue";

const { data } = defineProps({
  data: {
    required: true,
  },
});

const isFavorite = ref(data.is_favorite ?? false);
const disabled = ref(false);

const vacancyStore = useVacancyStore();
const { addToFavorite, removeFromFavorite } = vacancyStore;

const authStore = useAuthStore();
const { isAuthed } = storeToRefs(authStore);

const route = useRoute();
const { provider } = route.query;

const toggleFavorite = async () => {
  if (disabled.value === true) {
    return;
  }
  disabled.value = true;
  try {
    const action = isFavorite.value ? removeFromFavorite : addToFavorite;
    const response = await action({
      id: data.id,
      provider: data.provider,
    });
    if (response.status === "success") {
      isFavorite.value = !isFavorite.value;
    } else {
      // тут можно добавить уведомление для пользователя о ошибке
      console.error("Error toggling favorite:", response.message);
    }
  } catch (error) {
    console.error("Exception during toggleFavorite:", error);
    // можно добавить уведомление для пользователя
  } finally {
    disabled.value = false; // сброс в любом случае
  }

  disabled.value = false;
};

const resumeStore = useResumeStore();
const { getResumesPublishedNegotiations, submitResume } = resumeStore;
const { my_resumes } = storeToRefs(resumeStore);

const areContactsShown = ref(false);
const selectedResume = ref(null);
const responseLetter = ref(null);
const requiredLetter = computed(() => data.response_letter_required ?? false);
const selectedResumeError = ref("");
const isContactsShown = computed(() => {
  return (
    !!data.contacts?.name ||
    data.contacts?.phones?.length > 0 ||
    !!data.contacts?.email
  );
});
if (isAuthed.value) {
  const { data: myResumeOptions } = await useAsyncData(
    "getResumesPublishedNegotiations",
    async () => {
      return await getResumesPublishedNegotiations({
        provider: data.provider,
        vacancy_id: data.id,
      });
    },
  );
}

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
    vacancy_id: data.id,
    resume_id: selectedResume.value,
    provider: data.provider,
  });

  if (response.status !== "success") {
    // todo
    console.error("Failed to submit resume:", response.message);
  }
};

const toggleContactsVisibility = () => {
  areContactsShown.value = !areContactsShown.value;
};

const employerLogo = computed(
  () =>
    data.company.logo ??
    new URL("/img/operators/undefined.svg", import.meta.url),
);
</script>

<style scoped></style>
