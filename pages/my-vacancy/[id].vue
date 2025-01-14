<script setup>
import useAlert from "~/composables/useAlert";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import useProviders from "~/composables/useProviders.js";
import { useVacancyStore } from "~/store/vacancy.js";

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
const { getMyVacancy, publishDraft, getMyDraft } = vacancyStore;
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
      setProviders(newDraft.providers);
    }
  },
);
const pageTitle = computed(() => {
  if (my_vacancy.value) {
    return "Jobeek - " + my_vacancy.value.name;
  }
  return "Jobeek - ";
});
useHead({
  title: pageTitle,
});

onMounted(async () => {
  if (vacancyID.value) {
    let resData;
    if (type.value === "draft") {
      resData = await getMyDraft(vacancyID.value);
    }
    if (type.value === "active") {
      resData = await getMyVacancy(vacancyID.value);
    }

    if (!resData) {
      return;
    }
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
    const { can_publish } = newObject;
    if (can_publish) {
      hhPublishable.value = can_publish.hh ?? false;
      superjobPublishable.value = can_publish.superjob ?? false;
    }
  },
);

const advanced_fields_el = ref();
const cities_el = ref();
const prof_roles_el = ref();
const driver_licences_el = ref();

const saveAllSections = async () => {
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
  if (!canOnlyOnePublished.value) {
    toast.info("Пока вы не можете опубликовать если не заполняйте все поля!", {
      autoClose: 3000,
    });
    return;
  }

  isLoading.value = true;
  const resAll = await saveAllSections();
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

  const resData = await publishDraft(vacancyID.value, payload);
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

  setTimeout(() => {
    navigateTo({ name: "my-vacancies" });
  }, 500);
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

  const resData = await publishVacancy(vacancyID.value, payload);
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
};
const canOnlyOnePublished = computed(() => {
  return (
    (hhPublishable.value === true || superjobPublishable.value === true) &&
    (superjobPublishable.value === false || hhPublishable.value === false)
  );
});
const phone = ref("");
</script>
<template>
  <main class="main cabinet my-vacancy-page" role="main">
    <div class="bg-wrapper position-relative">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="update-resume pt-4 pb-5">
          <CreateVacancyProviders v-model="providers" />

          <CreateVacancyVeeAdvancedFieldsCard
            ref="advanced_fields_el"
            :key="`advanced_fields_el_key_${providers.hh + providers.superjob}`"
            :providers="providers"
          />

          <CreateVacancyVeeCitiesCard
            ref="cities_el"
            :key="`cities_el_key_${providers.hh + providers.superjob}`"
            :providers="providers"
          />

          <CreateVacancyVeeMetroCard
            :key="`metro_el_key_${providers.hh + providers.superjob}`"
            ref="metro_el"
            :providers="providers"
          />

          <CreateVacancyVeeProfessionalRolesCard
            ref="prof_roles_el"
            :key="`prof_roles_el_key_${providers.hh + providers.superjob}`"
            :providers="providers"
          />
          <CreateVacancyVeeTypeAndUrlCard
            ref="type_el"
            :key="`type_el_key_${providers.hh + providers.superjob}`"
            :providers="providers"
          />
          <CreateVacancyVeeSalaryCard
            ref="salary_el"
            :providers="providers"
            :key="`salary_el_key_${providers.hh + providers.superjob}`"
          />

          <CreateVacancyVeeSkillsCard
            ref="skills_el"
            :providers="providers"
            :key="`skills_el_key_${providers.hh + providers.superjob}`"
          />

          <CreateVacancyAddressCard
            ref="address_el"
            :providers="providers"
            :key="`skills_el_key_${providers.hh + providers.superjob}`"
          />

          <CreateVacancyVeeDriverLicensesCard
            :key="`driver_licenses_el_${providers.hh + providers.superjob}`"
            ref="driver_licences_el"
            :providers="providers"
          />

          <CreateVacancyVeeContactsCard
            :key="`contacts_el_${providers.hh + providers.superjob}`"
            ref="contacts_el"
            :providers="providers"
          />
          <CreateVacancyVeeLanguagesCard
            :key="`languages_el_${providers.hh + providers.superjob}`"
            ref="languages_el"
            :providers="providers"
          />
          <CreateVacancyVeeBillingTypeCard
            :key="`billing_el_${providers.hh + providers.superjob}`"
            ref="billing_el"
            :providers="providers"
          />

          <p class="text-lg-end">
            При создании ваканции вы соглашаетесь с
            <a href="#">правилами работы сервиса</a> и даете согласие на
            обработку персональных данных, разрешенных для распространения
          </p>

          {{ canOnlyOnePublished }}
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
              :class="{ disabled: !canOnlyOnePublished }"
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
          <!--          <div class="form-submit-container mt-2">-->
          <!--            <button-->
          <!--              class="btn btn-outline-primary"-->
          <!--              type="button"-->
          <!--              @click="saveAsDraft"-->
          <!--            >-->
          <!--              Сохранить как черновик-->
          <!--            </button>-->

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
          <!--            <button-->
          <!--              class="button-accent"-->
          <!--              :class="{ disabled: !canBePublished }"-->
          <!--              type="submit"-->
          <!--              @click.prevent="saveAndPublishAll"-->
          <!--            >-->
          <!--              <span-->
          <!--                v-if="isLoading"-->
          <!--                class="spinner-border spinner-border-sm"-->
          <!--                role="status"-->
          <!--                aria-hidden="true"-->
          <!--              ></span>-->
          <!--              Сохранить и опубликовать-->
          <!--            </button>-->
          <!--          </div>-->
          <!--          <p-->
          <!--            class="float-end text-primary-secondary mt-2"-->
          <!--            v-if="canOnlyOnePublished"-->
          <!--          >-->
          <!--            Будет опубликовано только на-->
          <!--            <span class="text-primary">{{-->
          <!--              publishableProviderName.toUpperCase()-->
          <!--            }}</span>-->
          <!--          </p>-->
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
