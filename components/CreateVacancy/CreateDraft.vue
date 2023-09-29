<template>
    <div class="w-box w-box--main w-box-resume pb-4" v-click-outside="save">
        <div class="w-box-head">
            <h1 class="title">{{ formTitle }}</h1>
            <div class="descr">Получайте уведомления о новых  по созданному запросу</div>
            <span class="arrow" ></span>
        </div>

        <div class="text-danger d-block p-4" v-if="errors.message">
          {{ errors.message }}
        </div>
        <div class="w-box-body" >

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
                        {{errors.cities}}
                    </div>

                </div>

            </div>

            <div class="input-row">
                <label>Специализация:<b>*</b></label>
                <div class="input-wrapper mt-2">
                    <MultiSelectWithSearch :options="professionalRoleOptions" v-model="state.professional_roles.val" :label="'Выберите специализацию'" @input="updateProfessionalInput" @focusin="() => errors.professional_roles = ''"></MultiSelectWithSearch>

                    <div class="text-danger d-block" v-if="errors.professional_roles">
                        {{errors.professional_roles}}
                    </div>

                </div>

            </div>

            <div class="input-row">
                <label for="description">Описание:</label>
                <div class="input-wrapper">
                  <RichEditor v-model="state.description.val"/>
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

const {createDraft} = vacancyStore;

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
  console.log(items);
    cityOptions.value = items.map(item => ({value: item.cityId, name: item.city_name}));
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
    if (isChanged.value){
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        const formData = useFormData(state);
        formData.professional_roles = formData.professional_roles.map(item => parseInt(item));
        formData.cities = formData.cities.map(item => parseInt(item));

        resData = await createDraft(formData);

        if (resData.status === 'success'){
          const vacancy_id = resData.data.data.id;
          state.isNew = false;
          setTimeout(() => {
            console.log('redirecting...')
            navigateTo({name: 'create-vacancy', query: {draft_id: vacancy_id}})
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

</script>

<style>

.from-to-block{

}

</style>