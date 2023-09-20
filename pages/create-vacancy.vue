<script setup>
import {storeToRefs} from "pinia";
import {useResumeStore} from "~/store/resume";
import {useVacancyStore} from "~/store/vacancy";
import useAlert from "~/composables/useAlert";

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

const vacancyStore = useVacancyStore();
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const providers = ref({
  superjob: false,
  hh: false,
})

const {getMyVacancy} = vacancyStore;
const draftId = computed(() => route.query.draft_id);
watch(() => route.query.draft_id, (newDraftId) => {
  console.log(newDraftId)
  if (newDraftId){
    getMyVacancy(draftId.value);
  }
})


onMounted(async() => {
  if (draftId.value){
    const resData = await getMyVacancy(draftId.value);
    if (resData.status === 'error'){
      navigateTo({
        name: 'create-vacancy',
        query: {
          ...route.query,
          message: JSON.stringify({
            type: 'error',
            text: resData.message,
            redirect: 'create-vacancy',
          })
        }
      })
    }
  }
  handleAlert();
});


const error = computed(() => {
  return route.query.message;
});
const {handleAlert} = useAlert();
watch(() => route.query.message, handleAlert);

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

      {{providers}}
      <div class="wrapper wrapper-1290">
        <form class="create-vacancy" action="" name="create-vacancy " v-if="!draftId">

          <CreateVacancyCreateDraft :title="pageTitle"/>

          <p class="text-lg-end">При создании резюме вы соглашаетесь с <a href="#">правилами работы сервиса</a> и даете согласие на обработку персональных данных, разрешенных для распространения</p>
          <div class="form-submit-container mt-2">


            <button class="btn btn-outline-primary" type="button" @click="saveAsDraft">Сохранить как черновик</button>
            <button class="button-accent" type="submit" @click="save">Сохранить и опубликовать</button>
          </div>
        </form>
        <form class="update-vacancy" action="" name="update-vacancy " v-else>
          <CreateVacancyProviders v-model="providers" />

          <CreateVacancyAdvancedFieldsCard :providers="providers" />
          <CreateVacancyCities :providers="providers"/>
          <CreateVacancyMetroCard :providers="providers"/>
          <CreateVacancyProfessionalRoles  :providers="providers"/>
          <CreateVacancyTypeAndUrl :providers="providers"/>
          <CreateVacancySalaryCard :providers="providers"/>
          <CreateVacancySkillsCard :providers="providers"/>
          <CreateVacancyAddressCard :providers="providers"/>
          <CreateVacancyDriverLicensesCard :providers="providers"/>
          <CreateVacancyContactsCard :providers="providers"/>
<!--          <CreateVacancyLanguagesCard :providers="providers"/>-->
          <CreateVacancyBillingTypeCard :providers="providers"/>

          <p class="text-lg-end">При создании ваканции вы соглашаетесь с <a href="#">правилами работы сервиса</a> и даете согласие на обработку персональных данных, разрешенных для распространения</p>
          <div class="form-submit-container mt-2">


            <button class="btn btn-outline-primary" type="button" @click="saveAsDraft">Сохранить как черновик</button>
            <button class="button-accent" type="submit" @click="save">Сохранить и опубликовать</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>