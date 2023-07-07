<template>
  <div class="w-box"  v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Опыт работы</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed;"></span>
    </div>
      <transition>
          <div class="w-box-body" :class="{collapse: isCollapsed}">
              <div class="form_content" v-if="isShown">
                  <div class="row">
                      <CreateResumeWorkExperienceHistory v-model="work_experiences_items" ref="workExperienceElement" :errors="errors.work_histories"/>
                  </div>
              </div>
              <div class="empty-area" v-else>
                  <span>Здесь вы можете указать</span>
                  <button class="add" type="button" @click="isShown = !isShown;">Добавить </button>
              </div>
          </div>
      </transition>

  </div>
</template>

<script setup>

import useFormValidation from "~/composables/useFormValidation";
import {useResumeStore} from "~/store/resume";
const props = defineProps(['modelValue']);

const route = useRoute();
const resumeStore = useResumeStore();
const draftID = computed(() => route.query.draft_id);
const resume = computed(() => resumeStore.resume);
const work_histories = computed(() => resume.value?.work_histories ?? []);
const work_experiences_items = ref(work_histories.value ?? []);
const workExperienceElement = ref(false);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

watch(() => isCollapsed.value, (newData) => {
    if (!newData){
        isShown.value = true;
    }
});

watch(() => work_experiences_items.value, (newData) => {
    isChanged.value = true;
});

watch(() => work_histories.value, (newItems) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newItems.length > 0){
        isShown.value = true;
        work_experiences_items.value = newItems;
    }
});
const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
    if (isChanged.value){
        errors.value = {};
        const resData = await updateResume(draftID.value, {
            form_data: 'EXPERIENCE_DATA',
            work_histories: work_experiences_items.value
        });

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }

        isChanged.value = false;
        isSaved.value = false;


        isUpdated.value = true;
        getResume(draftID.value)
    }
}

const isCompleted = computed(() => {
    return resume.value?.work_histories?.length > 0;
});
</script>

<style scoped>
</style>