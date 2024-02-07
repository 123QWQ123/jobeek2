<script setup>
import useAlert from "~/composables/useAlert";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import { useResumeStore } from "~/store/resume";

definePageMeta({
  layout: "cabinet",
});

const route = useRoute();

const resumeStore = useResumeStore();
const my_resume = computed(() => resumeStore.my_resume);

const providers = ref({
  superjob: false,
  hh: false,
});

const { getMyResume, publishResume } = resumeStore;
const resumeID = computed(() => route.params.id);

watch(
  () => route.params.id,
  (newDraftId) => {
    if (newDraftId) {
      getMyResume(resumeID.value);
    }
  },
);
const pageTitle = computed(() => {
  if (resumeID?.value) {
    return "Мое резюме";
  }
  return "Мое резюме";
});
useHead({
  title: pageTitle,
});

onMounted(async () => {
  if (resumeID.value) {
    const resData = await getMyResume(resumeID.value);
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
  }
  handleAlert();
});

const error = computed(() => {
  return route.query.message;
});
const { handleAlert } = useAlert();
watch(() => route.query.message, handleAlert);

const saveAsDraft = (e) => {
  e.preventDefault();
  console.log("saved as draft");
};

const paramProviders = computed(() => {
  if (providers.value.hh && providers.value.superjob) {
    return ["hh", "superjob"];
  }
  if (providers.value.hh) {
    return ["hh"];
  }
  if (providers.value.superjob) {
    return ["superjob"];
  }
  return [];
});

const canBePublished = computed(() => {
  if (my_resume.value) {
    if (!providers.value.hh && !providers.value.superjob) {
      return false;
    }
    if (!providers.value.hh && providers.value.superjob) {
      if (my_resume.value.can_publish?.superjob) return true;
      return false;
    }
    if (providers.value.hh && !providers.value.superjob) {
      if (my_resume.value.can_publish?.hh) return true;
      return false;
    }
    if (providers.value.hh && providers.value.superjob) {
      if (
        my_resume.value.can_publish?.hh ||
        my_resume.value.can_publish?.superjob
      ) {
        return true;
      }
    }
    return false;
  }
  return false;
});

const photo_el = ref();
const personal_fields_el = ref();
const profession_fields_el = ref();
const foreign_language_el = ref();
const driver_licences_el = ref();
const work_experience_el = ref();
const education_el = ref();
const courses_el = ref();
const family_and_citizenship_el = ref();
const knowledge_and_skills_el = ref();
const access_el = ref();

const saveAllSections = async () => {
  const promises = await Promise.all([
    photo_el.value.save(true),
    personal_fields_el.value.save(true),
    profession_fields_el.value.save(true),
    foreign_language_el.value.save(true),
    driver_licences_el.value.save(true),
    work_experience_el.value.save(true),
    education_el.value.save(true),
    // courses_el.value.save(true),
    // family_and_citizenship_el.value.save(true),
    // knowledge_and_skills_el.value.save(true),
    // access_el.value.save(true),
  ]);

  console.log(promises);
  const promisesResult = promises.every((item) => item === true);

  console.log(promisesResult);
  return new Promise((resolve, reject) =>
    promisesResult ? resolve(true) : reject(false),
  );
};

const errorMessage = ref(null);
const hhErrorMessage = ref(null);
const superjobErrorMessage = ref(null);
const errors = ref([]);
const isLoading = ref(false);
const save = async (e) => {
  e.preventDefault();

  isLoading.value = true;
  const resAll = await saveAllSections();
  console.log(resAll);
  if (!resAll) {
    Swal.fire({
      title: "Ошибка!",
      text: "не все обязательные поля заполнены верно!",
      icon: "error",
      confirmButtonText: "ОК",
    });
  } else {
  }

  const payload = {
    providers: paramProviders.value,
  };

  console.log(payload);
  const resData = await publishResume(resumeID.value, payload);
  console.log(resData);
  // isLoading.value = false;
  if (resData.hasOwnProperty("status") && resData.status !== "success") {
    Swal.fire({
      title: "Ошибка!",
      text: resData.message,
      icon: "error",
      confirmButtonText: "ОК",
    });

    errorMessage.value = "";
    if (resData.hasOwnProperty("errors") && resData.errors instanceof Object) {
      const { errors: resErrors } = resData;

      const { hh, superjob } = resErrors;

      let errorItems = [];
      if (hh && hh.length > 0) {
        errorItems = hh.map((item) => item.errors);
      }

      if (superjob && superjob.length > 0) {
        errorItems = errorItems.concat(superjob.map((item) => item.errors));
      }
      errors.value = errorItems;

      console.log(errorItems);
    }
    return;
  }
  console.log(resData);

  toast.info(resData.data.message, { autoClose: 3000 });

  setTimeout(() => {
    navigateTo({ name: "my-resumes" });
  });
};

const phone = ref("");
</script>
<template>
  <main class="main cabinet my-resumes-page" role="main">
    <div class="bg-wrapper position-relative pb-5">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="update-resume">
          {{ providers }}
          <div class="errors" v-if="errors.length">
            <!--            <h4>К сожалению возникли ошибки при создании Вакансии:</h4>-->
            <p class="alert alert-info" v-for="item in errors">{{ item }}</p>
          </div>
          <CreateResumeProviders v-model="providers" />

          <CreateResumePhotoCard
            v-if="resumeID"
            ref="photo_el"
            :providers="providers"
          />
          <CreateResumeVeePersonalFieldsCard
            v-if="resumeID"
            ref="personal_fields_el"
            :providers="providers"
          />
          <!--          <CreateResumeVeeProfessionDetailsCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="profession_fields_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeForeignLanguagesCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="foreign_language_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeDriverLicensesCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="driver_licences_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeKnowledgeAndSkillsCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="knowledge_and_skills_el"-->
          <!--            :providers="providers"-->
          <!--          />-->

          <!--          <CreateResumeEducationCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="education_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeWorkExperienceCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="work_experience_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeCoursesCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="courses_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeTestsAndExamsCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="courses_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeCitizenshipAndFamilyCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="family_and_citizenship_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <LazyCreateResumeAccessTypeCard-->
          <!--            v-if="resumeID"-->
          <!--            ref="access_el"-->
          <!--            :providers="providers"-->
          <!--          />-->

          <p class="text-lg-end">
            При создании ваканции вы соглашаетесь с
            <a href="#">правилами работы сервиса</a> и даете согласие на
            обработку персональных данных, разрешенных для распространения
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
              @click.prevent="save"
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
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
@media (max-width: 768px) {
  .form-submit-container {
    flex-direction: column-reverse;
  }

  .button-accent {
    margin-bottom: 1rem;
  }
}
</style>
