<script setup>
import {storeToRefs} from "pinia";
import {useResumeStore} from "~/store/resume";

definePageMeta({
    layout: "cabinet",
});

useHead({
    title: "Создание резюме - Jobeek"
});


const route = useRoute();

const draftId = computed(() => route.query.draft_id);

const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore)
const formTitle = computed(() => {
  if (resume.value){
    return "Обновить резюме";
  }

  return "Создание резюме";
});


const {getResume} = resumeStore;

onMounted(() => {
  if (draftId.value){
    getResume(draftId.value);
  }
})
// console.log(route)
</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="create-resume" action="" name="create-resume ">
          <div class="w-box w-box--main w-box-resume pb-4">
            <div class="w-box-head">
              <h1 class="title">{{ formTitle }}</h1>
              <div class="descr">Получайте уведомления о новых вакансиях по созданному запросу</div>
            </div>
<!--            <CreateResumeProviders></CreateResumeProviders>-->
            <CreateResumePersonalData></CreateResumePersonalData>

          </div>

          <CreateResumePositionAndIncome></CreateResumePositionAndIncome>

          <CreateResumeEducation></CreateResumeEducation>

          <CreateResumeCerticatesAndCourses></CreateResumeCerticatesAndCourses>

          <CreateResumeKnowledgeAndSkills></CreateResumeKnowledgeAndSkills>

          <CreateResumeWorkExperience></CreateResumeWorkExperience>

          <CreateResumeDriverLicenses></CreateResumeDriverLicenses>

          <CreateResumeCitizenship></CreateResumeCitizenship>

          <CreateResumeFamily></CreateResumeFamily>

          <CreateResumePortfolio></CreateResumePortfolio>

          <p class="text-lg-end">При создании резюме вы соглашаетесь с <a href="#">правилами работы сервиса</a> и даете согласие на обработку персональных данных, разрешенных для распространения</p>
          <div class="form-submit-container mt-2">


            <button class="btn btn-outline-primary" type="submit">Сохранить как черновик</button>
            <button class="button-accent" type="submit">Сохранить и опубликовать</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>