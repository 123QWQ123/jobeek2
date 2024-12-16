<template>
  <li>
    <div class="favorites-card resume-card-t2">
      <div class="resume-card-t2__head">
        <div class="resume-card-t2__head-info">
          <div class="status-list">
            <span v-if="item.updated_at" style="color: #0dc267">
              Опубликовано {{ formattedUpdatedAt }}
            </span>
            <span style="color: #0dc267">{{ viewedText }}</span>
          </div>

          <a class="resume-title">
            <NuxtLink
              :to="{
                name: 'resumes-slug',
                params: { slug: item.id },
                query: { provider: item.provider || 'unknown' },
              }"
            >
              {{ item.title || "Название не указано" }}
            </NuxtLink>
          </a>

          <client-only>
            <div class="salary">{{ salaryText }}</div>
          </client-only>
        </div>

        <div class="resume-card-t2__head-img">
          <img :src="photo" :alt="item.profession || 'Нет профессии'" />
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
            <div>{{ lastWorkplace }}</div>
          </li>
          <li>
            <div>Компания, профессия, даты</div>
            <div>
              <div
                v-for="exItem in experienceItems"
                :key="exItem.dateText"
                class="rrow"
              >
                <strong>{{ exItem.company }}</strong> •
                {{ exItem.profession }} • {{ exItem.dateText }}
              </div>
            </div>
          </li>
          <li>
            <div>Основное образование</div>
            <div>{{ educationLevelText }}</div>
          </li>
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
// Import assets and libraries
import jobeekPhoto from "~/assets/img/jobeek-avatar.png";
import Swal from "sweetalert2";
import moment from "moment";
import { useResumeStore } from "~/store/resume.js";

// Define props
const props = defineProps({
  item: {
    type: Object,
    required: true, // `item` must be provided as a prop
    default: () => ({}), // Fallback to empty object if not provided
  },
});

// Access store methods
const resumeStore = useResumeStore();
const { addToFavorite, removeFromFavorite } = resumeStore;

// Computed property: Use fallback for missing photo
const photo = computed(() => props.item?.photo || jobeekPhoto);

// Computed property: Format the "viewed" text
const viewedText = computed(() => {
  if (!props.item.date_view) {
    return props.item.viewed ? "Просмотрено" : "Не просмотрено"; // Fallback for viewed status
  }
  return `Просмотрено ${moment(props.item.date_view).format("HH:mm")}`;
});

// Computed property: Format the update date
const formattedUpdatedAt = computed(() => {
  return props.item.updated_at
    ? moment(props.item.updated_at).format("DD.MM.YYYY HH:mm")
    : "Дата неизвестна"; // Fallback text for missing date
});

// Computed property: Salary text with fallback
const salaryText = computed(() => {
  if (props.item.agreement) {
    return "По договору";
  } else if (props.item.salary && props.item.currency) {
    return `От ${props.item.salary} ${props.item.currency}`;
  }
  return "Зарплата не указана"; // Fallback for missing salary
});

// Computed property: Experience text format
const experienceText = computed(() => {
  if (
    !props.item.experience_month_count ||
    props.item.experience_month_count === 0
  ) {
    return "Нет опыта";
  }
  const years = Math.floor(props.item.experience_month_count / 12);
  const months = props.item.experience_month_count % 12;
  return `${years} год(а) ${months} месяц(а)`; // "3 года 2 месяца"
});

// Computed property: Education details text
const educationLevelText = computed(() => {
  return props.item?.educations?.education_level?.name || "Не указано"; // Default: "Среднее" if not available
});

// Computed property: Format list of work experience
const experienceItems = computed(() => {
  return (props.item.experience || []).map((ex) => ({
    company: ex.company || "Неизвестная компания",
    profession: ex.profession || "Неизвестная профессия",
    dateText: `${ex.start_month && ex.start_year ? moment(`${ex.start_year}-${ex.start_month}-01`).format("MM/YYYY") : "неизвестно"} — ${
      ex.end_month && ex.end_year
        ? moment(`${ex.end_year}-${ex.end_month}-01`).format("MM/YYYY")
        : "по настоящее время"
    }`,
  }));
});

// Computed property: Last workplace details (company, role, etc.)
const lastWorkplace = computed(() => {
  const experience = props.item?.experience?.[0];
  if (!experience) {
    return "Нет опыта";
  }
  return `${experience.company || "Компания не указана"} • ${
    experience.profession || "Должность не указана"
  }`;
});

// Reactive favorite status
const isFavorite = ref(props.item.is_favorite || false);

// Toggle favorite in the store
const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      // Remove from favorite
      if (props.item.favorite_id) {
        await removeFromFavorite(props.item.favorite_id);
      }
    } else {
      // Add to favorite
      await addToFavorite({
        id: String(props.item.id),
        provider: props.item.provider || "unknown", // Default to "unknown" if provider is missing
      });
    }
    isFavorite.value = !isFavorite.value; // Update the reactive status
  } catch (error) {
    await Swal.fire("Ошибка", "Не удалось обновить избранное", "error");
  }
};
</script>
