<template>

  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Гражданство и Семья</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

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

import {useVacancyStore} from "~/store/vacancy";
import {useProfileStore} from "~/store/profile";
import {useDictionaryStore} from "~/store/dictionary";
import useFormValidation from "~/composables/useFormValidation";
import {useResumeStore} from "~/store/resume";
import {useWatchStateValues} from "~/composables/useWatchStateValues";

const profileStore = useProfileStore();
const vacancyStore = useVacancyStore();
const resumeStore = useResumeStore();

const route = useRoute();
const draftID = computed(() => route.query.draft_id);

const isShown = ref(true);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);

const dictionaryStore = useDictionaryStore();
const {getMaritalStatus} = dictionaryStore;
await getMaritalStatus();
const {getCountries} = profileStore;
await getCountries();
const countryOptions = computed(() => profileStore.countries.map((item) => ({name:item.name, value: item.id})));
const resume = computed(() => resumeStore.resume);
const maritalStatusOptions = computed(() => dictionaryStore.marital_statuses.map(item => ({value: item.id, name: item.name})));
const isValid = computed(() => props.is_valid);

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
watch(() => useWatchStateValues(state), () => isChanged.value = true);
const add  = () => {
    isShown.value = !isShown.value;
    // hasChanged.value = true;
}
const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();

const save = async() => {
    if (isChanged.value){
        errors.value = {};
        const formData = useFormData(state);
        console.log(formData);
        const resData = await updateResume(draftID.value, {
            form_data: 'CITIZENSHIP_AND_FAMILY_DATA',
            ...formData
        });

        console.log(resData);
        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }

        isSaved.value = true;
        isChanged.value = false;
        setTimeout(() => {
            isSaved.value = false;
        }, 3000);

    }
}

const isCompleted = computed(() => {

    return resume.value.citizenship && resume.value.about && resume.value.has_children && resume.value.salary_from && resume.value.marital_status_id;
});
</script>

<style scoped>

</style>