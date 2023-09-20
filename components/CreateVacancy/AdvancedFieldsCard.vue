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

        <div class="input-row" >
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
            <RichEditor  v-model="state.description.val"/>
            <div class="text-danger d-block" v-if="errors.description">
              {{errors.description}}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Тип работы:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workTypeOptions" v-model="state.work_type_id.val" :label="'Выберите'"  @focusin="() => errors.work_type_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.work_type_id">
              {{errors.work_type_id}}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Опыт:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="experienceOptions" v-model="state.experience_id.val" :label="'Выберите'"  @focusin="() => errors.experience_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.experience_id">
              {{errors.experience_id}}
            </div>
          </div>
        </div>


        <CreateVacancyCustomCheckbox
            v-model="state.accept_kids.val" :label="'Соискатель старше 14 лет'"
            :description="'Соискатель старше 14 лет.\n'+'Указание, что вакансия доступна для соискателей старше 14 лет'"
            :for="'accept_kids'"
            :errors="errors"
        />

        <CreateVacancyCustomCheckbox
            v-model="state.accept_temporary.val" :label="'Временное трудоустройство'"
            :description="'Временное трудоустройство. указание, что вакансия доступна с временным трудоустройством'"
            :for="'accept_temporary'"
            :errors="errors"
        />
        <CreateVacancyCustomCheckbox
            v-model="state.accept_incomplete_resumes.val" :label="'Неполное резюме'"
            :description="'Неполное резюме. разрешен ли отклик на вакансию неполным резюме.'"
            :for="'accept_incomplete_resumes'"
            :errors="errors"
        />

        <CreateVacancyCustomCheckbox
            v-model="state.accept_handicapped.val" :label="'Соискатель с инвалидностью'"
            :description="'Соискатель с инвалидностью. Указание, что вакансия доступна для соискателей с инвалидностью'"
            :for="'accept_handicapped'"
            :errors="errors"
        />
        <CreateVacancyCustomCheckbox
            v-model="state.response_letter_required.val" :label="'Сопроводительное письмо'"
            :description="'Сопроводительное письмо Обязательно ли заполнять сообщение при отклике на вакансию'"
            :for="'response_letter_required'"
            :errors="errors"
        />
        <CreateVacancyCustomCheckbox
            v-model="state.allow_messages.val" :label="'Разрешение сообщений'"
            :description="'Разрешение сообщений. возможность переписки с кандидатами по данной вакансии'"
            :for="'allow_messages'"
            :errors="errors"
        />

        <CreateVacancyCustomCheckbox
            v-model="state.response_notifications.val" :label="'Уведомлять ли менеджера'"
            :description="'Уведомлять ли менеджера о новых откликах'"
            :for="'allow_messages'"
            :errors="errors"
        />

        <div class="input-row">
          <label>график работы:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="scheduleOptions" v-model="state.schedule_id.val" :label="'Выберите'"  @focusin="() => errors.schedule_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.schedule_id">
              {{ errors.schedule_id }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Рабочие дни:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workingDaysOptions" v-model="state.working_days.val" :label="'Выберите'"  @focusin="() => errors.working_days = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.working_days">
              {{ errors.working_days }}
            </div>
          </div>
        </div>

        <CreateVacancyCustomCheckbox
            v-model="state.with_zp.val" :label="'Зарплата.ру'"
            :description="'Вашу вакансию увидят больше людей. Мы разместим ее дополнительно на сервисе Зарплата.ру'"
            :for="'with_zp'"
            :errors="errors"
        />

        <div class="input-row">
          <label>временной интервал работы из справочника:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workingTimeIntervalOptions" v-model="state.working_time_intervals.val" :label="'Выберите'"  @focusin="() => errors.working_time_intervals = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.working_time_intervals">
              {{ errors.working_time_intervals }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>режимы времени работы из справочника:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="workingTimeModesOptions" v-model="state.working_time_modes.val" :label="'Выберите'"  @focusin="() => errors.working_time_modes = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.working_time_modes">
              {{ errors.working_time_modes }}
            </div>
          </div>
        </div>


        <CreateVacancyCustomCheckbox
            v-model="state.refresh_vac.val" :label="'Обновлять автоматически'"
            :description="'Обновлять ли вакансию автоматически'"
            :for="'refresh_vac'"
            :errors="errors"
        />
        <CreateVacancyCustomCheckbox
            v-model="state.resumesubscription_status.val" :label="'подписку на резюме'"
            :description="'Включить ли подписку на резюме'"
            :for="'resumesubscription_status'"
            :errors="errors"
        />
        <div class="input-row">
          <label>Продлевать ли вакансию :</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="extendVacOptions" v-model="state.extend_vac_id.val" :label="'Выберите'"  @focusin="() => errors.extend_vac_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.extend_vac_id">
              {{ errors.extend_vac_id }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Место работы:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="placeOfWorkOptions" v-model="state.place_of_work_id.val" :label="'Выберите'"  @focusin="() => errors.place_of_work_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.place_of_work_id">
              {{ errors.place_of_work_id }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Образование:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="educationOptions" v-model="state.education_id.val" :label="'Выберите'"  @focusin="() => errors.education_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.education_id">
              {{ errors.education_id }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Семейное положение:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="maritalStatusOptions" v-model="state.marital_status_id.val" :label="'Выберите'"  @focusin="() => errors.marital_status_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.marital_status_id">
              {{ errors.marital_status_id }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Наличие детей:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="childrenOptions" v-model="state.children_id.val" :label="'Выберите'"  @focusin="() => errors.children_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.children_id">
              {{ errors.children_id }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Пол:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="genderOptions" v-model="state.gender_id.val" :label="'Выберите'"  @focusin="() => errors.gender_id = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.gender_id">
              {{ errors.gender_id }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Требования к вакцинации COVID-19:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect :options="covidVacReqOptions" v-model="state.covid_vaccination_requirement.val" :label="'Выберите'"  @focusin="() => errors.covid_vaccination_requirement = ''"></CustomSelect>
            <div class="text-danger d-block" v-if="errors.covid_vaccination_requirement">
              {{ errors.covid_vaccination_requirement }}
            </div>
          </div>
        </div>

        <CreateVacancyCustomCheckbox
            v-model="state.move_able.val" :label="'Релокация'"
            :description="'Рассматриваются соискатели из других городов'"
            :for="'move_able'"
            :errors="errors"
        />


        <div class="input-row" >
          <label>Ссылка на видеовакансию (поддерживаются ссылки на Youtube и Vimeo):</label>
          <div class="input-wrapper mt-2">
            <input  v-model="state.vacancyVideoUrl.val"  @focusin="() => errors.vacancyVideoUrl = ''"/>
            <div class="text-danger d-block" v-if="errors.vacancyVideoUrl">
              {{errors.vacancyVideoUrl}}
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

const props = defineProps(['title']);

import {useProfileStore} from "~/store/profile";
import {useFormData} from "~/composables/useFormData";
import {useRuntimeConfig} from "#app";
import useFormValidation from "~/composables/useFormValidation";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
import {useDiff} from "~/composables/useDiff";
import {useDictionaryStore} from "~/store/dictionary";
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
    allow_applicant_without_resume: true,
    refresh_vac: true
  }
})

const state = reactive({
  name: {
    val:  null,
    isValid: true
  },
  description: {
    val:  "",
    isValid: true
  },
  work_type_id: {
    val:  null,
    isValid: true
  },
  experience_id: {
    val:  null,
    isValid: true
  },
  accept_kids: {
    val:  false,
    isValid: true
  },
  accept_temporary: {
    val:  false,
    isValid: true
  },
  accept_incomplete_resumes: {
    val:  false,
    isValid: true
  },
  accept_handicapped: {
    val:  false,
    isValid: true
  },
  allow_messages: {
    val:  false,
    isValid: true
  },
  response_notifications: {
    val:  false,
    isValid: true
  },
  schedule_id: {
    val:  null,
    isValid: true
  },
  working_days: {
    val:  null,
    isValid: true
  },
  with_zp: {
    val:  false,
    isValid: true
  },
  response_letter_required: {
    val:  false,
    isValid: true
  },
  working_time_intervals: {
    val:  false,
    isValid: true
  },
  working_time_modes: {
    val:  false,
    isValid: true
  },
  refresh_vac: {
    val:  false,
    isValid: true
  },
  extend_vac_id: {
    val:  false,
    isValid: true
  },
  resumesubscription_status: {
    val:  false,
    isValid: true
  },
  place_of_work_id: {
    val:  false,
    isValid: true
  },
  education_id: {
    val:  false,
    isValid: true
  },
  marital_status_id: {
    val:  false,
    isValid: true
  },
  children_id: {
    val:  false,
    isValid: true
  },
  gender_id: {
    val:  false,
    isValid: true
  },
  covid_vaccination_requirement: {
    val:  false,
    isValid: true
  },
  move_able: {
    val:  false,
    isValid: true
  },
  vacancyVideoUrl: {
    val:  null,
    isValid: true
  },
  age_from: {
    val:  null,
    isValid: true
  },
  age_to: {
    val:  null,
    isValid: true
  },
  isFormValid: true,
  isNew: true,
  isLoading: false,
  error: null,
  success: null,
});

const age = ref({
  age_from: state.age_from.val,
  age_to: state.age_to.val
})
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
      response_letter_required: newVacancy.response_letter_required,
      work_type_id: newVacancy.work_type?.id,
      experience_id: newVacancy.experience?.id,
      schedule_id: newVacancy.schedule?.id,
      working_time_intervals: newVacancy.working_time_intervals,
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
    state.response_letter_required.val = newData.response_letter_required;
    state.work_type_id.val = newData.work_type_id;
    state.experience_id.val = newData.experience_id;
    state.schedule_id.val = newData.schedule_id;
    state.working_days.val = newData.schedule_id;
    state.working_time_intervals.val = newData.working_time_intervals;
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
    const jsonData = {address: useFormData(state)};

    jsonData.action = 'UpdateAddress';
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
  if (myVacancy){
    return (myVacancy.address && myVacancy.address.address);
  }
  return false;
});

</script>

<style>

.from-to-block{

}

</style>