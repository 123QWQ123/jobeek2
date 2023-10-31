<template>
  <div class="w-box"  v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Опыт работы</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed;"></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
      <transition>
          <div class="w-box-body" :class="{collapse: isCollapsed}">
              <div class="form_content" v-if="isShown">
                  <div class="row">
                      <CreateResumeWorkExperienceHistory v-model="work_histories" ref="workExperienceElement" :errors="errors.work_histories"/>
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
import {useDiff} from "~/composables/useDiff";
const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);

const work_histories = ref(resumeStore.resume?.work_histories ?? []);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const sectionData = ref({
    work_histories: [],
});
watch(() => sectionData.value, (newData, oldData) => {
    const diffData =  useDiff(newData, oldData, ['id', 'created_at', 'updated_at']);
    if (Object.keys(diffData).length){
        work_histories.value = newData.work_histories;
        if (isUpdated.value){
            isUpdated.value = false;
            return;
        }
    }
});
watch(() => resumeStore.resume, (newResume) => {
    if (newResume){
        sectionData.value = {
            work_histories: newResume?.work_histories,
        };
        nextTick(() => {
            isChanged.value = false;
        });
    }
});

watch(() => work_histories.value, (newData) => {
    isChanged.value = true;
});

onMounted(() => {
    if (resumeStore.resume){
        sectionData.value = {
            work_histories: resumeStore.resume?.work_histories,
        };
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


const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
    if (isChanged.value){
        const resData = await updateResume(draftID.value, {
            form_data: 'EXPERIENCE_DATA',
            work_histories: work_histories.value
        });

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }
        isChanged.value = false;
        isSaved.value = false;
        isUpdated.value = true;

        await getResume(draftID.value);
    }
}

const isCompleted = computed(() => {
    return resumeStore.resume?.work_histories?.length > 0;
});

</script>

<style scoped>
</style>