<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Гражданство и Семья</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
      <transition>
          <div class="w-box-body" :class="{collapse: isCollapsed}">
              <div class="form_content" v-if="isShown">
                  <SelectWithSearch :options="countryOptions" v-model="state.citizenship.val" :placeholder="'Выберите страну'"/>
                  <div class="text-danger d-block" v-if="errors.citizenship">
                      {{ errors.citizenship }}
                  </div>
                  <div class="row w-100 mt-2">
                      <div class="col-12">
                          <label for="about_me">Об мне</label>
                          <textarea class="form-control" v-model="state.about.val"> </textarea>
                      </div>
                      <div class="text-danger d-block" v-if="errors.about">
                          {{ errors.about_me }}
                      </div>
                  </div>
                  <div class="row w-100 mt-4">
                      <div class="input-row">
                          <label for="remote-work">Семейное положение</label>
                          <div class="input-wrapper">
                              <CustomSelect :options="maritalStatusOptions" v-model="state.marital_status_id.val"></CustomSelect>

                              <div class="text-danger d-block" v-if="errors.marital_status_id">
                                  {{ errors.marital_status }}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="row w-100 mt-4">
                      <div class="input-row">
                          <label for="remote-work">Есть дети?</label>
                          <div class="d-block text-start">
                              <input type="checkbox" :style="{height: '2rem', width: '2rem'}" v-model="state.has_children.val" :checked="state.has_children.val" />

                              <div class="text-danger d-block" v-if="errors.has_children">
                                  {{ errors.has_children }}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="empty-area" v-else>
                  <span>Здесь вы можете указать страну</span>
                  <button class="add" type="button" @click="add">Добавить  </button>
              </div>
          </div>
      </transition>

  </div>
</template>

<script setup>

import {useResumeStore} from "~/store/resume";

import {useProfileStore} from "~/store/profile";
import useFormValidation from "~/composables/useFormValidation";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
import {useDiff} from "~/composables/useDiff";
import {useDictionaryStore} from "~/store/dictionary";
const resumeStore = useResumeStore();
const profileStore = useProfileStore();

const dictionaryStore = useDictionaryStore();


const {getMaritalStatus} = dictionaryStore;
await getMaritalStatus();
const {getCountries} = profileStore;
await getCountries();
const countryOptions = computed(() => profileStore.countries.map((item) => ({name:item.name, value: item.id})));
const maritalStatusOptions = computed(() => dictionaryStore.marital_statuses.map(item => ({value: item.id, name: item.name})));


const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);

const {seeker} = profileStore;
const resume = computed(() => resumeStore.resume);

const isShown = ref(false);
const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);


const {getResume} = resumeStore;

const state = reactive({
    citizenship: {
        val: resume.value?.citizenship,
        isValid: true
    },
    about: {
        val: resume.value?.about,
        isValid: true
    },
    has_children: {
        val: resume.value?.has_children,
        isValid: true
    },
    marital_status_id: {
        val: resume.value?.marital_status_id ?? 18,
        isValid: true
    },
});

watch(() => useWatchStateValues(state, true, true),   () => {
    if (!isFirst.value){
        isChanged.value = true;
    }else{
        isFirst.value = false;
    }
});

const sectionData = ref({});
watch(() => sectionData.value, (newData, oldData) => {
    const diffData =  useDiff(newData, oldData, ['id', 'created_at', 'updated_at']);
    if (Object.keys(diffData).length){
        state['citizenship'].val = newData['citizenship'];
        state['about'].val = newData['about'];
        state['has_children'].val = newData['has_children'];
        state['marital_status_id'].val = newData['marital_status_id'];
        if (isUpdated.value){
            isUpdated.value = false;
            return;
        }
    }
});
watch(() => resumeStore.resume, (newResume) => {
    if (newResume){
        sectionData.value = {
            citizenship: resumeStore.resume?.citizenship,
            about: resumeStore.resume?.about,
            has_children: resumeStore.resume?.has_children,
            marital_status_id: resumeStore.resume?.marital_status_id,
        };
        nextTick(() => {
            isChanged.value = false;
        });
    }
});

onMounted(() => {
    if (resumeStore.resume){
        sectionData.value = {
            citizenship: resumeStore.resume?.citizenship,
            about: resumeStore.resume?.about,
            has_children: resumeStore.resume?.has_children,
            marital_status_id: resumeStore.resume?.marital_status_id,
        };

        isShown.value = true;

        nextTick(() => {
            isChanged.value = false;
        });
    }
})

watch(() => isCollapsed.value, (newData) => {
    if (!newData){
        isShown.value = true;
    }
});


const {updateResume} = resumeStore;

const {errors, handleErrorResponse, clearInputError} = useFormValidation();
const add  = () => {
    isShown.value = !isShown.value;
    // hasChanged.value = true;
}
const save = async () => {
    if (isChanged.value){
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        const jsonData = {
            citizenship: state.citizenship.val,
            about: state.about.val,
            has_children: state.has_children.val,
            marital_status_id: state.marital_status_id.val,
            form_data: 'CITIZENSHIP_AND_FAMILY_DATA'
        }
        state.isLoading = true;
        errors.value = {};
        state.errorMessage = "";

        const resData = await updateResume(draftID.value, jsonData);

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }
        isChanged.value = false;
        isSaved.value = false;
        isUpdated.value = false;

        await getResume(draftID.value);

    }
}

const isCompleted = computed(() => {
    const myResume = resume.value;
    if (myResume){
        return myResume.citizenship && myResume.about && myResume.has_children && myResume.marital_status_id;
    }
    return false;
});

</script>

<style scoped>

</style>