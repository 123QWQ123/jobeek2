<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Детали вакансии({{ isChanged }})</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{ collapse: isCollapsed }">
        <div class="input-row" v-if="!state.name.is_hidden">
          <label>Название:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput name="name" placeholder="Введите" />
          </div>
        </div>

        <div class="input-row">
          <label for="description">Описание:<b>*</b></label>
          <div class="input-wrapper">
            <VeeTipTapRichEditor name="description" />
          </div>
        </div>

        <div class="input-row" v-if="!state.work_type_id.is_hidden">
          <label>Тип работы:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.work_types_formatted"
              name="work_type_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.experience_id.is_hidden">
          <label>Опыт:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.experiences_formatted"
              name="experience_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.accept_kids.is_hidden">
          <label>Соискатель старше 14 лет:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="accept_kids"
              label="Соискатель старше 14 лет. Указание, что вакансия доступна для соискателей старше 14 лет          "
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.accept_temporary.is_hidden">
          <label>Временное трудоустройство:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="accept_temporary"
              label="Временное трудоустройство. указание, что вакансия доступна с временным трудоустройством"
            />
          </div>
        </div>
        <div
          class="input-row"
          v-if="!state.accept_incomplete_resumes.is_hidden"
        >
          <label>Неполное резюме:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="accept_incomplete_resumes"
              label="Неполное резюме. разрешен ли отклик на вакансию неполным резюме"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.accept_handicapped.is_hidden">
          <label>Соискатель с инвалидностью:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="accept_handicapped"
              label="Соискатель с инвалидностью. Указание, что вакансия доступна для соискателей с инвалидностью"
            />
          </div>
        </div>
        <div class="input-row" v-if="!state.accept_handicapped.is_hidden">
          <label>Сопроводительное письмо:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="response_letter_required"
              label="Сопроводительное письмо Обязательно ли заполнять сообщение при отклике на вакансию"
            />
          </div>
        </div>
        <div class="input-row" v-if="!state.accept_handicapped.is_hidden">
          <label>Разрешение сообщений:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="allow_messages"
              label="Разрешение сообщений. возможность переписки с кандидатами по данной вакансии"
            />
          </div>
        </div>
        <div class="input-row" v-if="!state.accept_handicapped.is_hidden">
          <label>Уведомлять ли менеджера:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="response_notifications"
              label="Уведомлять ли менеджера о новых откликах"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.schedule_id.is_hidden">
          <label>график работы:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.schedules_formatted"
              name="schedule_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.working_days_id.is_hidden">
          <label>рабочие дни:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.working_days_formatted"
              name="working_days_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.with_zp.is_hidden">
          <label>Зарплата.ру:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="with_zp"
              label="Вашу вакансию увидят больше людей. Мы разместим ее дополнительно на сервисе Зарплата.ру"
            />
          </div>
        </div>
        <div
          class="input-row"
          v-if="!state.working_time_intervals_id.is_hidden"
        >
          <label>временной интервал работы из справочника:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.working_time_intervals_formatted"
              name="working_time_intervals_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row" v-if="!state.working_time_modes_id.is_hidden">
          <label>режимы времени работы из справочника:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.working_time_modes_formatted"
              name="working_time_modes_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.refresh_vac.is_hidden">
          <label>Обновлять автоматически:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="refresh_vac"
              label="Обновлять ли вакансию автоматически"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.extend_vac_id.is_hidden">
          <label>Продлевать ли вакансию:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.extend_vac_formatted"
              name="extend_vac_id"
              label="Выберите"
            />
          </div>
        </div>

        <div
          class="input-row"
          v-if="!state.resume_subscription_status.is_hidden"
        >
          <label>подписку на резюме:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="resume_subscription_status"
              label="Включить ли подписку на резюме"
            />
          </div>
        </div>

        <!--        <CreateVacancySubscriptionKeywords-->
        <!--          v-if="!state.subscriptionKeywords.is_hidden"-->
        <!--          v-model="state.subscriptionKeywords.val"-->
        <!--          :errors="errors"-->
        <!--        />-->

        <div class="input-row" v-if="!state.place_of_work_id.is_hidden">
          <label>Место работы:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.place_of_works_formatted"
              name="place_of_work_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row" v-if="!state.education_id.is_hidden">
          <label>Образование:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.educations_formatted"
              name="education_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row" v-if="!state.marital_status_id.is_hidden">
          <label>Семейное положение:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.marital_statuses_formatted"
              name="marital_status_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.children_id.is_hidden">
          <label>Наличие детей:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.children_formatted"
              name="children_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.gender_id.is_hidden">
          <label>Пол:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.genders_formatted"
              name="gender_id"
              label="Выберите"
            />
          </div>
        </div>

        <div
          class="input-row"
          v-if="!state.covid_vaccination_requirement_id.is_hidden"
        >
          <label>COVID-19:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.covid_vaccination_requirement_formatted"
              name="covid_vaccination_requirement_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.move_able.is_hidden">
          <label>Релокация:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="move_able"
              label="Рассматриваются соискатели из других городов"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.video_url.is_hidden">
          <label>Ссылка на видеовакансию :</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput name="video_url" placeholder="URL" />
            <p class="text-secondary mt-1">
              поддерживаются ссылки на Youtube и Vimeo
            </p>
          </div>
          <!--          <youtube-iframe v-if="state.video_url.val" :video-id="videoUrlID" />-->
        </div>
        <div
          class="input-row"
          v-if="!state.age_from.is_hidden && !state.age_to.is_hidden"
        >
          <label for="remote-work">Возрасть</label>
          <div class="input-wrapper">
            <div class="c2">
              <div>
                <CreateVacancyTextInput
                  v-if="!state.age_from.is_hidden"
                  name="age_from"
                  placeholder="От"
                />
              </div>
              <div>
                <CreateVacancyTextInput
                  v-if="!state.age_to.is_hidden"
                  name="age_to"
                  placeholder="До"
                />
              </div>
            </div>
          </div>
        </div>
        {{ values }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";
import { z } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import useProviders from "~/composables/useProviders.js";

const props = defineProps({
  title: {
    default: "-",
    required: false,
  },
});

const { providers } = useProviders();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);
const { updateVacancy, updateDraft, getMyVacancy } = vacancyStore;

const { employer } = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

function YouTubeGetID(url) {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

const videoUrlID = computed(() => {
  return YouTubeGetID(state.video_url.val);
});
const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const schema = computed(() => {
  // if (providers.value.hh === true && providers.value.superjob === false) {
  //   return z.object({
  //     salary: z.number(),
  //     currency: z.string().nullable().optional(),
  //     place_of_work_id: z.number().nullable(),
  //     work_types: z.array(z.number()).nonempty(),
  //     schedules: z.array(z.number()).nonempty(),
  //   });
  // }
  // if (providers.value.hh === false && providers.value.superjob === true) {
  //   return z.object({
  //     title: z.string().nullable().optional(),
  //     salary: z.number().min(2),
  //     currency: z.string().nullable(),
  //     place_of_work_id: z.number().nullable(),
  //     professional_roles: z.array(z.number()).nonempty(),
  //     work_types: z.array(z.number()).nonempty(),
  //     schedules: z.array(z.number()).nonempty(),
  //   });
  // }
  return z.object({
    providers: z.array(z.number()).array().nonempty(),
    name: z.string().min(2),
    description: z.string().min(2),
    work_type_id: z.number().optional(),
    experience_id: z.number().optional(),
    accept_kids: z.boolean().optional(),
    accept_temporary: z.boolean().optional(),
    accept_incomplete_resumes: z.boolean().optional(),
    accept_handicapped: z.boolean().optional(),
    allow_messages: z.boolean().optional(),
    schedule_id: z.number().optional().optional(),
    response_notifications: z.boolean().optional(),
    working_days_id: z.number().optional(),
    with_zp: z.boolean().optional(),
    response_letter_required: z.boolean().optional(),
    working_time_intervals_id: z.number().optional(),
    working_time_modes_id: z.number().optional(),
    refresh_vac: z.boolean().optional(),
    extend_vac_id: z.number().optional(),
    resume_subscription_status: z.boolean().optional(),
    subscriptionKeywords: z
      .array(
        z.object({
          keyword: z.string(),
          srws: z.string(),
          skwc: z.string(),
          is_hidden: z.boolean(),
        }),
      )
      .nullable(),
    place_of_work_id: z.number().optional(),
    education_id: z.number().optional(),
    marital_status_id: z.number().optional(),
    children_id: z.number().optional(),
    gender_id: z.number().optional(),
    covid_vaccination_requirement_id: z.number(),
    move_able: z.boolean().optional(),
    video_url: z.string().nullable().optional(),
    age_from: z.number().optional(),
    age_to: z.number().optional(),
  });
});

const initialValues = {
  name: null,
  description: null,
  work_type_id: null,
  experience_id: null,
  accept_kids: false,
  accept_temporary: false,
  accept_incomplete_resumes: false,
  accept_handicapped: false,
  allow_messages: false,
  schedule_id: null,
  response_notifications: false,
  working_days_id: null,
  with_zp: false,
  response_letter_required: false,
  working_time_intervals_id: null,
  working_time_modes_id: null,
  refresh_vac: false,
  extend_vac_id: null,
  resume_subscription_status: false,
  subscriptionKeywords: [
    {
      keyword: null,
      srws: null,
      skwc: null,
      is_hidden: false,
    },
  ],
  place_of_work_id: null,
  education_id: null,
  marital_status_id: null,
  children_id: null,
  gender_id: null,
  covid_vaccination_requirement_id: null,
  move_able: null,
  video_url: null,
  age_from: null,
  age_to: null,
};
const {
  values,
  errors,
  meta,
  resetForm,
  setValues,
  setErrors,
  handleSubmit,
  validate,
} = useForm({
  initialValues: initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema.value),
});

const state = reactive({
  name: {
    is_hidden: false,
  },
  description: {
    is_hidden: false,
  },
  work_type_id: {
    is_hidden: false,
  },
  experience_id: {
    is_hidden: false,
  },
  accept_kids: {
    is_hidden: false,
  },
  accept_temporary: {
    is_hidden: false,
  },
  accept_incomplete_resumes: {
    is_hidden: false,
  },
  accept_handicapped: {
    is_hidden: false,
  },
  allow_messages: {
    is_hidden: false,
  },
  schedule_id: {
    is_hidden: false,
  },
  response_notifications: {
    is_hidden: false,
  },
  working_days_id: {
    is_hidden: false,
  },
  with_zp: {
    is_hidden: false,
  },
  response_letter_required: {
    is_hidden: false,
  },
  working_time_intervals_id: {
    is_hidden: false,
  },
  working_time_modes_id: {
    is_hidden: false,
  },
  refresh_vac: {
    is_hidden: false,
  },
  extend_vac_id: {
    is_hidden: false,
  },
  resume_subscription_status: {
    is_hidden: false,
  },
  subscriptionKeywords: {
    keyword: {
      is_hidden: false,
    },
    srws: {
      is_hidden: false,
    },
    skwc: {
      is_hidden: false,
    },
    is_hidden: false,
  },
  place_of_work_id: {
    is_hidden: false,
  },
  education_id: {
    is_hidden: false,
  },
  marital_status_id: {
    is_hidden: false,
  },
  children_id: {
    is_hidden: false,
  },
  gender_id: {
    is_hidden: false,
  },
  covid_vaccination_requirement_id: {
    is_hidden: false,
  },
  move_able: {
    is_hidden: false,
  },
  video_url: {
    is_hidden: false,
  },
  age_from: {
    is_hidden: false,
  },
  age_to: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    name: true,
    description: true,
    work_type_id: false,
    experience_id: false,
    accept_kids: false,
    accept_temporary: false,
    accept_incomplete_resumes: false,
    allow_applicant_without_resume: null,
    accept_handicapped: false,
    allow_messages: false,
    schedule_id: false,
    response_notifications: false,
    working_days_id: false,
    with_zp: false,
    response_letter_required: false,
    working_time_intervals_id: false,
    working_time_modes_id: false,
    refresh_vac: null,
    extend_vac_id: null,
    resume_subscription_status: null,
    subscriptionKeywords: {
      keyword: null,
      srws: null,
      skwc: null,
      is_hidden: false,
    },
    place_of_work_id: null,
    education_id: null,
    marital_status_id: null,
    children_id: null,
    gender_id: null,
    covid_vaccination_requirement_id: null,
    move_able: null,
    video_url: null,
    age_from: null,
    age_to: null,
  },
  superjob: {
    name: true,
    description: true,
    work_type_id: false,
    experience_id: false,
    accept_kids: null,
    accept_temporary: null,
    accept_incomplete_resumes: null,
    allow_applicant_without_resume: null,
    accept_handicapped: null,
    allow_messages: null,
    schedule_id: false,
    response_notifications: null,
    working_days_id: null,
    with_zp: null,
    response_letter_required: null,
    working_time_intervals_id: null,
    working_time_modes_id: null,
    refresh_vac: false,
    extend_vac_id: false,
    resume_subscription_status: false,
    subscriptionKeywords: {
      keyword: true,
      srws: true,
      skwc: true,
      is_hidden: true,
    },
    place_of_work_id: false,
    education_id: false,
    marital_status_id: false,
    children_id: false,
    gender_id: false,
    covid_vaccination_requirement_id: true,
    move_able: false,
    video_url: false,
    age_from: false,
    age_to: false,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
walkThroughFields(providers.value);

onMounted(() => {
  walkThroughFields(providers.value);
});

const sectionData = ref({});
const getFields = (newObject) => {
  return {
    ...initialValues,
    name: newObject.name,
    description: newObject.description,
    accept_kids: newObject.accept_kids ?? false,
    accept_handicapped: newObject.accept_handicapped ?? false,
    accept_incomplete_resumes: newObject.accept_incomplete_resumes ?? false,
    response_letter_required: newObject.response_letter_required ?? false,
    allow_messages: newObject.allow_messages ?? false,
    response_notifications: newObject.response_notifications ?? false,
    work_type_id: newObject.work_type?.id,
    experience_id: newObject.experience?.id,
    accept_temporary: newObject.accept_temporary ?? false,
    schedule_id: newObject.schedule?.id,
    working_days_id: newObject.working_days?.id,
    working_time_intervals_id: newObject.working_time_intervals?.id,
    working_time_modes_id: newObject.working_time_modes?.id,
    refresh_vac: newObject.refresh_vac ?? false,
    extend_vac_id: newObject.extend_vac?.id,
    resume_subscription_status: newObject.resume_subscription_status ?? false,
    place_of_work_id: newObject.place_of_work?.id,
    education_id: newObject.education?.id,
    marital_status_id: newObject.marital_status?.id,
    children_id: newObject.children?.id,
    gender_id: newObject.gender?.id,
    covid_vaccination_requirement_id:
      newObject.covid_vaccination_requirement?.id,
    move_able: newObject.move_able ?? false,
    video_url: newObject.video_url ?? undefined,
    age_from: newObject.age_from ?? undefined,
    age_to: newObject.age_to ?? undefined,
  };
};
watch(
  () => vacancyStore.my_vacancy,
  (newData) => {
    if (newData) {
      sectionData.value = getFields(newData);
    }
  },
);
onMounted(() => {
  const newData = vacancyStore.my_vacancy;
  if (newData) {
    sectionData.value = getFields(newData);
  }
});

watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
    }
  },
);
const dictionaryStore = useDictionaryStore();
const {
  getWorkTypes,
  getExperiences,
  getSchedules,
  getWorkingDayOptions,
  getWorkingTimeIntervalsOptions,
  getWorkingTimeModesOptions,
  getExtendVacOptions,
  getPlaceOfWorks,
  getEducations,
  getMaritalStatus,
  getChildren,
  getGenders,
  getCovidVacRequirements,
} = dictionaryStore;

onMounted(() => {
  setTimeout(async () => {
    await getWorkTypes();
    await getExperiences();
    await getSchedules();
    await getWorkingDayOptions();
    await getWorkingTimeIntervalsOptions();
    await getWorkingTimeModesOptions();
    await getExtendVacOptions();
    await getPlaceOfWorks();
    await getEducations();
    await getMaritalStatus();
    await getChildren();
    await getGenders();
    await getCovidVacRequirements();
  }, 500);
});
const onAddressSearch = async (newString) => {
  console.log(newString);
};
const { handleErrorResponse } = useFormValidation();
const isFocused = ref(false);
const isLoading = ref(false);
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  validate();
  if (!meta.value.dirty) {
    return true;
  }

  if (!meta.value.valid) {
    errorMessage.value = "Запольните все поля";
    return false;
  }
  isLoading.value = true;
  setErrors({});
  errorMessage.value = "";
  let resData = { ...values };

  jsonData.action = "UpdateAdvancedField";
  if (draftID.value) {
    resData = await updateDraft(draftID.value, jsonData);
  } else {
    resData = await updateVacancy(vacancyID.value, jsonData);
  }

  isUpdated.value = true;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  resetForm({ values });
  isSaved.value = false;
  isUpdated.value = false;
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
};
const isCompleted = computed(() => {
  const myVacancy = my_vacancy.value;
  if (myVacancy && !isCollapsed.value) {
    return myVacancy.address && myVacancy.address.address;
  }
  return false;
});

defineExpose({
  save,
});
</script>

<style>
.from-to-block {
}
</style>
