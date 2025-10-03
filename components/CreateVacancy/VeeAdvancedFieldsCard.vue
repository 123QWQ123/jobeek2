<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
    }"
  >
    <div class="w-box-head">
      <h3 class="title">Детали вакансии</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <transition>
      <div
        class="w-box-body"
        @click="isFocused = true"
        :class="{ collapse: isCollapsed }"
      >
        <div class="input-row">
          <label>Название:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput name="name" placeholder="Введите" />
          </div>
        </div>

        <div class="input-row">
          <label>Тип работы:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.work_types_formatted"
              name="work_type_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Опыт:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.experiences_formatted"
              name="experience_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Соискатель старше 14 лет:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="accept_kids"
              label="Соискатель старше 14 лет. Указание, что вакансия доступна для соискателей старше 14 лет          "
            />
          </div>
        </div>
        <div class="input-row">
          <label>Временное трудоустройство:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="accept_temporary"
              label="Временное трудоустройство. указание, что вакансия доступна с временным трудоустройством"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Неполное резюме:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="accept_incomplete_resumes"
              label="Неполное резюме. разрешен ли отклик на вакансию неполным резюме"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Соискатель с инвалидностью:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="accept_handicapped"
              label="Соискатель с инвалидностью. Указание, что вакансия доступна для соискателей с инвалидностью"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Сопроводительное письмо:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="response_letter_required"
              label="Сопроводительное письмо Обязательно ли заполнять сообщение при отклике на вакансию"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Разрешение сообщений:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="allow_messages"
              label="Разрешение сообщений. возможность переписки с кандидатами по данной вакансии"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Уведомлять ли менеджера:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="response_notifications"
              label="Уведомлять ли менеджера о новых откликах"
            />
          </div>
        </div>
        <div class="input-row">
          <label>график работы:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.schedules_formatted"
              name="schedule_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
          <label>рабочие дни:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.working_days_formatted"
              name="working_days_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Зарплата.ру:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="with_zp"
              label="Вашу вакансию увидят больше людей. Мы разместим ее дополнительно на сервисе Зарплата.ру"
            />
          </div>
        </div>
        <div class="input-row">
          <label>временной интервал работы из справочника:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.working_time_intervals_formatted"
              name="working_time_intervals_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
          <label>режимы времени работы из справочника:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.working_time_modes_formatted"
              name="working_time_modes_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Обновлять автоматически:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="refresh_vac"
              label="Обновлять ли вакансию автоматически"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Продлевать ли вакансию:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.extend_vac_formatted"
              name="extend_vac_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
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

        <div class="input-row">
          <label>Место работы:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.place_of_works_formatted"
              name="place_of_work_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Образование:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.educations_formatted"
              name="education_id"
              label="Выберите"
            />
          </div>
        </div>
        <div class="input-row">
          <label>Семейное положение:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.marital_statuses_formatted"
              name="marital_status_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Наличие детей:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.children_formatted"
              name="children_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Пол:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.genders_formatted"
              name="gender_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row">
          <label>COVID-19:</label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.covid_vaccination_requirement_formatted"
              name="covid_vaccination_requirement_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Релокация:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="move_able"
              label="Рассматриваются соискатели из других городов"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Ссылка на видеовакансию :</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput name="video_url" placeholder="URL" />
            <p class="text-secondary mt-1">
              поддерживаются ссылки на Youtube и Vimeo
            </p>
          </div>
          <!--          <youtube-iframe v-if="state.video_url.val" :video-id="videoUrlID" />-->
        </div>
        <div class="input-row">
          <label for="remote-work">Возраст</label>
          <div class="input-wrapper">
            <div class="c2">
              <div>
                <CreateVacancyTextInput
                  name="age_from"
                  type="number"
                  placeholder="От"
                />
              </div>
              <div>
                <CreateVacancyTextInput
                  name="age_to"
                  type="number"
                  placeholder="До"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="input-row">
          <label for="description">Описание:<b>*</b></label>
          <div class="input-wrapper">
            <VeeTipTapRichEditor
              name="description"
              :value="my_vacancy?.description"
            />
          </div>
        </div>
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
import { zod } from "~/hooks/ru-zod.js";
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

const objectID = computed(() => route.params.id);
const type = computed(() => route.query.type);
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

// const videoUrlID = computed(() => {
//   return YouTubeGetID(state.video_url.val);
// });
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
  return zod.object({
    name: zod.string().min(2),
    description: zod.string().min(2),
    work_type_id: zod.number().optional(),
    experience_id: zod.number().optional(),
    accept_kids: zod.boolean().optional(),
    accept_temporary: zod.boolean().optional(),
    accept_incomplete_resumes: zod.boolean().optional(),
    accept_handicapped: zod.boolean().optional(),
    allow_messages: zod.boolean().optional(),
    schedule_id: zod.number().optional().optional(),
    response_notifications: zod.boolean().optional(),
    working_days_id: zod.number().optional(),
    with_zp: zod.boolean().optional(),
    response_letter_required: zod.boolean().optional(),
    working_time_intervals_id: zod.number().optional(),
    working_time_modes_id: zod.number().optional(),
    refresh_vac: zod.boolean().optional(),
    extend_vac_id: zod.number().optional(),
    resume_subscription_status: zod.boolean().optional(),
    // subscriptionKeywords: z
    //   .array(
    //     z.object({
    //       keyword: z.string(),
    //       srws: z.string(),
    //       skwc: z.string(),
    //       is_hidden: z.boolean(),
    //     }),
    //   )
    //   .nullish()
    //   .optional(),
    place_of_work_id: zod.number().optional(),
    education_id: zod.number().optional(),
    marital_status_id: zod.number().optional(),
    children_id: zod.number().optional(),
    gender_id: zod.number().optional(),
    covid_vaccination_requirement_id: zod.number(),
    move_able: zod.boolean().optional(),
    video_url: zod.string().nullable().optional(),
    age_from: zod.number().optional(),
    age_to: zod.number().optional(),
  });
});

const initialValues = {
  name: my_vacancy.value.name,
  description: my_vacancy.value.description,
  accept_kids: my_vacancy.value.accept_kids ?? false,
  with_zp: my_vacancy.value.with_zp ?? false,
  accept_handicapped: my_vacancy.value.accept_handicapped ?? false,
  accept_incomplete_resumes:
    my_vacancy.value.accept_incomplete_resumes ?? false,
  response_letter_required: my_vacancy.value.response_letter_required ?? false,
  allow_messages: my_vacancy.value.allow_messages ?? false,
  response_notifications: my_vacancy.value.response_notifications ?? false,
  work_type_id: my_vacancy.value.work_type?.id,
  experience_id: my_vacancy.value.experience?.id,
  accept_temporary: my_vacancy.value.accept_temporary ?? false,
  schedule_id: my_vacancy.value.schedule?.id,
  working_days_id: my_vacancy.value.working_days?.id,
  working_time_intervals_id: my_vacancy.value.working_time_intervals?.id,
  working_time_modes_id: my_vacancy.value.working_time_modes?.id,
  refresh_vac: my_vacancy.value.refresh_vac ?? false,
  extend_vac_id: my_vacancy.value.extend_vac?.id,
  resume_subscription_status:
    my_vacancy.value.resume_subscription_status ?? false,
  place_of_work_id: my_vacancy.value.place_of_work?.id,
  education_id: my_vacancy.value.education?.id,
  marital_status_id: my_vacancy.value.marital_status?.id,
  children_id: my_vacancy.value.children?.id,
  gender_id: my_vacancy.value.gender?.id,
  covid_vaccination_requirement_id:
    my_vacancy.value.covid_vaccination_requirement?.id,
  move_able: my_vacancy.value.move_able ?? false,
  video_url: my_vacancy.value.video_url ?? undefined,
  age_from: my_vacancy.value.age_from ?? undefined,
  age_to: my_vacancy.value.age_to ?? undefined,
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

const { handleErrorResponse } = useFormValidation();
const isFocused = ref(false);
const isLoading = ref(false);
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  if (!isFocused.value || !meta.value.dirty) {
    return false;
  }

  await validate();

  if (!meta.value.valid) {
    return false;
  }
  isFocused.value = false;
  isLoading.value = true;
  setErrors({});
  errorMessage.value = "";
  let jsonData = { ...values };
  let resData = {};

  jsonData.form_data = "ADVANCED_DATA";
  if (type.value === "draft") {
    resData = await updateDraft(objectID.value, jsonData);
  } else {
    resData = await updateVacancy(objectID.value, jsonData);
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
  setErrors({});
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
