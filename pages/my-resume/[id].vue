<script setup>
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import { useResumeStore } from "~/store/resume";
import useProviders from "~/composables/useProviders.js";
import { useDictionaryStore } from "~/store/dictionary.js";
import { useProfileStore } from "~/store/profile.js";

const route = useRoute();
const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const dictionaryStore = useDictionaryStore();

// Основные настройки и состояния
const resumeID = computed(() => route.params.id);
const { my_resume } = storeToRefs(resumeStore);
const isLoading = ref(false);
const errorMessage = ref(null);
const errors = ref({});

// Инициализация поставщиков
const providers = ref({
  superjob: false,
  hh: false,
});
const { setProviders } = useProviders();
watch(() => providers.value, setProviders);

// Объединение загрузки всех словарей и данных
const loadInitialData = async () => {
  // Загрузка основных словарей одним запросом
  await Promise.all([
    dictionaryStore.getDictionaries([
      "work_type",
      "schedule",
      "place_of_work",
      "education_type_resume",
      "preferred_contact_type",
      "education_form_resume",
      "driver_license_type",
      "resume_merged_access_type",
      "gender_resume",
      "gender",
      "relocation_type",
      "business_trip",
      "lang_level_resume",
      "marital_status_resume",
      "travel_time",
      "children_resume",
    ]),
    resumeStore.getIndustries(),
    resumeStore.getConnectedSeekerProviders(),
    profileStore.searchProfessionalRoles(),
    profileStore.searchHHProfessionalRoles(),
    profileStore.searchSuperjobProfessionalRoles(),
    // Загрузка резюме
    resumeStore.getMyResume(resumeID.value),
  ]);

  // Загрузка городов, если необходимо
  if (profileStore.cities.length === 0) {
    await profileStore.getCities();
  }
};

// Загрузка данных при монтировании
await useAsyncData("initialDataLoad", loadInitialData);

// Компьютеды для заголовка страницы
const pageTitle = computed(() => {
  return resumeID?.value && my_resume.value?.title
    ? "Jobeek - " + my_resume.value.title
    : "Мое резюме";
});

// Установка заголовка страницы
useHead({ title: pageTitle });

// Компьютеды для публикации
const hhPublishable = ref(my_resume.can_published?.hh ?? false);
const superjobPublishable = ref(my_resume.can_published?.superjob ?? false);

// Обновление состояния возможности публикации при изменении резюме
watch(
  () => resumeStore.my_resume,
  (newResume) => {
    if (newResume?.can_published) {
      hhPublishable.value = newResume.can_published.hh ?? false;
      superjobPublishable.value = newResume.can_published.superjob ?? false;
    }
  },
  { immediate: true },
);

// Мемоизированные компьютеды для публикации
const publishableProviders = computed(() => {
  const items = [];
  if (hhPublishable.value) items.push("hh");
  if (superjobPublishable.value) items.push("superjob");
  return items;
});

const canBePublished = computed(() => !!publishableProviders.value.length);

const publishableProviderName = computed(() => {
  if (hhPublishable.value) return "hh";
  if (superjobPublishable.value) return "superjob";
  return null;
});

const canOnlyOnePublished = computed(
  () => hhPublishable.value || superjobPublishable.value,
);

// Обработчики для кнопок
const saveAsDraft = (e) => {
  e.preventDefault();
};

const saveAndPublishAll = async (event) => {
  event.preventDefault();

  if (!canOnlyOnePublished.value) {
    toast.info("Пока вы не можете опубликовать если не заполняйте все поля!", {
      autoClose: 3000,
    });
    return;
  }

  isLoading.value = true;
  try {
    const payload = { providers: publishableProviders.value };
    const resData = await resumeStore.publishResume(resumeID.value, payload);

    if (resData.status !== "success") {
      errors.value = Object.assign(
        resData.errors.hh || {},
        resData.errors.superjob || {},
        resData.errors || {},
      );
      errorMessage.value = resData.message;
      return;
    }

    toast.info(resData.data.message, { autoClose: 3000 });
    navigateTo({ name: "my-resumes" });
  } catch (error) {
    errorMessage.value = error.message || "Произошла ошибка";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="main cabinet my-resume-page" role="main">
    <div class="bg-wrapper position-relative pb-5">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <div class="update-resume">
          <div class="errors" v-if="!!errorMessage">
            <p class="alert alert-info">{{ errorMessage }}</p>
          </div>
          <CreateResumeProviders
            v-model="providers"
            :providers="resumeStore.my_resume.providers"
          />

          <CreateResumeVeePersonalFieldsCard
            v-if="resumeID"
            :key="`personal_fields_el_key_${providers.hh + providers.superjob}`"
            ref="personal_fields_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeProfessionDetailsCard
            :key="`prof_fields_el_key_${providers.hh + providers.superjob}`"
            v-if="resumeID"
            ref="profession_fields_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeForeignLanguagesCard
            v-if="resumeID"
            :key="`languages_el_key_${providers.hh + providers.superjob}`"
            ref="foreign_language_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeDriverLicensesCard
            v-if="resumeID"
            :key="`driver_licenses_el_${providers.hh + providers.superjob}`"
            ref="driver_licences_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeKnowledgeAndSkillsCard
            v-if="resumeID"
            :key="`knowledge_and_skills_el_${providers.hh + providers.superjob}`"
            ref="knowledge_and_skills_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeEducationCard
            v-if="resumeID"
            :key="`education_el_${providers.hh + providers.superjob}`"
            ref="education_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeCoursesCard
            v-if="resumeID"
            :key="`courses_el_${providers.hh + providers.superjob}`"
            ref="courses_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeTestsAndExamsCard
            v-if="resumeID"
            :key="`tests_el_${providers.hh + providers.superjob}`"
            ref="courses_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeWorkExperienceCard
            v-if="resumeID"
            :key="`experience_el_${providers.hh + providers.superjob}`"
            ref="work_experience_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeCitizenshipAndFamilyCard
            v-if="resumeID"
            :key="`citizenship_el_${providers.hh + providers.superjob}`"
            ref="citizenship_el"
            :providers="providers"
            :errors="errors"
          />

          <CreateResumeVeeAccessTypeCard
            :key="`access_el_${providers.hh + providers.superjob}`"
            v-if="resumeID"
            ref="access_el"
            :providers="providers"
            :errors="errors"
          />

          <p class="text-lg-end">
            При создании резюме вы соглашаетесь с
            <a target="_blank" href="https://reg.jobeek.me/rules.pdf">
              правилами работы сервиса
            </a>
            и даете согласие на обработку персональных данных, разрешенных для
            распространения
          </p>

          <div class="form-submit-container mt-2">
            <button
              class="btn btn-outline-primary"
              type="button"
              @click="saveAsDraft"
            >
              Сохранить как черновик
            </button>
            <button
              class="button-accent"
              :class="{ disabled: !canBePublished }"
              type="submit"
              @click.prevent="saveAndPublishAll"
            >
              <span
                v-if="isLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Сохранить и опубликовать
            </button>
          </div>

          <p
            class="float-end text-primary-secondary mt-2"
            v-if="canOnlyOnePublished && publishableProviderName"
          >
            Будет опубликовано только на
            <span class="text-primary">{{
              publishableProviderName.toUpperCase()
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.button-accent.disabled {
  filter: grayscale(180%);
}

.button-accent.disabled:hover {
  background: #5375fd;
}

@media (max-width: 768px) {
  .form-submit-container {
    flex-direction: column-reverse;
  }

  .button-accent {
    margin-bottom: 1rem;
  }
}
</style>
