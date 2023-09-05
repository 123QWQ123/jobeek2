<template>
    <div class="w-box w-box--main w-box-resume pb-4" v-click-outside="save">
        <div class="w-box-head">
            <h1 class="title">{{ formTitle }}</h1>
<!--            <div class="descr">Получайте уведомления о новых  по созданному запросу</div>-->
            <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>
        </div>

        <div class="text-danger d-block p-4" v-if="errors.message">
          {{ errors.message }}
        </div>
        <div class="w-box-body" :class="{collapse: isCollapsed}">

<!--            <CreateResumeProviders v-model="state.providers.val" :errors="errors.providers"></CreateResumeProviders>-->

            <div class="input-row">
                <label for="name">Название вакансии<b>*</b></label>
                <div class="input-wrapper">
                    <div class="c1 mt-1">
                        <input type="text" placeholder="Название" v-model="state.name.val" @focusin="() => errors.name = ''">

                        <div class="text-danger d-block" v-if="errors.name">
                            {{ errors.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-row">
                <label>Список городов:<b>*</b></label>
                <div class="input-wrapper mt-2">
                    <MultiSelectWithSearch :options="cityOptions" v-model="state.cities.val" :label="'Выберите город'" @input="updateCityInput" @focusin="() => errors.cities = ''"></MultiSelectWithSearch>

                    <div class="text-danger d-block" v-if="errors.cities">
                        Вам нужно выбрать город для публикации!
                    </div>

                </div>

            </div>

            <div class="input-row">
                <label>Специализация:<b>*</b></label>
                <div class="input-wrapper mt-2">
                    <MultiSelectWithSearch :options="professionalRoleOptions" v-model="state.professional_roles.val" :label="'Выберите специализацию'" @input="updateProfessionalInput" @focusin="() => errors.professional_roles = ''"></MultiSelectWithSearch>

                    <div class="text-danger d-block" v-if="errors.professional_roles">
                        Вам нужно выбрать город для публикации!
                    </div>

                </div>

            </div>

            <div class="input-row">
                <label for="description">Описание:</label>
                <div class="input-wrapper">
                  <textarea class="form-control" rows="7" id="description" placeholder="не менее 200 символов" v-model="state.description.val" @focusin="() => errors.description = ''"> </textarea>
                    <div class="text-danger d-block" v-if="errors.description">
                        {{errors.description}}
                    </div>
                </div>
            </div>

            <CreateVacancySalary v-model="state.salary.val" :errors="errors.salary"/>
            <br/>
        </div>
    </div>
</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const props = defineProps(['title']);
import {useResumeStore} from "~/store/resume";

import {useProfileStore} from "~/store/profile";
import {useFormData} from "~/composables/useFormData";
import {useRuntimeConfig} from "#app";
import useFormValidation from "~/composables/useFormValidation";
import {storeToRefs} from "pinia";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
import {useDiff} from "~/composables/useDiff";
import {useCreateFormData} from "~/composables/useCreateFormData";
const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const vacancyStore = useVacancyStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);

const {seeker} = profileStore;
const {resume} = storeToRefs(resumeStore);
const formTitle = computed(() => props.title);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const {createVacancy} = vacancyStore;

const state = reactive({
    name: {
        val: "",
        isValid: true,
    },
    cities: {
        val: [],
        isValid: true,
    },
    professional_roles: {
        val: [],
        isValid: true,
    },
    description: {
      val: "",
      isValid: true,
    },
    salary: {
        val: {
          currency: 'RUB',
          from: null,
          to: null,
          gross: false,
          period: null,
        },
        isValid: true,
    },
    isFormValid: true,
    isNew: true,
    isLoading: false,
    error: null,
    success: null,
});

watch(() => useWatchStateValues(state, true, true),   (newState, oldState) => {
    console.log(newState);
    if (!isFirst.value){
        isChanged.value = true;
    }else{
        isFirst.value = false;
    }
});

const {searchCities, searchProfessionalRoles} = profileStore;
const {getCountryCities} = profileStore;
const cityOptions = ref([]);
const professionalRoleOptions = ref([]);


const updateCityInput = async (newValue = '') => {
    const items = await searchCities({search: newValue}) ?? [];
    cityOptions.value = items.map(item => ({value: item.city_id, name: item.city_name}));
}

const updateProfessionalInput = async (newValue = '') => {
    let items = await searchProfessionalRoles();
    items = items.filter((item) => item.name.includes(newValue));
    professionalRoleOptions.value = items.map(item => ({value: item.id, name: item.name}));
}

const getCities = async (newValue = '') => {
    if (newValue){
        const items = await getCountryCities({city_id: newValue}) ?? [];
        cityOptions.value = items.map(item => ({value: item.id, name: item.name}));
    }
}


const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
    console.log(isChanged.value);
    if (isChanged.value){
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const formData = useFormData(state);
      console.log(formData);

        resData = await createVacancy(formData);

        if (resData.status === 'success'){
          const resume_id = resData.data.data.id;
          state.isNew = false;
          setTimeout(() => {
            console.log('redirecting...')
            navigateTo({name: 'create-resume', query: {draft_id: resume_id}})
          }, 100);
        }


        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }
        isChanged.value = false;
        isSaved.value = false;
        isUpdated.value = false;

    }
}

const isCompleted = computed(() => {
    const myResume = resume.value;
    if (myResume){
        return (myResume.first_name && myResume.last_name && myResume.id && myResume.birth_date && myResume.city_id && myResume.phone && myResume.phone_time_start && myResume.phone_time_end && myResume.email);
    }
    return false;
});

</script>

<style>

.from-to-block{

}

</style>