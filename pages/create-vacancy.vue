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
              <CreateVacancyProvidersIntegration :providers="providers"></CreateVacancyProvidersIntegration>

              <div class="input-row">
                <label for="name">Название</label>
                <div class="input-wrapper">
                  <input type="text" id="name" >
                </div>
              </div>

              <div class="sep"> </div>
              <CreateVacancyFieldsAndAreas></CreateVacancyFieldsAndAreas>
              <div class="sep"> </div>
              <CreateVacancyJobSalaryAndCompany></CreateVacancyJobSalaryAndCompany>
              <div class="sep"></div>
              <CreateVacancyJobEmploymentAndLicense></CreateVacancyJobEmploymentAndLicense>
              <div class="sep"> </div>
              <CreateVacancyForeignLanguages></CreateVacancyForeignLanguages>
              <div class="sep"> </div>
              <CreateVacancyNotifications></CreateVacancyNotifications>
            </div>
          </div>
          <div class="form-submit-container">
            <p>Найдено 2 012 вакансий</p>
            <button class="button-accent" type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "cabinet",
});

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

</script>
