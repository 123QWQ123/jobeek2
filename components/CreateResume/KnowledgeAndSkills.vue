<template>
  <div class="w-box" v-click-outside="save">
      <div class="w-box-head">
        <h3 class="title">Знания и навыки</h3>
        <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

      </div>
      <transition>
          <div class="w-box-body" :class="{collapse: isCollapsed}">
              <div class="form_content" v-if="isShown">
                  <CreateResumeSkillsContent v-model="skills"/>
              </div>
              <div class="empty-area" v-else>
                  <span>Здесь вы можете указать релевантный опыт в сфере которую вы выбарли</span>
                  <button class="add" type="button" @click="add">Добавить</button>
              </div>
          </div>
      </transition>

  </div>

</template>

<script setup>

import {useResumeStore} from "~/store/resume";
import useFormValidation from "~/composables/useFormValidation";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
const resumeStore = useResumeStore();

const resume = computed(() => resumeStore.resume);

const route = useRoute();
const draftID = computed(() => route.query.draft_id);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);


const skills = ref(resumeStore.resume.skills ?? []);

onMounted(() => {
    if (skills.value.length > 0){
        isShown.value = true;
        isCollapsed.value = false;
    }
})
const add  = () => {
    isShown.value = !isShown.value;
}

watch(() => skills.value, (newSkills) => {
  isChanged.value = true;
})

watch(() => resumeStore.resume?.skills, (newItems) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newItems.length>0){
        skills.value = newItems;
        isShown.value = true;
        isCollapsed.value = false;
    }
})

const isCompleted = computed(() => {
    return skills.value?.length > 0;
});
const {updateResume, getResume} = resumeStore;
const {errors, handleErrorResponse} = useFormValidation();
const save = async() => {
    if (isChanged.value){
        errors.value = {};
        const resData = await updateResume(draftID.value, {
            form_data: 'KNOWLEDGE_AND_SKILLS_DATA',
            skills: skills.value
        });

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }
        isSaved.value = false;
        isChanged.value = false;

        isUpdated.value = true;
        getResume(draftID.value)

    }
};
</script>

<style scoped>

</style>