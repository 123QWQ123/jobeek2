<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="create-subscribe" action="" name="create-subscribe ">
          <div class="w-box w-box--main w-box-subscribe">
            <div class="w-box-head">
              <h1 class="title">Создание вакансии</h1>
            </div>
            <div class="w-box-body">
              <CreateVacancyProvidersIntegration :providers="providers" @set="updateState"></CreateVacancyProvidersIntegration>

              <CreateVacancyKeywords  @set="updateState"></CreateVacancyKeywords>
              <div class="sep"> </div>
              <CreateVacancyFieldsAndAreas></CreateVacancyFieldsAndAreas>
              <div class="sep"> </div>
              <CreateVacancyJobSalary></CreateVacancyJobSalary>
              <div class="sep"></div>
              <CreateVacancyJobEmploymentAndEducation></CreateVacancyJobEmploymentAndEducation>
              <div class="sep"> </div>
              <CreateVacancyGender></CreateVacancyGender>
              <div class="sep"> </div>
              <CreateVacancyPlaceOfWork></CreateVacancyPlaceOfWork>
              <div class="sep"> </div>
              <CreateVacancyLicenses></CreateVacancyLicenses>
              <div class="sep"> </div>
              <CreateVacancyForeignLanguages></CreateVacancyForeignLanguages>
              <div class="sep"> </div>
              <CreateVacancyNotifications></CreateVacancyNotifications>
            </div>
          </div>
          <div class="form-submit-container">
<!--            <p>Найдено 2 012 вакансий</p>-->
            {{providers}}
            <button class="button-accent" type="button" @click="onSubmit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import {useVacancyStore} from "../store/vacancy";
import {useProfileStore} from "~/store/profile";


definePageMeta({
  layout: "cabinet",
});

useHead({
    title: "Создание вакансии - Jobeek"
})

const providers = reactive({
  hh: {
    is_connected: true,
    is_valid: true,
    is_checked: true,
  },
  superjob: {
    is_connected: false,
    is_valid: false,
    is_checked: false,
  },
})

const state =  reactive({
  providers: {
    val: {
      hh: true,
      superjob: true,
    },
    isValid: true
  },
  name: {
    val: "",
    isValid: false
  },
  area: {
    val: "",
    isValid: false
  },
  contacts: {
    val: "",
    isValid: false
  },
  employer_name: {
    val: "",
    isValid: false
  },
  description: {
    val: "",
    isValid: false
  },
  experience: {
    val: null || {},
    isValid: false
  },
  employment: {
    val: null || {},
    isValid: false
  },
  salary: {
    val: null || {},
    isValid: false
  },
  languages: {
    val: [],
    isValid: false
  },
  schedule: {
    val: null || {},
    isValid: false
  },
  status: {
    val: "",
    isValid: false
  },
});

const updateState = (prop, value) => {
  state[prop].val = value;
}

const {getConnectedProviders} = useProfileStore();
onMounted(async() => {
  const resData = await getConnectedProviders();
  Object.keys(resData).map((item) => providers[item].is_connected = resData[item]);
})

const onSubmit = () => {
  console.log(state);
}
</script>
