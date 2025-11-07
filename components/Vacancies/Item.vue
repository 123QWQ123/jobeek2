<template>
  <li>
    <div class="favorites-card">
      <div class="favorites-card-head">
        <div class="company">
          <div class="company-logo">
            <img
              class="w-100 h-100"
              :src="employerLogo"
              :alt="item.company.name"
            />
          </div>
          <div class="company-name">
            <NuxtLink
              :to="{
                name: 'vacancies-slug',
                params: { slug: item.provider_vacancy_id || item.id },
                query: { provider: item.provider },
              }"
            >
              {{ item.name }}
            </NuxtLink>
            <span class="count">{{ item.company.name }}</span>
          </div>
        </div>
        <div class="salary">{{ salaryText }}</div>
      </div>
      <div class="favorites-card-body">
        <div class="time-location">
          <span>{{
            moment(item.published_date).format("YYYY-MM-DD hh:mm")
          }}</span>
          <strong>{{ item.city.name }}</strong>
        </div>
        <div v-if="item.address?.raw" class="time-location">
          <small>{{ item.address.raw }}</small>
        </div>

        <p>{{ vacancyDescriptionText }}</p>
      </div>
      <div class="favorites-card-footer">
        <div class="favorites-card-footer-row">
          <div class="group me-auto">
            <div class="select-resume-row" v-if="isAuthenticated">
              <div class="custom-select-wrapper">
                <CustomSelectWithRadio
                  v-if="myResumeOptions?.length > 0"
                  label="Выберите резюме"
                  v-model="selectedResume"
                  :options="
                    myResumeOptions.map((option) => ({
                      name: option.title,
                      value: option.id,
                    }))
                  "
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
              <span class="text text-danger" v-if="selectedResumeError">
                {{ selectedResumeError }}
              </span>
            </div>
            <div
              v-else
              class="select-resume-row d-inline-flex justify-content-center align-items-center"
            >
              <NuxtLink class="button-accent" :to="{ name: 'sign-in' }"
                >Войти</NuxtLink
              >
              чтобы откликаться
            </div>
          </div>
          <div class="group">
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
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script async setup>
// Import core libraries and dependencies
import moment from "moment";
import { useVacancyStore } from "~/store/vacancy";
import { ref, computed } from "vue";
import { useResumeStore } from "~/store/resume.js";
import { useAuthStore } from "~/store/auth.js";

// Use the global formatting function from Nuxt context
const { $format_number } = useNuxtApp();

// Receive input property for the component
const props = defineProps(["item"]);
const { item } = props;
const disabled = ref(false);

// Compute the formatted salary text to be displayed
const salaryText = computed(() => {
  if (item.salary?.from && item.salary?.to) {
    return `${$format_number(item.salary?.from)} - ${$format_number(
      item.salary?.to,
    )} ${item.salary?.currency}`;
  } else if (item.salary?.from) {
    return `От ${$format_number(item.salary?.from)} ${item.salary?.currency}`;
  } else if (item.salary.to) {
    return `До ${$format_number(item.salary?.to)} ${item.salary?.currency}`;
  }
  return "По договору"; // Default text if no salary is defined
});

// Track whether the vacancy is marked as a favorite
const isFavorite = ref(item.is_favorite ?? false);

// Reference for storing the selected resume
const selectedResume = ref(null);

// Access the resume store and the current authentication state
const resumeStore = useResumeStore();
const { getResumesPublishedNegotiations } = resumeStore;
const isAuthenticated = computed(() => useAuthStore().isAuthed);

if (isAuthenticated.value) {
  // Generate resume options to be displayed in the dropdown
  const { data: myResumeOptions } = await useAsyncData(
    "getResumesPublishedNegotiations",
    () => {
      return getResumesPublishedNegotiations({
        provider: item.provider,
        vacancy_id: item.id,
      });
    },
  );
}

// Generate a concise description for the vacancy
const vacancyDescriptionText = computed(() => {
  const raw = item.description || "";
  // Удаляем HTML-теги (простая и быстрая очистка)
  const plain = raw.replace(/<[^>]*>/g, "").trim();
  if (plain.length > 150) {
    return plain.slice(0, 150) + "...";
  }
  return plain;
});

// Manage the error message for resume selection
const selectedResumeError = ref(null);

// Handle the submission of a resume when applying for a vacancy
const onSubmit = async () => {
  if (!selectedResume.value) {
    selectedResumeError.value = "Выберите резюме чтобы откликатся.";
    return;
  }

  await resumeStore.submitResume({
    vacancy_id: item.id,
    resume_id: selectedResume.value,
    providers: ["hh"],
  });
};

// Toggle the favorite status of the vacancy
const vacancyStore = useVacancyStore();
const toggleFavorite = async () => {
  if (disabled.value === true) {
    return;
  }
  disabled.value = true;
  try {
    if (isFavorite.value) {
      await vacancyStore.removeFromFavorite({
        id: item.id,
        provider: item.provider,
      });
    } else {
      await vacancyStore.addToFavorite({
        id: String(item.id),
        provider: item.provider,
      });
    }
    isFavorite.value = !isFavorite.value;
  } finally {
    disabled.value = false; // сброс в любом случае
  }
};

// Get the employer logo or default to a placeholder
const employerLogo = computed(() =>
  item.company.logo
    ? item.company.logo
    : new URL("/img/operators/undefined.svg", import.meta.url),
);
</script>

<style scoped></style>
