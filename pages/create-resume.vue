<script setup>
import {storeToRefs} from "pinia";
import {useResumeStore} from "~/store/resume";

definePageMeta({
    layout: "cabinet",
});

// useHead({
//     title: "Создание резюме - Jobeek"
// });

const pageTitle = computed(() => {
  if (draftId.value) {
      return "Обновить резюме - Jobeek"
  }
  return "Создание резюме - Jobeek";
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
    console.log('mounted');
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
        <Title>{{pageTitle}}</Title>
    </Head>
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />

<!--        {{state}}-->
      <div class="wrapper wrapper-1290">
        <form class="create-resume" action="" name="create-resume ">

          <CreateResumePersonalData ></CreateResumePersonalData>


          <CreateResumePositionAndIncome v-if="isEditable"></CreateResumePositionAndIncome>

          <CreateResumeEducationContent v-if="isEditable"></CreateResumeEducationContent>

          <CreateResumeEducationDocumentsContent v-if="isEditable"></CreateResumeEducationDocumentsContent>


          <CreateResumeWorkExperienceContent v-if="isEditable"></CreateResumeWorkExperienceContent>

          <CreateResumeDriverLicenses v-if="isEditable"></CreateResumeDriverLicenses>

          <CreateResumeKnowledgeAndSkills v-if="isEditable"></CreateResumeKnowledgeAndSkills>

          <CreateResumeForeignLanguagesContent v-if="isEditable"></CreateResumeForeignLanguagesContent>

          <CreateResumeCitizenshipAndFamily v-if="isEditable"></CreateResumeCitizenshipAndFamily>

<!--          <CreateResumeFamilyAndMe v-if="isEditable"></CreateResumeFamilyAndMe>-->

<!--          <CreateResumePortfolio></CreateResumePortfolio>-->

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