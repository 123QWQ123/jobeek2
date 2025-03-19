<script setup>
import useAlert from "~/composables/useAlert";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import { useResumeStore } from "~/store/resume";
import useProviders from "~/composables/useProviders.js";
import { useDictionaryStore } from "~/store/dictionary.js";
import { useAsyncData } from "#app";
import { useProfileStore } from "~/store/profile.js";

const route = useRoute();

const resumeStore = useResumeStore();

const providers = ref({
  superjob: false,
  hh: false,
});

const { setProviders } = useProviders();
watch(
  () => providers.value,
  (newValues) => {
    setProviders(newValues);
  },
);

const { getMyResume, publishResume, getIndustries } = resumeStore;
const { my_resume } = storeToRefs(resumeStore);
const resumeID = computed(() => route.params.id);

const profileStore = useProfileStore();
const {
  searchProfessionalRoles,
  searchHHProfessionalRoles,
  searchSuperjobProfessionalRoles,
} = profileStore;

const dictionaryStore = useDictionaryStore();
const { getDictionaries } = dictionaryStore;

const resData = await useAsyncData("my_resume" + resumeID.value, async () => {
  return await getMyResume(resumeID.value);
});
await useAsyncData("getIndustries", async () => {
  return await getIndustries();
});

const { data } = await useAsyncData("dictionaries", async () => {
  return await getDictionaries([
    "work_type",
    "schedule",
    "place_of_work",
    "education_type_resume",
    "preferred_contact_type",
    "education_form_resume",
    "driver_license_types",
    "resume_access_type_merge",
    "gender_resume",
    "gender",
    "relocation_type",
    "business_trip",
    "lang_level_resume",
    "marital_status_resume",
    "travel_time",
    "children_resume",
  ]);
});

await useAsyncData("searchProfessionalRoles", async () => {
  return await searchProfessionalRoles();
});
await useAsyncData("searchHHProfessionalRoles", async () => {
  return await searchHHProfessionalRoles();
});
await useAsyncData("searchSuperjobProfessionalRoles", async () => {
  return await searchSuperjobProfessionalRoles();
});

const pageTitle = computed(() => {
  if (resumeID?.value) {
    return "Jobeek - " + my_resume.value?.title;
  }
  return "Мое резюме";
});
useHead({
  title: pageTitle,
});

if (resData.status === "error") {
  navigateTo({
    name: "create-resume",
    query: {
      ...route.query,
      message: JSON.stringify({
        type: "error",
        text: resData.message,
        redirect: "create-resume",
      }),
    },
  });
}
const error = computed(() => {
  return route.query.message;
});
// const { handleAlert } = useAlert();
// watch(() => route.query.message, handleAlert);

const saveAsDraft = (e) => {
  e.preventDefault();
};

const publishableProviders = computed(() => {
  const items = [];
  if (hhPublishable.value) {
    items.push("hh");
  }
  if (superjobPublishable.value) {
    items.push("superjob");
  }
  return items;
});

const canBePublished = computed(() => {
  if (hhPublishable.value || superjobPublishable.value) return true;
  return false;
});

const publishableProviderName = computed(() => {
  if (hhPublishable.value === true || superjobPublishable.value === true) {
    if (hhPublishable.value) {
      return "hh";
    }
    if (superjobPublishable.value) {
      return "superjob";
    }
  }
  return null;
});
const hhPublishable = ref(false);
const superjobPublishable = ref(false);

watch(
  () => resumeStore.my_resume,
  (newResume) => {
    const { can_published } = newResume;
    if (can_published) {
      hhPublishable.value = can_published.hh ?? false;
      superjobPublishable.value = can_published.superjob ?? false;
    }
  },
);

// Reactive refs for form sections
const sectionsRefs = reactive({
  photo: ref(),
  personalFields: ref(),
  professionFields: ref(),
  foreignLanguage: ref(),
  driverLicences: ref(),
  workExperience: ref(),
  education: ref(),
  courses: ref(),
  citizenship: ref(),
  knowledgeAndSkills: ref(),
  access: ref(),
});

// Save all sections
const saveAllSections = async () => {
  const saveActions = Object.values(sectionsRefs).map((ref) =>
    ref?.value?.save(true),
  );
  try {
    await Promise.all(saveActions);
    toast("All sections saved successfully!", { type: "success" });
  } catch (error) {
    toast("Failed to save some sections.", { type: "error" });
  }
};

const errorMessage = ref(null);
const errors = ref([]);
const isLoading = ref(false);
const saveAndPublishAll = async (event) => {
  event.preventDefault();
  if (!canOnlyOnePublished.value) {
    toast.info("Пока вы не можете опубликовать если не заполняйте все поля!", {
      autoClose: 3000,
    });
    return;
  }

  isLoading.value = true;
  const resAll = await saveAllSections();
  if (!resAll) {
    await Swal.fire({
      title: "Ошибка!",
      text: "не все обязательные поля заполнены верно!",
      icon: "error",
      confirmButtonText: "ОК",
    });
    isLoading.value = false;

    return;
  }

  const payload = {
    providers: publishableProviders.value,
  };

  const resData = await publishResume(resumeID.value, payload);
  isLoading.value = false;
  if (resData.hasOwnProperty("status") && resData.status !== "success") {
    await Swal.fire({
      title: "Ошибка!",
      text: resData.message,
      icon: "error",
      confirmButtonText: "ОК",
    });
    errorMessage.value = resData.message;
    return;
  }

  toast.info(resData.data.message, { autoClose: 3000 });

  navigateTo({ name: "my-resumes" });
};

const canOnlyOnePublished = computed(() => {
  if (
    (hhPublishable.value === true || superjobPublishable.value === true) &&
    (superjobPublishable.value === false || hhPublishable.value === false)
  ) {
    return true;
  }
  return false;
});
</script>
<template>
  <main class="main cabinet my-resume-page" role="main">
    <div class="bg-wrapper position-relative pb-5">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <div class="update-resume">
          <div class="errors" v-if="errors.length">
            <!--            <h4>К сожалению возникли ошибки при создании Вакансии:</h4>-->
            <p class="alert alert-info" v-for="item in errors">{{ item }}</p>
          </div>
          <!--          ready-->
          <CreateResumeProviders
            v-model="providers"
            :providers="resumeStore.my_resume"
          />

          <CreateResumePhotoCard
            v-if="resumeID"
            ref="photo_el"
            :providers="providers"
          />
          <CreateResumeVeePersonalFieldsCard
            v-if="resumeID"
            :key="`personal_fields_el_key_${providers.hh + providers.superjob}`"
            ref="personal_fields_el"
            :providers="providers"
            :dictionaries="data"
          />
          <CreateResumeVeeProfessionDetailsCard
            :key="`prof_fields_el_key_${providers.hh + providers.superjob}`"
            v-if="resumeID"
            ref="profession_fields_el"
            :providers="providers"
          />
          <CreateResumeVeeForeignLanguagesCard
            v-if="resumeID"
            :key="`languages_el_key_${providers.hh + providers.superjob}`"
            ref="foreign_language_el"
            :providers="providers"
          />
          <CreateResumeVeeDriverLicensesCard
            v-if="resumeID"
            :key="`driver_licenses_el_${providers.hh + providers.superjob}`"
            ref="driver_licences_el"
            :providers="providers"
          />
          <CreateResumeVeeKnowledgeAndSkillsCard
            v-if="resumeID"
            :key="`knowledge_and_skills_el_${providers.hh + providers.superjob}`"
            ref="knowledge_and_skills_el"
            :providers="providers"
          />

          <CreateResumeVeeEducationCard
            v-if="resumeID"
            :key="`education_el_${providers.hh + providers.superjob}`"
            ref="education_el"
            :providers="providers"
          />

          <CreateResumeVeeCoursesCard
            v-if="resumeID"
            :key="`courses_el_${providers.hh + providers.superjob}`"
            ref="courses_el"
            :providers="providers"
          />

          <CreateResumeVeeTestsAndExamsCard
            v-if="resumeID"
            :key="`tests_el_${providers.hh + providers.superjob}`"
            ref="courses_el"
            :providers="providers"
          />
          <LazyCreateResumeVeeWorkExperienceCard
            v-if="resumeID"
            :key="`experience_el_${providers.hh + providers.superjob}`"
            ref="work_experience_el"
            :providers="providers"
          />
          <CreateResumeVeeCitizenshipAndFamilyCard
            v-if="resumeID"
            :key="`citizenship_el_${providers.hh + providers.superjob}`"
            ref="citizenship_el"
            :providers="providers"
          />
          <CreateResumeVeeAccessTypeCard
            :key="`access_el_${providers.hh + providers.superjob}`"
            v-if="resumeID"
            ref="access_el"
            :providers="providers"
          />

          <p class="text-lg-end">
            При создании резюме вы соглашаетесь с
            <a target="_blank" href="https://reg.jobeek.me/rules.pdf"
              >правилами работы сервиса</a
            >
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
            v-if="canOnlyOnePublished"
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
