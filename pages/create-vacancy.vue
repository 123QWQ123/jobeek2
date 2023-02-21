<script setup>
definePageMeta({
  layout: "cabinet",
});

</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="create-subscribe" action="" name="create-subscribe ">
          <div class="w-box w-box--main w-box-subscribe">
            <div class="w-box-head">
              <h1 class="title">Создание вакансии</h1>
              <div class="descr">Получайте уведомления о новых вакансиях по созданному запросу</div>
            </div>
            <div class="w-box-body">
              <CreateVacancyProvidersAndKeywords></CreateVacancyProvidersAndKeywords>
              <div class="sep"> </div>
              <CreateVacancyFieldsAndAreas></CreateVacancyFieldsAndAreas>
              <div class="sep"> </div>
              <CreateVacancyVaccination></CreateVacancyVaccination>
              <div class="sep"></div>
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