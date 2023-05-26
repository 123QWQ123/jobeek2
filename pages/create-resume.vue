<script setup>
definePageMeta({
    layout: "cabinet",
});

useHead({
    title: "Создание резюме - Jobeek"
})

</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="create-resume" action="" name="create-resume ">
          <div class="w-box w-box--main w-box-resume pb-4">
            <div class="w-box-head">
              <h1 class="title">Создание резюме</h1>
              <div class="descr">Получайте уведомления о новых вакансиях по созданному запросу</div>
            </div>
            <div class="w-box-body">
              <CreateResumeProviders></CreateResumeProviders>
              <CreateResumeDetails></CreateResumeDetails>
              <CreateResumeSocialNetworks></CreateResumeSocialNetworks>
            </div>
          </div>

          <CreateResumePositionAndIncome></CreateResumePositionAndIncome>

          <CreateResumeWorkExperience></CreateResumeWorkExperience>

          <CreateResumeEducation></CreateResumeEducation>

          <CreateResumeCerticatesAndCourses></CreateResumeCerticatesAndCourses>

          <CreateResumeKnowledgeAndSkills></CreateResumeKnowledgeAndSkills>

          <CreateResumeForeignLanguages></CreateResumeForeignLanguages>

          <CreateResumeDriverLicenses></CreateResumeDriverLicenses>

          <CreateResumeCitizenship></CreateResumeCitizenship>

          <CreateResumeFamily></CreateResumeFamily>

          <CreateResumePortfolio></CreateResumePortfolio>

          <div class="form-submit-container">
            <p>При создании резюме вы соглашаетесь с <a href="#">правилами работы сервиса</a> и даете согласие на обработку персональных данных, разрешенных для распространения</p>
            <button class="button-accent" type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>