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
              {{currentStep}}
            <div class="w-box-body">
              <form id="signUpForm"  @submit.prevent="onSubmit">
                  <!-- start step indicators -->
                  <div class="form-header d-flex mb-4">
                      <span class="stepIndicator" :class="{'active': isFirstStep, 'finish': isThirdStep || isSecondStep}">первый этап</span>
                      <span class="stepIndicator" :class="{'active': isSecondStep, 'finish': isThirdStep}">Второй этап</span>
                      <span class="stepIndicator" :class="{'active': isThirdStep}">Третый этап</span>
                  </div>
                  <!-- end step indicators -->

                  <!-- step one -->
                  <div class="step" v-if="isFirstStep" :class="{'d-block' : isFirstStep}">
                      <p class="text-center mb-4">первый этап</p>


                      <CreateVacancyProvidersIntegration :providers="providers" @set="updateState"></CreateVacancyProvidersIntegration>

                      <div class="sep"> </div>
                      <CreateVacancyKeywords  @set="updateState"></CreateVacancyKeywords>
                      <div class="sep"> </div>
                      <CreateVacancyFieldsAndAreas></CreateVacancyFieldsAndAreas>
                      <div class="sep"> </div>
                      <CreateVacancyJobSalary></CreateVacancyJobSalary>
                      <div class="sep"></div>
                      <CreateVacancyContacts></CreateVacancyContacts>
                      <div class="sep"></div>
                      <CreateVacancyJobEmploymentAndEducation></CreateVacancyJobEmploymentAndEducation>
                      <div class="sep"> </div>
                      <CreateVacancyGender></CreateVacancyGender>
                      <div class="sep"> </div>
                      <CreateVacancyMaritalStatus></CreateVacancyMaritalStatus>
                      <div class="sep"> </div>
                  </div>

                  <!-- step two -->
                  <div class="step d-block" v-if="isSecondStep" :class="{'d-block' : isFirstStep}">
                      <p class="text-center mb-4">Второй этап</p>

                      <CreateVacancyChildren></CreateVacancyChildren>
                      <div class="sep"> </div>
                      <CreateVacancyExperience2></CreateVacancyExperience2>
                      <div class="sep"> </div>
                      <CreateVacancyPlaceOfWork></CreateVacancyPlaceOfWork>
                      <div class="sep"> </div>
                      <CreateVacancyVacancytype></CreateVacancyVacancytype>
                      <div class="sep"> </div>
                      <CreateVacancyBillingType></CreateVacancyBillingType>
                      <div class="sep"> </div>
                      <CreateVacancyLicenses></CreateVacancyLicenses>
                      <div class="sep"> </div>
                  </div>

                  <!-- step three -->
                  <div class="step pb-3" v-if="isThirdStep" :class="{'d-block' : isThirdStep}">
                      <p class="text-center mb-4">Третый этап</p>

                      <CreateVacancyForeignLanguages></CreateVacancyForeignLanguages>
                      <div class="sep"> </div>
                      <CreateVacancySkills></CreateVacancySkills>
                      <div class="sep"> </div>
                      <CreateVacancyAge></CreateVacancyAge>
                      <div class="sep"> </div>
                      <CreateVacancyFirmName></CreateVacancyFirmName>
                      <div class="sep"> </div>
                      <CreateVacancyFirmActivity></CreateVacancyFirmActivity>
                      <div class="sep"> </div>
                      <CreateVacancyDescription></CreateVacancyDescription>
                      <div class="sep"> </div>
                      <CreateVacancyNotifications></CreateVacancyNotifications>
                      <hr/>
                  </div>

                  <!-- start previous / next buttons -->
                  <div class="form-footer d-flex">
                      <button type="button" id="prevBtn" @click="goToPrevStep">←</button>
                      <button type="button" id="nextBtn" @click="goToNextStep">→</button>
                  </div>
                  <!-- end previous / next buttons -->
              </form>


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

const isFirstStep = computed(() => currentStep.value === 'first');
const isSecondStep = computed(() => currentStep.value === 'second');
const isThirdStep = computed(() => currentStep.value === 'third');

const currentStep = ref('first');
const goToPrevStep = () => {
    let newStep = currentStep.value;
    if (currentStep.value === 'third'){
        newStep = 'second';
    }
    if (currentStep.value === 'second'){
        newStep = 'first';
    }
    currentStep.value = newStep;
}
const goToNextStep = () => {
    console.log(currentStep.value);
    let newStep = currentStep.value;
    if (currentStep.value === 'second'){
        newStep = 'third';
    }
    if (currentStep.value === 'first'){
        newStep = 'second';
    }
    console.log(newStep);
    currentStep.value = newStep;
}
const onSubmit = () => {
  console.log(state);
}
</script>


<style>
body{
    font-family: 'Open Sans', sans-serif;
}
#signUpForm {
    /*max-width: 500px;*/
    /*background-color: #ffffff;*/
    /*margin: 40px auto;*/
    padding: 40px;
    /*box-shadow: 0px 6px 18px rgb(0 0 0 / 9%);*/
    border-radius: 12px;
}
#signUpForm .form-header {
    gap: 5px;
    text-align: center;
    font-size: .9em;
}
#signUpForm .form-header .stepIndicator {
    position: relative;
    flex: 1;
    padding-bottom: 30px;
}
#signUpForm .form-header .stepIndicator.active {
    font-weight: 600;
}
#signUpForm .form-header .stepIndicator.finish {
    font-weight: 600;
    color: #5375FD;
}
#signUpForm .form-header .stepIndicator::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    z-index: 9;
    width: 20px;
    height: 20px;
    background-color: #b0bdf8;
    border-radius: 50%;
    border: 3px solid #ecf5f4;
}
#signUpForm .form-header .stepIndicator.active::before {
    background-color: #5375FD;
    border: 3px solid #5375FD;
}
#signUpForm .form-header .stepIndicator.finish::before {
    background-color: #5375FD;
    border: 3px solid #5375FD;
}
#signUpForm .form-header .stepIndicator::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 8px;
    width: 100%;
    height: 3px;
    background-color: #f3f3f3;
}
#signUpForm .form-header .stepIndicator.active::after {
    background-color: #f3f3f3;
}
#signUpForm .form-header .stepIndicator.finish::after {
    background-color: #5375FD;
}
#signUpForm .form-header .stepIndicator:last-child:after {
    display: none;
}
#signUpForm .step {
    display: none;
}
#signUpForm .form-footer{
    overflow:auto;
    gap: 20px;
}
#signUpForm .form-footer button{
    background-color: #009688;
    border: 1px solid #5375FD !important;
    color: #ffffff;
    border: none;
    padding: 13px 30px;
    font-size: 2em;
    cursor: pointer;
    border-radius: 5px;
    flex: 1;
    margin-top: 5px;
}
#signUpForm .form-footer button:hover {
    opacity: 0.8;
}

#signUpForm .form-footer button {
    background-color: #fff;
    color: #5375FD;
}
</style>