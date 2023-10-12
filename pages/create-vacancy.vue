<script setup>
import {useVacancyStore} from "~/store/vacancy";
import useAlert from "~/composables/useAlert";
import Swal from "sweetalert2";

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
const {publishDraft} = vacancyStore;
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
const paramProviders = computed(() => {
  if (providers.value.hh && providers.value.superjob){
    return ['hh', 'superjob'];
  }
  if (providers.value.hh){
    return ['hh'];
  }
  if (providers.value.superjob){
    return ['superjob'];
  }
  return [];
})

const advanced_fields_el = ref();
const cities_el = ref();
const metro_el = ref();
const prof_roles_el = ref();
const type_el = ref();
const salary_el = ref();
const skills_el = ref();
const address_el = ref();
const driver_lic_el = ref();
const contacts_el = ref();
const languages_el = ref();
const billing_el = ref();

const saveAllSections = async () => {
  return Promise.all([
    new Promise((resolve, reject) => {
      advanced_fields_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      cities_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      metro_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      prof_roles_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      type_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      salary_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      skills_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      address_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      driver_lic_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      contacts_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      languages_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
    new Promise((resolve, reject) => {
      billing_el.value.save();
      setTimeout(() => resolve(1), 0);
    }),
  ])
}
const save = async(e) => {
  e.preventDefault();

  const resAll = await saveAllSections();
  console.log(resAll);
  console.log('saving and publishing or redirecting to edit page');
  // employer/vacancy/publish/408
  console.log(paramProviders.value);
  const payload = {
    providers: paramProviders.value
  }
  const resData = await publishDraft(draftId.value, payload);
  if (resData.hasOwnProperty('status') && resData.status !== 'success'){
    Swal.fire({
      title: 'Ошибка!',
      text: resData.message,
      icon: "error",
      confirmButtonText: 'ОК'
    });
  }
  console.log(resData);
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

      <div class="wrapper wrapper-1290">
        <form class="create-vacancy" action="" name="create-vacancy " v-if="!draftId">

          <CreateVacancyCreateDraft :title="pageTitle"/>

          <div class="form-submit-container mt-2">
            <button class="btn btn-outline-primary" type="button" @click="saveAsDraft">Далее</button>
          </div>
        </form>
        <form class="update-vacancy" action="" name="update-vacancy " v-else>
          <CreateVacancyProviders v-model="providers" />

          <CreateVacancyAdvancedFieldsCard ref="advanced_fields_el" :providers="providers" />
          <CreateVacancyCities ref="cities_el" :providers="providers"/>
          <CreateVacancyMetroCard ref="metro_el" :providers="providers"/>
          <CreateVacancyProfessionalRoles ref="prof_roles_el" :providers="providers"/>
          <CreateVacancyTypeAndUrl ref="type_el" :providers="providers"/>
          <CreateVacancySalaryCard ref="salary_el" :providers="providers"/>
          <CreateVacancySkillsCard ref="skills_el" :providers="providers"/>
          <CreateVacancyAddressCard ref="address_el" :providers="providers"/>
          <CreateVacancyDriverLicensesCard ref="driver_lic_el" :providers="providers"/>
          <CreateVacancyContactsCard ref="contacts_el" :providers="providers"/>
          <CreateVacancyLanguagesCard ref="languages_el" :providers="providers"/>
          <CreateVacancyBillingTypeCard ref="billing_el" :providers="providers"/>

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