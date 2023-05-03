<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="create-subscribe" action="" name="create-subscribe ">
          <div class="w-box w-box--main w-box-subscribe">
            <div class="w-box-head">
              <h1 class="title">Создание вакансии</h1>
              <div class="form-header d-flex mb-4">
                    <span
                            @click="currentStep = 'first'"
                            class="stepIndicator" :class="{'active': isFirstStep, 'finish': isThirdStep || isSecondStep}">1
                      <span class="tab_name">Шаг</span>
                    </span>
                  <span
                          @click="currentStep = 'second'"
                          class="stepIndicator" :class="{'active': isSecondStep, 'finish': isThirdStep}">2
                      <span class="tab_name">Шаг</span>
                    </span>
                  <span
                          @click="currentStep = 'third'"
                          class="stepIndicator" :class="{'active': isThirdStep}">3
                      <span class="tab_name">Шаг</span>
                    </span>
              </div>
            </div>
<!--              {{state}}-->
<!--              {{hhState}}-->
            <div class="w-box-body">
              <form id="signUpForm"  @submit.prevent="onSubmit">
                  <!-- start step indicators -->

                  <!-- end step indicators -->

                  <transition-group name="step">
                  <!-- step one -->
                    <div class="step" v-if="isFirstStep" :class="{'d-block' : isFirstStep}">
<!--                        <p class="text-center mb-4">первый этап</p>-->


                        <CreateVacancyProvidersIntegration :providers="providers" @set="updateState"></CreateVacancyProvidersIntegration>

                        <div class="sep"> </div>
                        <CreateVacancyName  @set="updateState"></CreateVacancyName>
                        <div class="sep"> </div>
                        <CreateVacancyFieldsAndAreas @set="updateState"></CreateVacancyFieldsAndAreas>
                        <div class="sep"> </div>
                        <CreateVacancyJobSalary @set="updateState"></CreateVacancyJobSalary>
                        <div class="sep"></div>
                        <CreateVacancyContacts @set="updateState"></CreateVacancyContacts>
                        <div class="sep"></div>
                        <CreateVacancyJobEmploymentAndEducation @set="updateState"></CreateVacancyJobEmploymentAndEducation>
                        <div class="sep"> </div>
                        <CreateVacancyGender @set="updateState"></CreateVacancyGender>
                        <div class="sep"> </div>
                        <CreateVacancyMaritalStatus @set="updateState"></CreateVacancyMaritalStatus>
                        <div class="sep"> </div>
                    </div>

                    <!-- step two -->
                    <div class="step d-block" v-if="isSecondStep" :class="{'d-block' : isFirstStep}">
<!--                        <p class="text-center mb-4">Второй этап</p>-->

                        <CreateVacancyChildren @set="updateState"></CreateVacancyChildren>
                        <div class="sep"> </div>
                        <CreateVacancyExperience2 @set="updateState"></CreateVacancyExperience2>
                        <div class="sep"> </div>
                        <CreateVacancyPlaceOfWork @set="updateState"></CreateVacancyPlaceOfWork>
                        <div class="sep"> </div>
                        <CreateVacancyVacancytype @set="updateState"></CreateVacancyVacancytype>
                        <div class="sep"> </div>
                        <CreateVacancyBillingType @set="updateState"></CreateVacancyBillingType>
                        <div class="sep"> </div>
                        <CreateVacancyLicenses @set="updateState"></CreateVacancyLicenses>
                        <div class="sep"> </div>
                    </div>

                    <!-- step three -->
                    <div class="step pb-3" v-if="isThirdStep" :class="{'d-block' : isThirdStep}">
<!--                      <p class="text-center mb-4">Третый этап</p>-->

                      <CreateVacancyForeignLanguages @set="updateState"></CreateVacancyForeignLanguages>
                      <div class="sep"> </div>
                      <CreateVacancySkills @set="updateState"></CreateVacancySkills>
                      <div class="sep"> </div>
                      <CreateVacancyAge @set="updateState"></CreateVacancyAge>
                      <div class="sep"> </div>
                      <CreateVacancyFirmName @set="updateState"></CreateVacancyFirmName>
                      <div class="sep"> </div>
                      <CreateVacancyFirmActivity @set="updateState"></CreateVacancyFirmActivity>
                      <div class="sep"> </div>
                      <CreateVacancyDescription @set="updateState"></CreateVacancyDescription>
                      <div class="sep"> </div>
                      <CreateVacancyNotifications @set="updateState"></CreateVacancyNotifications>
                      <div class="sep"> </div>


                      <CreateVacancyHHAcceptKids v-model="hhState.accept_kids"/>
                      <div class="sep"></div>
                      <CreateVacancyHHAcceptTemporary v-model="hhState.accept_temporary"/>
                      <div class="sep"></div>
                      <CreateVacancyHHAcceptIncompleteResumes v-model="hhState.accept_incomplete_resumes"/>
                      <div class="sep"></div>
                      <CreateVacancyHHAcceptHandicapped v-model="hhState.accept_handicapped"/>
                      <div class="sep"></div>
                      <CreateVacancyHHAllowMessages v-model="hhState.accept_handicapped"/>
                      <div class="sep"></div>
                      <CreateVacancyHHAcceptHandicapped v-model="hhState.accept_handicapped"/>
                      <div class="sep"></div>
                      <CreateVacancyHHResponseNotifcation v-model="hhState.response_notification"/>
                      <div class="sep"></div>
                      <CreateVacancyHHResponseUrl v-model="hhState.response_url"/>
                      <div class="sep"></div>
                      <CreateVacancyHHWithZP v-model="hhState.with_zp"/>
                      <div class="sep"></div>
                      <CreateVacancyHHWorkinDays v-model="hhState.working_days"/>
                      <div class="sep"></div>
                      <CreateVacancyHHWorkinTimeIntervals v-model="hhState.working_time_intervals"/>
                      <div class="sep"></div>
                      <CreateVacancyHHWorkinTimeModes v-model="hhState.working_time_modes"/>
                      <hr/>
                  </div>
                  </transition-group>
                  <!-- start previous / next buttons -->
                  <div class="form-footer d-flex">
                      <button type="button" id="prevBtn" @click="goToPrevStep">Назад</button>
                      <button type="button" id="nextBtn" @click="goToNextStep">Далее</button>
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

const hhState = reactive({
    accept_kids: false,
    accept_temporary: false,
    accept_incomplete_resumes: false,
    accept_handicapped: false,
    allow_messages: false,
    response_notification: false,
    response_url: "",
    with_zp: false,
    working_days: null,
    working_time_intervals: null,
    working_time_modes: null,
});
const superjobState = reactive({
    accept_kids: true,
    accept_temporary: true,
});
const state =  reactive({
  providers: {
    val: {
      hh: true,
      superjob: true,
    },
    isValid: true
  },
  name: "",
  specializations: [],
  areas: [],
  salary: {},
  contacts: [],
  employment: null,
  education: null,
  gender: null,
  marital_status: null,
  children: [],
  experience: null,
  place_of_work: null,
  vacancy_type: null,
  billing_type: null,
  driver_license_types: null,
  work_type: null,
  key_skills: null,
  age_from: null,
  age_to: null,
  firm_name: "",
  firm_activity: "",
  description: "",
  schedule: "",


});

const updateState = (prop, value) => {
    console.log(prop, value);
  state[prop] = value;
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
    padding: 40px;
    border-radius: 12px;
}
#signUpForm .form-header {
    gap: 5px;
    text-align: center;
    font-size: .9em;
}

#signUpForm .form-header .stepIndicator {
    cursor: pointer;
    position: relative;
    flex: 1;
    padding-bottom: 30px;
}

#signUpForm .form-header .stepIndicator .tab_name{
    content: "";
    position: absolute;
    left: 0;
    bottom: -24px;
    width: 100%;
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
    /*padding-top: 2rem;*/
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
    font-size: 1.2rem;
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

.step-enter-active,
.step-leave-active {
    transition: all 0.4s;
}
.step-enter-from,
.step-leave-to {
    opacity: 0;
    filter: blur(1rem);
}

</style>

<style>

.input-row input.checkbox-mask {
    width: 24px;
    height: 24px;
}
</style>