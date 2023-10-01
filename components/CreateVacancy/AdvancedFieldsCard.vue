<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Детали вакансии</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{collapse: isCollapsed}">

        <div class="input-row" v-if="!state.name.is_hidden">
          <label>Название:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.name.val"  @focusin="() => errors.name = ''"/>
            <div class="text-danger d-block" v-if="errors.name">
              {{errors.name}}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="description">Описание:<b>*</b></label>
          <div class="input-wrapper">
            <RichEditor  v-model="state.description.val" v-if="!state.description.is_hidden"/>
            <div class="text-danger d-block" v-if="errors.description">
              {{errors.description}}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.work_type_id.is_hidden">
          <label>Тип работы:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workTypeOptions" v-model="state.work_type_id.val" :label="'Выберите'"  @focusin="() => errors.work_type_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.work_type_id">
              {{errors.work_type_id}}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.experience_id.is_hidden">
          <label>Опыт:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="experienceOptions" v-model="state.experience_id.val" :label="'Выберите'"  @focusin="() => errors.experience_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.experience_id">
              {{errors.experience_id}}
            </div>
          </div>
        </div>


        <CreateVacancyCustomCheckbox
            v-if="!state.accept_kids.is_hidden"
            v-model="state.accept_kids.val" :label="'Соискатель старше 14 лет'"
            :description="'Соискатель старше 14 лет.\n'+'Указание, что вакансия доступна для соискателей старше 14 лет'"
            :for="'accept_kids'"
            :errors="errors"
        />

        <CreateVacancyCustomCheckbox
            v-if="!state.accept_temporary.is_hidden"
            v-model="state.accept_temporary.val" :label="'Временное трудоустройство'"
            :description="'Временное трудоустройство. указание, что вакансия доступна с временным трудоустройством'"
            :for="'accept_temporary'"
            :errors="errors"
        />
        <CreateVacancyCustomCheckbox
            v-if="!state.accept_incomplete_resumes.is_hidden"
            v-model="state.accept_incomplete_resumes.val" :label="'Неполное резюме'"
            :description="'Неполное резюме. разрешен ли отклик на вакансию неполным резюме.'"
            :for="'accept_incomplete_resumes'"
            :errors="errors"
        />

        <CreateVacancyCustomCheckbox
            v-if="!state.accept_handicapped.is_hidden"
            v-model="state.accept_handicapped.val" :label="'Соискатель с инвалидностью'"
            :description="'Соискатель с инвалидностью. Указание, что вакансия доступна для соискателей с инвалидностью'"
            :for="'accept_handicapped'"
            :errors="errors"
        />
        <CreateVacancyCustomCheckbox
            v-if="!state.response_letter_required.is_hidden"
            v-model="state.response_letter_required.val" :label="'Сопроводительное письмо'"
            :description="'Сопроводительное письмо Обязательно ли заполнять сообщение при отклике на вакансию'"
            :for="'response_letter_required'"
            :errors="errors"
        />
        <CreateVacancyCustomCheckbox
            v-if="!state.allow_messages.is_hidden"
            v-model="state.allow_messages.val" :label="'Разрешение сообщений'"
            :description="'Разрешение сообщений. возможность переписки с кандидатами по данной вакансии'"
            :for="'allow_messages'"
            :errors="errors"
        />

        <CreateVacancyCustomCheckbox
            v-if="!state.response_notifications.is_hidden"
            v-model="state.response_notifications.val" :label="'Уведомлять ли менеджера'"
            :description="'Уведомлять ли менеджера о новых откликах'"
            :for="'response_notifications'"
            :errors="errors"
        />


        <div class="input-row" v-if="!state.schedule_id.is_hidden">
          <label>график работы:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="scheduleOptions" v-model="state.schedule_id.val" :label="'Выберите'"  @focusin="() => errors.schedule_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.schedule_id">
              {{ errors.schedule_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.working_days_id.is_hidden">
          <label>Рабочие дни:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workingDaysOptions" v-model="state.working_days_id.val" :label="'Выберите'"  @focusin="() => errors.working_days_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.working_days_id">
              {{ errors.working_days_id }}
            </div>
          </div>
        </div>

        <CreateVacancyCustomCheckbox
            v-if="!state.with_zp.is_hidden"
            v-model="state.with_zp.val" :label="'Зарплата.ру'"
            :description="'Вашу вакансию увидят больше людей. Мы разместим ее дополнительно на сервисе Зарплата.ру'"
            :for="'with_zp'"
            :errors="errors"
        />

        <div class="input-row" v-if="!state.working_time_intervals_id.is_hidden">
          <label>временной интервал работы из справочника:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workingTimeIntervalOptions" v-model="state.working_time_intervals_id.val" :label="'Выберите'"  @focusin="() => errors.working_time_intervals_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.working_time_intervals_id">
              {{ errors.working_time_intervals_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.working_time_modes_id.is_hidden">
          <label>режимы времени работы из справочника:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workingTimeModesOptions" v-model="state.working_time_modes_id.val" :label="'Выберите'"  @focusin="() => errors.working_time_modes_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.working_time_modes_id">
              {{ errors.working_time_modes_id }}
            </div>
          </div>
        </div>


        <CreateVacancyCustomCheckbox
            v-if="!state.refresh_vac.is_hidden"
            v-model="state.refresh_vac.val" :label="'Обновлять автоматически'"
            :description="'Обновлять ли вакансию автоматически'"
            :for="'refresh_vac'"
            :errors="errors"
        />

        <div class="input-row" v-if="!state.extend_vac_id.is_hidden">
          <label>Продлевать ли вакансию :</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="extendVacOptions" v-model="state.extend_vac_id.val" :label="'Выберите'"  @focusin="() => errors.extend_vac_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.extend_vac_id">
              {{ errors.extend_vac_id }}
            </div>
          </div>
        </div>

        <CreateVacancyCustomCheckbox
            v-if="!state.resume_subscription_status.is_hidden"
            v-model="state.resume_subscription_status.val" :label="'подписку на резюме'"
            :description="'Включить ли подписку на резюме'"
            :for="'resume_subscription_status'"
            :errors="errors"
        />

        {{state.subscriptionKeywords.val}}
        <CreateVacancySubscriptionKeywords
            v-model="state.subscriptionKeywords.val"
            :errors="errors"
        />

        <div class="input-row" v-if="!state.place_of_work_id.is_hidden">
          <label>Место работы:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="placeOfWorkOptions" v-model="state.place_of_work_id.val" :label="'Выберите'"  @focusin="() => errors.place_of_work_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.place_of_work_id">
              {{ errors.place_of_work_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.education_id.is_hidden">
          <label>Образование:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="educationOptions" v-model="state.education_id.val" :label="'Выберите'"  @focusin="() => errors.education_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.education_id">
              {{ errors.education_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.marital_status_id.is_hidden">
          <label>Семейное положение:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="maritalStatusOptions" v-model="state.marital_status_id.val" :label="'Выберите'"  @focusin="() => errors.marital_status_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.marital_status_id">
              {{ errors.marital_status_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.children_id.is_hidden">
          <label>Наличие детей:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="childrenOptions" v-model="state.children_id.val" :label="'Выберите'"  @focusin="() => errors.children_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.children_id">
              {{ errors.children_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.gender_id.is_hidden">
          <label>Пол:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="genderOptions" v-model="state.gender_id.val" :label="'Выберите'"  @focusin="() => errors.gender_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.gender_id">
              {{ errors.gender_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.covid_vaccination_requirement_id.is_hidden">
          <label>Требования к вакцинации COVID-19:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="covidVacReqOptions" v-model="state.covid_vaccination_requirement_id.val" :label="'Выберите'"  @focusin="() => errors.covid_vaccination_requirement_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.covid_vaccination_requirement_id">
              {{ errors.covid_vaccination_requirement_id }}
            </div>
          </div>
        </div>

        <CreateVacancyCustomCheckbox
            v-if="!state.move_able.is_hidden"
            v-model="state.move_able.val" :label="'Релокация'"
            :description="'Рассматриваются соискатели из других городов'"
            :for="'move_able'"
            :errors="errors"
        />


        <div class="input-row" v-if="!state.video_url.is_hidden">
          <label>Ссылка на видеовакансию (поддерживаются ссылки на Youtube и Vimeo):</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.video_url.val"  @focusin="() => errors.video_url = ''"/>
            <div class="text-danger d-block" v-if="errors.video_url">
              {{errors.video_url}}
            </div>
          </div>
        </div>

        <CreateVacancyAge v-model="age" :errors="errors"/>

      </div>
    </transition>

  </div>


</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const props = defineProps(['title', 'providers']);

// const {providers} = toRefs(props);

import {useProfileStore} from "~/store/profile";
import {useFormData} from "~/composables/useFormData";
import {useRuntimeConfig} from "#app";
import useFormValidation from "~/composables/useFormValidation";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
import {useDiff} from "~/composables/useDiff";
import {useDictionaryStore} from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const {updateVacancy, getMyVacancy} = vacancyStore;

const {employer} = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);


const state = reactive({
  name: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  description: {
    val:  "",
    isValid: true,
    is_hidden: false,
  },
  work_type_id: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  experience_id: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  accept_kids: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  accept_temporary: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  accept_incomplete_resumes: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  accept_handicapped: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  allow_messages: {
    val:  false,
    isValid: true,
    is_hidden: false
  },
  schedule_id: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  response_notifications: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  working_days_id: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  with_zp: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  response_letter_required: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  working_time_intervals_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  working_time_modes_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  refresh_vac: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  extend_vac_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  resume_subscription_status: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  subscriptionKeywords: {
    val:  [
      {
        keyword: null,
        srws: null,
        skwc: null
      }
    ],
    isValid: true,
    is_hidden: false,
  },
  place_of_work_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  education_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  marital_status_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  children_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  gender_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  covid_vaccination_requirement_id: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  move_able: {
    val:  false,
    isValid: true,
    is_hidden: false,
  },
  video_url: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  age_from: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  age_to: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  isFormValid: true,
  isNew: true,
  isLoading: false,
  error: null,
  success: null,
});


const fields = ref({
  hh: {
    accept_kids: false,
    accept_temporary: false,
    accept_incomplete_resumes: false,
    accept_handicapped: false,
    allow_messages: false,
    response_letter_required: false,
    response_notifications: false,
    with_zp: false,
    working_days: false,
    working_time_intervals: false,
    working_time_modes: false,
  },
  superjob: {
    allow_applicant_without_resume: false,
    refresh_vac: false,
    extend_vac_id: false,
    place_of_work_id: false,
    education_id: false,
    marital_status_id: false,
    covid_vaccination_requirement_id: true,
    age_from: true,
    age_to: true,
    video_url: true,
  }
});

const {walkThroughFields} = useProviderFields(state, fields);
watch(props.providers, walkThroughFields);

onMounted(() => {
  walkThroughFields(props.providers);
})

const age = ref({
  from: state.age_from.val,
  to: state.age_to.val
});

watch(() => age.value, (newAge) => {
  state.age_from.val = newAge.from;
  state.age_to.val = newAge.to;
})

watch(() => state.age_from.val, (newData) => {
  age.value.from = newData;
});
watch(() => state.age_to.val, (newData) => {
  age.value.to = newData;
});
const set = (key, val) => {
  state[key].val = val;
}

watch(() => useWatchStateValues(state, true, true),   (newState, oldState) => {
  if (!isFirst.value){
    isChanged.value = true;
  }else{
    isFirst.value = false;
  }
});

const sectionData = ref({});
watch(() => vacancyStore.my_vacancy, (newVacancy) => {
  if (isUpdated.value){
    isUpdated.value = false;
    return;
  }
  if (newVacancy){
    sectionData.value = {
      name: newVacancy.name,
      description: newVacancy.description,
      accept_kids: newVacancy.accept_kids,
      accept_handicapped: newVacancy.accept_handicapped,
      accept_incomplete_resumes: newVacancy.accept_incomplete_resumes,
      response_letter_required: newVacancy.response_letter_required,
      allow_messages: newVacancy.allow_messages,
      response_notifications: newVacancy.response_notifications,
      work_type_id: newVacancy.work_type?.id,
      experience_id: newVacancy.experience?.id,
      accept_temporary: newVacancy.accept_temporary,
      schedule_id: newVacancy.schedule?.id,
      working_days_id: newVacancy.working_days?.id,
      working_time_intervals_id: newVacancy.working_time_intervals?.id,
      working_time_modes_id: newVacancy.working_time_modes?.id,
      refresh_vac: newVacancy.refresh_vac,
      extend_vac_id: newVacancy.extend_vac?.id,
      resume_subscription_status: newVacancy.resume_subscription_status,
      place_of_work_id: newVacancy.place_of_work?.id,
      education_id: newVacancy.education?.id,
      marital_status_id: newVacancy.marital_status?.id,
      children_id: newVacancy.children?.id,
      gender_id: newVacancy.gender?.id,
      covid_vaccination_requirement_id: newVacancy.covid_vaccination_requirement?.id,
      move_able: newVacancy.move_able,
      video_url: newVacancy.video_url,
      age_from: newVacancy.age_from,
      age_to: newVacancy.age_to,
    };
  }
})

watch(() => sectionData.value, (newData, oldData) => {
  const diffData =  useDiff(newData, oldData);
  console.log(Object.keys(diffData).length);
  if (Object.keys(diffData).length){
    state.name.val = newData.name;
    state.description.val = newData.description;
    state.accept_kids.val = newData.accept_kids;
    state.accept_handicapped.val = newData.accept_handicapped;
    state.accept_incomplete_resumes.val = newData.accept_incomplete_resumes;
    state.response_letter_required.val = newData.response_letter_required;
    state.allow_messages.val = newData.allow_messages;
    state.response_notifications.val = newData.response_notifications;
    state.work_type_id.val = newData.work_type_id;
    state.experience_id.val = newData.experience_id;
    state.accept_temporary.val = newData.accept_temporary;
    state.schedule_id.val = newData.schedule_id;
    state.working_days_id.val = newData.working_days_id;
    state.working_time_intervals_id.val = newData.working_time_intervals_id;
    state.working_time_modes_id.val = newData.working_time_modes_id;
    state.refresh_vac.val = newData.refresh_vac;
    state.extend_vac_id.val = newData.extend_vac_id;
    state.resume_subscription_status.val = newData.resume_subscription_status;
    state.place_of_work_id.val = newData.place_of_work_id;
    state.education_id.val = newData.education_id;
    state.marital_status_id.val = newData.marital_status_id;
    state.children_id.val = newData.children_id;
    state.gender_id.val = newData.gender_id;
    state.covid_vaccination_requirement_id.val = newData.covid_vaccination_requirement_id;
    state.move_able.val = newData.move_able;
    state.video_url.val = newData.video_url;
    state.age_from.val = newData.age_from;
    state.age_to.val = newData.age_to;
  }
})

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
await getWorkTypes();
const workTypeOptions = computed(() => {
  return dictionaryStore.work_types.map((item) => ({name: item.name, value: item.id}));
});
await getExperiences();
const experienceOptions = computed(() => {
  return dictionaryStore.experiences.map((item) => ({name: item.name, value: item.id}));
});
await getSchedules();
const scheduleOptions = computed(() => {
  return dictionaryStore.schedules.map((item) => ({name: item.name, value: item.id}));
});
await getWorkingDayOptions();
const workingDaysOptions = computed(() => {
  return dictionaryStore.working_days.map((item) => ({name: item.name, value: item.id}));
});
await getWorkingTimeIntervalsOptions();
const workingTimeIntervalOptions = computed(() => {
  return dictionaryStore.working_time_intervals.map((item) => ({name: item.name, value: item.id}));
});
await getWorkingTimeModesOptions();
const workingTimeModesOptions = computed(() => {
  return dictionaryStore.working_time_modes.map((item) => ({name: item.name, value: item.id}));
});
await getExtendVacOptions();
const extendVacOptions = computed(() => {
  return dictionaryStore.extend_vac.map((item) => ({name: item.name, value: item.id}));
});
await getPlaceOfWorks();
const placeOfWorkOptions = computed(() => {
  return dictionaryStore.place_of_works.map((item) => ({name: item.name, value: item.id}));
});
await getEducations();
const educationOptions = computed(() => {
  return dictionaryStore.educations.map((item) => ({name: item.name, value: item.id}));
});
await getMaritalStatus();
const maritalStatusOptions = computed(() => {
  return dictionaryStore.marital_statuses.map((item) => ({name: item.name, value: item.id}));
});
await getChildren();
const childrenOptions = computed(() => {
  return dictionaryStore.children.map((item) => ({name: item.name, value: item.id}));
});
await getGenders();
const genderOptions = computed(() => {
  return dictionaryStore.genders.map((item) => ({name: item.name, value: item.id}));
});
await getCovidVacRequirements();
const covidVacReqOptions = computed(() => {
  return dictionaryStore.covid_vaccination_requirement.map((item) => ({name: item.name, value: item.id}));
});

const {searchAddresses} = dictionaryStore;
await searchAddresses();

const onAddressSearch  = async(newString) => {
  console.log(newString);
}
const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
  if (isChanged.value){
    state.isLoading = true;
    // validate();
    errors.value = {};
    state.errorMessage = "";
    let resData = {};
    const jsonData = {...useFormData(state)};

    jsonData.action = 'UpdateAdvancedField';
    resData = await updateVacancy(draftID.value, jsonData);
    isUpdated.value = true;
    if (resData.status !== 'success'){
      return handleErrorResponse(resData.data);
    }
    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;

  }
}

const isCompleted = computed(() => {
  const myVacancy = my_vacancy.value;
  if (myVacancy && !isCollapsed.value){
    return (myVacancy.address && myVacancy.address.address);
  }
  return false;
});

</script>

<style>

.from-to-block{

}

</style>