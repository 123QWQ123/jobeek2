<script setup>
import useAlert from "~/composables/useAlert";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import useProviders from "~/composables/useProviders.js";
import { useVacancyStore } from "~/store/vacancy.js";

definePageMeta({
  layout: "cabinet",
});

const route = useRoute();

const vacancyStore = useVacancyStore();

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
const { getMyVacancy, publishVacancy, getMyDraft } = vacancyStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const vacancyID = computed(() => route.params.id);
const type = computed(() => route.query.type);

watch(
  () => route.params.id,
  (newDraftId) => {
    if (newDraftId) {
      getMyVacancy(vacancyID.value);
    }
  },
);
watch(
  () => vacancyStore.my_vacancy,
  (newDraft) => {
    if (newDraft) {
      console.log(newDraft);
      setProviders(newDraft.providers);
    }
  },
);
const pageTitle = computed(() => {
  if (vacancyID?.value) {
    return "Мое резюме";
  }
  return "Мое резюме";
});
useHead({
  title: pageTitle,
});

onMounted(async () => {
  if (vacancyID.value) {
    let resData;
    console.log(type.value);
    if (type.value === "draft") {
      resData = await getMyDraft(vacancyID.value);
    }
    if (type.value === "active") {
      resData = await getMyVacancy(vacancyID.value);
    }
    if (!resData) {
      return;
    }
    console.log(resData);
    if (resData.status === "error") {
      navigateTo({
        name: "create-vacancy",
        query: {
          ...route.query,
          message: JSON.stringify({
            type: "error",
            text: resData.message,
            redirect: "create-vacancy",
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
  if (hhPublishable.value && superjobPublishable.value) return true;
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
  () => vacancyStore.my_vacancy,
  (newObject) => {
    const { can_published } = newObject;
    if (can_published) {
      hhPublishable.value = can_published.hh ?? false;
      superjobPublishable.value = can_published.superjob ?? false;
    }
  },
);

const advanced_fields_el = ref();

// const photo_el = ref();
// const personal_fields_el = ref();
// const profession_fields_el = ref();
// const foreign_language_el = ref();
// const driver_licences_el = ref();
// const work_experience_el = ref();
// const education_el = ref();
// const courses_el = ref();
// const citizenship_el = ref();
// const knowledge_and_skills_el = ref();
// const access_el = ref();
// citizenship_el.value.save(true),

const saveAllSections = async () => {
  // console.log(family_and_citizenship_el.value.hasOwnProperty("save"));
  const promises = await Promise.all([
    // photo_el.value.save(true),
    // personal_fields_el.value.save(true),
    // profession_fields_el.value.save(true),
    // foreign_language_el.value.save(true),
    // driver_licences_el.value.save(true),
    // work_experience_el.value.save(true),
    // education_el.value.save(true),
    // courses_el.value.save(true),
    // knowledge_and_skills_el.value.save(true),
    // access_el.value.save(true),
  ]);

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
const saveAndPublishAll = async (e) => {
  e.preventDefault();
  if (!canBePublished.value) {
    toast.info("Пока вы не можете опубликовать если не заполняйте все поля!", {
      autoClose: 3000,
    });
    return;
  }

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
    isLoading.value = false;

    return;
  }

  const payload = {
    providers: paramProviders.value,
  };

  console.log(payload);
  const resData = await publishVacancy(vacancyID.value, payload);
  console.log(resData);
  // isLoading.value = false;
  if (resData.hasOwnProperty("status") && resData.status !== "success") {
    Swal.fire({
      title: "Ошибка!",
      text: resData.message,
      icon: "error",
      confirmButtonText: "ОК",
    });
    isLoading.value = false;
    errorMessage.value = resData.message;
    return;
  }

  toast.info(resData.data.message, { autoClose: 3000 });

  // setTimeout(() => {
  //   navigateTo({ name: "my-resumes" });
  // }, 500);
};
const saveAndPublishProvider = async (provider = null) => {
  // e.preventDefault();
  if (!hhPublishable.value && !superjobPublishable.value) {
    toast.info("Пока вы не можете опубликовать если не заполняйте все поля.", {
      autoClose: 3000,
    });
    return;
  }

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
    isLoading.value = false;

    return;
  }

  const payload = {
    providers: [provider],
  };

  console.log(payload);
  const resData = await publishVacancy(vacancyID.value, payload);
  console.log(resData);
  // isLoading.value = false;
  if (resData.hasOwnProperty("status") && resData.status !== "success") {
    Swal.fire({
      title: "Ошибка!",
      text: resData.message,
      icon: "error",
      confirmButtonText: "ОК",
    });
    isLoading.value = false;
    errorMessage.value = resData.message;
    return;
  }

  toast.info(resData.data.message, { autoClose: 3000 });

  // setTimeout(() => {
  //   navigateTo({ name: "my-resumes" });
  // }, 500);
};
const canOnlyOnePublished = computed(() => {
  console.log(providers.value);
  if (
    (hhPublishable.value === true || superjobPublishable.value === true) &&
    (superjobPublishable.value === false || hhPublishable.value === false)
  ) {
    return true;
  }
  return false;
});
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
          <CreateVacancyProviders v-model="providers" />

          {{ providers }}

          <CreateVacancyVeeAdvancedFieldsCard
            ref="advanced_fields_el"
            :key="`advanced_fields_el_key_${providers.hh + providers.superjob}`"
            :providers="providers"
          />
          <!--          <CreateResumePhotoCard-->
          <!--            v-if="vacancyID"-->
          <!--            ref="photo_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeVeePersonalFieldsCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`personal_fields_el_key_${providers.hh + providers.superjob}`"-->
          <!--            ref="personal_fields_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeVeeProfessionDetailsCard-->
          <!--            :key="`prof_fields_el_key_${providers.hh + providers.superjob}`"-->
          <!--            v-if="vacancyID"-->
          <!--            ref="profession_fields_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeVeeForeignLanguagesCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`languages_el_key_${providers.hh + providers.superjob}`"-->
          <!--            ref="foreign_language_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeVeeDriverLicensesCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`driver_licenses_el_${providers.hh + providers.superjob}`"-->
          <!--            ref="driver_licences_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeVeeKnowledgeAndSkillsCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`knowledge_and_skills_el_${providers.hh + providers.superjob}`"-->
          <!--            ref="knowledge_and_skills_el"-->
          <!--            :providers="providers"-->
          <!--          />-->

          <!--          <CreateResumeVeeEducationCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`education_el_${providers.hh + providers.superjob}`"-->
          <!--            ref="education_el"-->
          <!--            :providers="providers"-->
          <!--          />-->

          <!--          <CreateResumeVeeCoursesCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`courses_el_${providers.hh + providers.superjob}`"-->
          <!--            ref="courses_el"-->
          <!--            :providers="providers"-->
          <!--          />-->

          <!--          <CreateResumeVeeTestsAndExamsCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`tests_el_${providers.hh + providers.superjob}`"-->
          <!--            ref="courses_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <LazyCreateResumeVeeWorkExperienceCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`experience_el_${providers.hh + providers.superjob}`"-->
          <!--            ref="work_experience_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeVeeCitizenshipAndFamilyCard-->
          <!--            v-if="vacancyID"-->
          <!--            :key="`citizenship_el_${providers.hh + providers.superjob}`"-->
          <!--            ref="citizenship_el"-->
          <!--            :providers="providers"-->
          <!--          />-->
          <!--          <CreateResumeVeeAccessTypeCard-->
          <!--            :key="`access_el_${providers.hh + providers.superjob}`"-->
          <!--            v-if="vacancyID"-->
          <!--            ref="access_el"-->
          <!--            :providers="providers"-->
          <!--          />-->

          <p class="text-lg-end">
            При создании ваканции вы соглашаетесь с
            <a href="#">правилами работы сервиса</a> и даете согласие на
            обработку персональных данных, разрешенных для распространения
          </p>
          {{ hhPublishable }}
          <hr />
          {{ superjobPublishable }}
          <hr />
          {{ canOnlyOnePublished }}
          <div class="form-submit-container mt-2">
            <button
              class="btn btn-outline-primary"
              type="button"
              @click="saveAsDraft"
            >
              Сохранить как черновик
            </button>

            <!--            <button-->
            <!--              class="button-accent"-->
            <!--              type="submit"-->
            <!--              v-if="canOnlyOnePublished"-->
            <!--              @click.prevent="-->
            <!--                saveAndPublishProvider(-->
            <!--                  publishableProviderName.toLocaleLowerCase(),-->
            <!--                )-->
            <!--              "-->
            <!--            >-->
            <!--              <span-->
            <!--                v-if="isLoading"-->
            <!--                class="spinner-border spinner-border-sm"-->
            <!--                role="status"-->
            <!--                aria-hidden="true"-->
            <!--              ></span>-->
            <!--              Опубликовать на {{ publishableProviderName }}-->
            <!--            </button>-->
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
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.button-accent.disabled {
  filter: grayscale(180%);
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
