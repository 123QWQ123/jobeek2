<script setup async>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter, useAsyncData, useHead } from "#imports";
import useAlert from "~/composables/useAlert";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import useProviders from "~/composables/useProviders.js";
import { useVacancyStore } from "~/store/vacancy.js";
import { useDictionaryStore } from "~/store/dictionary.js";

const route = useRoute();
const router = useRouter();

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();

const providers = ref({
  superjob: vacancyStore.providers.superjob,
  hh: vacancyStore.providers.hh,
});
const { setProviders } = useProviders();
const { handleAlert } = useAlert();

const vacancyID = computed(() => route.params.id);
const type = computed(() => route.query.type);

// Грузим справочники SSR-совместимо
useAsyncData("dictionaries", async () => {
  await dictionaryStore.getDictionaries([
    "payment_period",
    "experience",
    "vacancy_type",
    "vacancy_billing_type",
    "schedule",
    "working_days",
    "working_time_intervals",
    "working_time_modes",
    "extend_vac",
    "place_of_work",
    "education",
    "marital_status",
    "children",
    "gender",
    "covid_vaccination_requirement",
    "work_type",
    "marital_statuses",
    "lang_level_resume",
    "driver_license_types",
  ]);
});

// Грузим вакансию SSR-совместимо
const { getMyVacancy, publishDraft, getMyDraft } = vacancyStore;
const { my_vacancy } = storeToRefs(vacancyStore);

const { error: vacancyLoadError } = await useAsyncData(
  "my-vacancy",
  async () => {
    let resData;
    if (vacancyID.value) {
      resData =
        type.value === "draft"
          ? await getMyDraft(vacancyID.value)
          : await getMyVacancy(vacancyID.value);

      if (resData && resData.status === "error") {
        await router.replace({
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
  },
);

// Слежение за провайдерами
watch(
  () => providers.value,
  (newValues) => setProviders(newValues),
);
watch(
  () => my_vacancy.value,
  (newDraft) => {
    if (newDraft && newDraft.providers) {
      setProviders(newDraft.providers);
    }
  },
);

// Заголовок страницы
const pageTitle = computed(() => {
  if (my_vacancy.value?.name) {
    return "Jobeek - " + my_vacancy.value.name;
  }
  return "Jobeek";
});
useHead({ title: pageTitle });

watch(() => route.query.message, handleAlert);

const saveAsDraft = (e) => {
  if (e) e.preventDefault();
  // toast.info("Черновик сохранён (реализуйте логику).", { autoClose: 2000 });
};

const hhPublishable = computed(
  () => my_vacancy.value?.can_publish?.hh ?? false,
);
const superjobPublishable = computed(
  () => my_vacancy.value?.can_publish?.superjob ?? false,
);
const canOnlyOnePublished = computed(
  () => hhPublishable.value || superjobPublishable.value,
);

const publishableProviderName = computed(() => {
  if (hhPublishable.value) return "hh";
  if (superjobPublishable.value) return "superjob";
  return "";
});

const isLoading = ref(false);
const errorMessage = ref(null);

const saveAndPublishAll = async (e) => {
  e.preventDefault();
  if (!canOnlyOnePublished.value) {
    toast.info("Пока вы не можете опубликовать, если не заполнены все поля!", {
      autoClose: 3000,
    });
    return;
  }
  if (!providers.value.hh && !providers.value.superjob) {
    toast.error("Выберите провайдера для публикации!", {
      autoClose: 3000,
    });
    return;
  }

  isLoading.value = true;
  errorMessage.value = null;

  try {
    const payload = {
      providers: [
        providers.value.hh ? "hh" : null,
        providers.value.superjob ? "superjob" : null,
      ].filter((item) => item),
    };
    const resData = await publishDraft(vacancyID.value, payload);

    if (resData?.status !== "success") {
      await Swal.fire({
        title: "Ошибка!",
        text: resData.message || "Ошибка при публикации",
        icon: "error",
        confirmButtonText: "ОК",
      });
      errorMessage.value = resData.message;
      return;
    }
    toast.info(resData.data.message, { autoClose: 3000 });
    router.push({ name: "my-vacancies" });
  } catch (error) {
    errorMessage.value = error.message || "Произошла ошибка";
  } finally {
    isLoading.value = false;
  }
};
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
          <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
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
