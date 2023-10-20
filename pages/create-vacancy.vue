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

const canBePublished = computed(() => {
  if (my_vacancy.value){
    if (my_vacancy.value.can_publish.hh || my_vacancy.value.can_publish.superjob){
      return true;
    }
  }
  return false;
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
  const promises = await Promise.all([
    advanced_fields_el.value.save(true),
    cities_el.value.save(true),
    metro_el.value.save(true),
    prof_roles_el.value.save(true),
    type_el.value.save(true),
    salary_el.value.save(true),
    skills_el.value.save(true),
    address_el.value.save(true),
    driver_lic_el.value.save(true),
    contacts_el.value.save(true),
    languages_el.value.save(true),
    billing_el.value.save(true),
  ]);

  console.log(promises);
  const promisesResult = promises.every((item) => item === true);

  console.log(promisesResult);
  return new Promise((resolve, reject) => promisesResult ? resolve(true) : reject(false));

}

const errorMessage = ref(null);
const hhErrorMessage = ref(null);
const save = async(e) => {
  e.preventDefault();

  const resAll = await saveAllSections();

  if (resAll){
    const payload = {
      providers: paramProviders.value
    }
    const resData = await publishDraft(draftId.value, payload);
    console.log(resData);
    if (resData.hasOwnProperty('status') && resData.status !== 'success'){
      Swal.fire({
        title: 'Ошибка!',
        text: resData.message,
        icon: "error",
        confirmButtonText: 'ОК'
      });

      errorMessage.value = '';
      if (resData.hasOwnProperty('errors')){
        const {errors} = resData;
        const {hh, superjob} = errors

        console.log(hh);
        console.log(hh[0]);


      }
    }
    console.log(resData);
  }else{
    Swal.fire({
      title: 'Ошибка!',
      text: "не все обязательные поля заполнены верно!",
      icon: "error",
      confirmButtonText: 'ОК'
    });
  }

  // console.log('saving and publishing or redirecting to edit page');
  // // employer/vacancy/publish/408
  // console.log(paramProviders.value);

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
        <form class="update-vacancy" v-else>
          <CreateVacancyProviders v-model="providers" />

          <CreateVacancyAdvancedFieldsCard ref="advanced_fields_el" :providers="providers" />
          <CreateVacancyCitiesCard ref="cities_el" :providers="providers"/>
          <CreateVacancyMetroCard ref="metro_el" :providers="providers"/>
          <CreateVacancyProfessionalRolesCard ref="prof_roles_el" :providers="providers"/>
          <CreateVacancyTypeAndUrlCard ref="type_el" :providers="providers"/>
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
            <button class="button-accent" :class="{'disabled' : !canBePublished}" type="submit" @click.prevent="save">Сохранить и опубликовать</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.button-accent.disabled{
    filter: grayscale(180%);
}
</style>