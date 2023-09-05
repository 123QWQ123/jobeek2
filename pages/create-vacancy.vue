<script setup>
import {storeToRefs} from "pinia";
import {useResumeStore} from "~/store/resume";

definePageMeta({
  layout: "cabinet",
});

const pageTitle = computed(() => {
  if (draftId.value) {
    return "Создание вакансии"
  }
  return "Создание вакансии";
})
const route = useRoute();

const draftId = computed(() => route.query.draft_id);
watch(() => route.query.draft_id, (newDraftId) => {
  console.log(newDraftId)
  if (newDraftId){
    getResume(draftId.value);
  }
})

const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore);

const isEditable = computed(() => {
  if (resume.value){
    return true;
  }
  return false;
});

const {getResume} = resumeStore;

onMounted(() => {
  if (draftId.value){
    getResume(draftId.value);
  }
});

const saveAsDraft = (e) => {
  e.preventDefault();
  console.log('saved as draft');
}
const save = (e) => {
  e.preventDefault();
  console.log('saving and publishing or redirecting to edit page');
}
// groups[]=
</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <Head>
      <Title>{{pageTitle}}  - Jobeek</Title>
    </Head>
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />

      <!--        {{state}}-->
      <div class="wrapper wrapper-1290">
        <form class="create-resume" action="" name="create-vacancy ">

          <CreateVacancyCreateDraft :title="pageTitle"/>
<!--          <CreateVacancyPersonalData :title="pageTitle"></CreateVacancyPersonalData>-->

<!--          <CreateVacancyPositionAndIncome v-if="isEditable"></CreateVacancyPositionAndIncome>-->

<!--          <CreateVacancyEducationContent v-if="isEditable"></CreateVacancyEducationContent>-->

<!--          <CreateVacancyEducationDocumentsContent v-if="isEditable"></CreateVacancyEducationDocumentsContent>-->

<!--          <CreateVacancyWorkExperienceContent v-if="isEditable"></CreateVacancyWorkExperienceContent>-->

<!--          <CreateVacancyDriverLicenses v-if="isEditable"></CreateVacancyDriverLicenses>-->

<!--          <CreateVacancyKnowledgeAndSkills v-if="isEditable"></CreateVacancyKnowledgeAndSkills>-->

<!--          <CreateVacancyForeignLanguagesContent v-if="isEditable"></CreateVacancyForeignLanguagesContent>-->

<!--          <CreateVacancyCitizenshipAndFamily v-if="isEditable"></CreateVacancyCitizenshipAndFamily>-->

          <!--          <CreateVacancyPortfolio></CreateVacancyPortfolio>-->

          <p class="text-lg-end">При создании резюме вы соглашаетесь с <a href="#">правилами работы сервиса</a> и даете согласие на обработку персональных данных, разрешенных для распространения</p>
          <div class="form-submit-container mt-2">


            <button class="btn btn-outline-primary" type="button" @click="saveAsDraft">Сохранить как черновик</button>
            <button class="button-accent" type="submit" @click="save">Сохранить и опубликовать</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>